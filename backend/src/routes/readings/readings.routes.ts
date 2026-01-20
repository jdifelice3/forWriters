// readings.routes.ts
import { Router, Request, Response, NextFunction } from "express";
import prisma from "../../database/prisma";
import { loadGroupById, loadGroupMembership } from "../groups/group.middleware";
import { loadSubmissionById } from "./readings.middleware";
import { SessionRequest } from "supertokens-node/framework/express";
import Session from "supertokens-node/recipe/session";
import { loadDocxFromS3AsHtml, addParagraphIds } from "../../services/streamFromS3";
import { loadReadingById } from "./readings.middleware";

const router = Router({ mergeParams: true });

router.use(loadGroupById);
router.use(loadGroupMembership);

type CreateReadingInput = {
  name: string;
  readingDate: Date;
  readingStartTime: string;
  readingEndTime: string;
  submissionDeadline: Date;
  description: string;
  schedule: string;
}

router.get("/", async (req: Request, res: Response) => {
    const reading: any = await prisma.reading.findUnique({
        where: {
            id: req.reading.id,
        }, 
        include: {
            readingParticipant: true,
            readingSubmission: true
        }
    });
    res.json(reading);
});

router.put("/", async (req: Request, res: Response) => {
    const readingId = req.reading.id;

    const {
        name,
        readingDate,
        readingStartTime,
        readingEndTime,
        submissionDeadline,
        description
    } = req.body;

    const reading = prisma.reading.update({
        data: {
            name,
            readingDate,
            readingStartTime,
            readingEndTime,
            submissionDeadline,
            description
        },
        where: {
            id: readingId
        }
    });

    return reading;
});

router.delete("/", loadReadingById, async (req, res) => {
    
    const readingId = req.reading.id;
    const { count: submissionCount } = await prisma.readingSubmission.deleteMany({
        where: {
            readingId: readingId
        }
    });
    
    const { count } = await prisma.readingParticipant.deleteMany({
        where: {
            readingId: readingId
        }
    });
    
    
    await prisma.reading.delete({
        where: {
            id: readingId
        }
    })
    res.json({"ok": "true"})
});

// /api/groups/:groupId/readings/:readingId/signup
router.post("/signup", async (req, res) => {
    const session = await Session.getSession(req, res);
    const authId = session.getUserId(true);
    const user: any = await prisma.user.findUnique({where: {superTokensId: authId,},});
    const readingId = req.reading.id;

    const readingParticipant = await prisma.readingParticipant.create({
        data: {
          readingId: readingId,
          userId: user.id,
        }
      });
    res.json(readingParticipant);
});

router.get("/participants", async (req, res) => {
    const participants = await prisma.readingParticipant.findMany({
        where: { readingId: req.reading.id },
    });

    res.json(participants);
});

router.post("/participants/:participantId/withdraw",
  async (req: SessionRequest, res) => {
    const actingUserId = req.session!.getUserId();
    const participant = req.readingParticipant;

    const isSelf = participant.userId === actingUserId;
    const isAdmin = req.groupRole === "ADMIN";

    if (!isSelf && !isAdmin) {
      return res.status(403).json({ error: "Not allowed to withdraw participant" });
    }

    await prisma.readingParticipant.delete({
      where: { id: participant.id },
    });

    res.json({ status: "withdrawn" });
  }
);

router.post("/participants/:participantId/submit",
  async (req: SessionRequest, res) => {
    const actingUserId = req.session!.getUserId();
    const participant = req.readingParticipant;

    if (participant.userId !== actingUserId) {
      return res.status(403).json({ error: "Cannot submit for another participant" });
    }

    const { appFileId } = req.body;

    const submission = await prisma.readingSubmission.upsert({
      where: {
        participantId: participant.id,
      },
      update: {
        appFileId,
      },
      create: {
        participantId: participant.id,
        appFileId,
        readingId: req.reading.id,
      },
    });

    res.json(submission);
  }
);

router.post("/submissions", async (req: Request, res: Response) => {
    const submissions: any = await prisma.readingSubmission.findMany({
        where: {
            id: req.reading.id
        },
    });

    res.status(200).json(submissions);
});

router.get("/submissions/:submissionId/feedback", loadSubmissionById, async (req: SessionRequest, res: Response) => {
    const submissionId = req.params.submissionId;
    const readingSubmission = await getSubmission(submissionId);
   
    if(!readingSubmission) return res.json({error: "Reading submission did not contain a file"});
    if(!process.env.AWS_S3_BUCKET || !process.env.AWS_S3_REGION) {
        return res.status(403).json({error: "Invalid S3 values"});
    }

    const html = await getDocxAsHtml(
        process.env.AWS_S3_BUCKET, 
        readingSubmission?.appFile.filename, 
        process.env.AWS_S3_REGION
    );

    res.json({
        html: html,
    });
});

const getDocxAsHtml = async (awsS3bucket: string, filename: string, awsS3region: string) => {
    const html = await loadDocxFromS3AsHtml(
        awsS3bucket, 
        filename, 
        awsS3region
    );

    return addParagraphIds(html);
}

const getSubmission = async(submissionId: string) => {
    const readingSubmission = await prisma.readingSubmission.findUnique({
        where: {
            id: submissionId
        },
        include: {
            appFile: true
        }
    });

    return readingSubmission;
}

router.post("/submissions/:appFileId/version", async (req: Request, res: Response) => {
    const session = await Session.getSession(req, res);
    const authId = session.getUserId(true);
    const user: any = await prisma.user.findUnique({where: {superTokensId: authId,},});
    const appFileId: string = req.params.appFileId;

    const readingsParticipant = await prisma.readingParticipant.findUnique({
        where: {
             readingId_userId: {
                readingId: req.reading.id,
                userId: user.id,
            },
        }
    });

    if(readingsParticipant){
        const readingSubmission = await prisma.readingSubmission.create({
            data: {
                readingId: req.reading.id,
                participantId: readingsParticipant.id,
                appFileId: appFileId,
            }
        });

        res.json(readingSubmission);
    } else {
        res.json([]);
    }

});

router.put("/submissions/:appFileId/version", async (req: Request, res: Response) => {
    const session = await Session.getSession(req, res);
    const authId = session.getUserId(true);
    const user: any = await prisma.user.findUnique({where: {superTokensId: authId,},});
    const appFileId: string = req.params.appFileId;

    const readingsParticipant = await prisma.readingParticipant.findUnique({
        where: {
             readingId_userId: {
                readingId: req.reading.id,
                userId: user.id,
            },
        }
    });

    if(readingsParticipant){
        const readingSubmission = await prisma.readingSubmission.update({
            where: {
                readingId: req.reading.id,
                participantId: readingsParticipant.id,
            },
            data: {
                appFileId: appFileId,
            }
        });

        res.json(readingSubmission);
    } else {
        res.json([]);
    }

});
export default router;