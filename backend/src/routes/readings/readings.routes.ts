// readings.routes.ts
import { Router, Request, Response, NextFunction } from "express";
import prisma from "../../database/prisma";
import { loadGroupById, loadGroupMembership } from "../groups/group.middleware";
import { loadSubmissionById } from "./readings.middleware";
import { SessionRequest } from "supertokens-node/framework/express";
import Session from "supertokens-node/recipe/session";
import { loadDocxFromS3AsHtml, addParagraphIds } from "../../services/streamFromS3";
import { loadReadingById } from "./readings.middleware";
import { loadReadingParticipantById } from "./participant.middleware";
import { GroupType, ReadingParticipant } from "@prisma/client";
import { Resend } from "resend";
import {
    canCreateReading,
    canSubmitToReading,
} from "../../workflow/groupBusinessRules";

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
    if (
        !canCreateReading(
            req.group.groupType,
            req.groupRole,
            req.group.creatorUserId === req.user.id
        )
    ) {
        return res.status(403).json({ error: "Only the group admin can edit readings" });
    }

    const readingId = req.reading.id;

    const {
        name,
        readingDate,
        readingStartTime,
        readingEndTime,
        submissionDeadline,
        description,
        participants
    } = req.body;
    const submissionCount = await prisma.readingSubmission.count({
        where: { readingId },
    });
    if (submissionCount > 0) {
        return res.status(409).json({
            error: "A reading with submissions cannot be edited",
        });
    }

    if(req.group.groupType === GroupType.WRITING){
        const participantUserIds = [
            ...new Set(
                (Array.isArray(participants) ? participants : [])
                    .map((participant: ReadingParticipant) => participant.userId)
                    .filter(Boolean)
            ),
        ];
        const memberCount = participantUserIds.length
            ? await prisma.groupUser.count({
                where: {
                    groupId: req.group.id,
                    userId: { in: participantUserIds },
                },
            })
            : 0;
        if (memberCount !== participantUserIds.length) {
            return res.status(400).json({
                error: "Every reading author must already be a member of the writing group",
            });
        }

        const scheduledDate = new Date(readingDate);
        const deadline = new Date(submissionDeadline);
        if (Number.isNaN(scheduledDate.getTime()) || Number.isNaN(deadline.getTime())) {
            return res.status(400).json({
                error: "Writing-group readings require valid schedule dates",
            });
        }

        const reading = await prisma.$transaction(async (tx) => {
            const updated = await tx.reading.update({
                data: {
                    name,
                    readingDate: scheduledDate,
                    readingStartTime,
                    readingEndTime,
                    submissionDeadline: deadline,
                    description
                },
                where: { id: readingId }
            });
            await tx.readingParticipant.deleteMany({ where: { readingId } });
            if (participantUserIds.length) {
                await tx.readingParticipant.createMany({
                    data: participantUserIds.map((userId) => ({
                        userId,
                        readingId,
                        role: "AUTHOR",
                    })),
                });
            }
            return updated;
        });
        return res.json(reading);
    }

    if (req.group.groupType === GroupType.PERSONAL){
        const reading = await prisma.reading.update({
            data: {
                name,
                description
            },
            where: {
                id: readingId
            }
        });
        return res.json(reading);
    }

    return res.status(400).json({ error: "This group type does not support readings" });
});

router.delete("/", loadReadingById, async (req, res) => {
    if (
        !canCreateReading(
            req.group.groupType,
            req.groupRole,
            req.group.creatorUserId === req.user.id
        )
    ) {
        return res.status(403).json({ error: "Only the group admin can delete readings" });
    }
    
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
    if (
        req.group.groupType !== GroupType.PERSONAL ||
        req.group.creatorUserId !== req.user.id
    ) {
        return res.status(403).json({
            error: "Writing-group participants can only be added by the group admin",
        });
    }

    const readingParticipant = await prisma.readingParticipant.upsert({
        where: {
            readingId_userId: {
                readingId: req.reading.id,
                userId: req.user.id,
            },
        },
        update: {},
        create: {
          readingId: req.reading.id,
          userId: req.user.id,
          role: "AUTHOR",
        },
    });
    res.json(readingParticipant);
});

router.get("/participants", async (req, res) => {
    const participants = await prisma.readingParticipant.findMany({
        where: { readingId: req.reading.id },
    });

    res.json(participants);
});

router.post("/participants/:participantId/withdraw", loadReadingParticipantById,
  async (req: SessionRequest, res) => {
    const participant = req.readingParticipant;

    const isSelf = participant.userId === req.user.id;
    const isAdmin = req.groupRole === "ADMIN" || req.groupRole === "OWNER";

    if (!isSelf && !isAdmin) {
      return res.status(403).json({ error: "Not allowed to withdraw participant" });
    }

    await prisma.readingParticipant.delete({
      where: { id: participant.id },
    });

    res.json({ status: "withdrawn" });
  }
);

router.post("/participants/:participantId/submit", loadReadingParticipantById,
  async (req: SessionRequest, res) => {
    const participant = req.readingParticipant;

    if (
      participant.userId !== req.user.id ||
      !canSubmitToReading(
        req.group.groupType,
        req.group.creatorUserId === req.user.id,
        true
      )
    ) {
      return res.status(403).json({ error: "Cannot submit for another participant" });
    }

    const { appFileId } = req.body;
    const appFile = await prisma.appFile.findFirst({
      where: {
        id: appFileId,
        userId: req.user.id,
        documentType: "MANUSCRIPT",
      },
    });
    if (!appFile) {
      return res.status(404).json({ error: "Manuscript version not found" });
    }

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

router.post("/message/reviewer/send", async (req, res) => {
    const readingId = req.reading.id;
    const groupId = req.group.id;
    //const inviteUrl = `${process.env.WEB_HOST}/filefeedback/${readingId}`;
    const inviteUrl = `${process.env.WEB_HOST}/groups/${groupId}/readings/${readingId}/notification`;
    const resend = new Resend(process.env.RESEND_API_KEY);

    const results = await prisma.group.findUnique({
      include: {
        groupUser: {
            include: {
                user: true
            }
        }
      },
      where: {
        id: groupId,
      },

    });

    if(results && results.groupUser){
        for(let i = 0; i < results.groupUser.length; i++){
            const subject = process.env.NODE_ENV === "production" ?
                `TESTING: forWriters - Manuscripts in "${req.group.name}" are ready for review` :
                `Manuscripts in "${req.group.name}" are ready for review`;
            const html = process.env.NODE_ENV === "production" ?
                `<p>Greetings from forWriters,</p>
                    <p>Manuscript(s) in <b>${req.group.name}</b> are ready for review.</p>
                    Click on the link to read them.
                    <a href="${inviteUrl}">Review Manuscripts</a>
                ` : 
                `   <p>TESTING</p>
                    <p>Greetings from forWriters,</p>
                    <p>Manuscript(s) in the <b>${req.reading.name}</b> reading in the <b>${req.group.name}</b> group
                    are ready for review.</p>
                    Click on the link to read them.
                    <a href="${inviteUrl}">Review Manuscripts</a>
                `;

            const result = await resend.emails.send({
                from: "support@forwriters.ink",
                to: "support@forwriters.ink",
                bcc: results.groupUser[i].user.email,
                subject: subject,
                html: html,
            });
        }

        res.json({success: true});
    } else {
        res.json({success: false});
    }

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
    const appFileId: string = req.params.appFileId;

    const [readingsParticipant, appFile] = await Promise.all([
        prisma.readingParticipant.findUnique({
            where: {
              readingId_userId: {
                readingId: req.reading.id,
                userId: req.user.id,
              },
            },
        }),
        prisma.appFile.findFirst({
            where: {
                id: appFileId,
                userId: req.user.id,
                documentType: "MANUSCRIPT",
            },
        }),
    ]);

    if (!appFile) {
        return res.status(404).json({ error: "Manuscript version not found" });
    }

    if (
        !canSubmitToReading(
            req.group.groupType,
            req.group.creatorUserId === req.user.id,
            Boolean(readingsParticipant)
        ) ||
        !readingsParticipant
    ) {
        return res.status(403).json({
            error: "You must be added to this reading before submitting a manuscript",
        });
    }

    const readingSubmission = await prisma.readingSubmission.create({
        data: {
            readingId: req.reading.id,
            participantId: readingsParticipant.id,
            appFileId,
        }
    });

    return res.status(201).json(readingSubmission);
});

router.put("/submissions/:appFileId/version", async (req: Request, res: Response) => {
    const appFileId: string = req.params.appFileId;

    const [readingsParticipant, appFile] = await Promise.all([
        prisma.readingParticipant.findUnique({
            where: {
              readingId_userId: {
                readingId: req.reading.id,
                userId: req.user.id,
              },
            },
        }),
        prisma.appFile.findFirst({
            where: {
                id: appFileId,
                userId: req.user.id,
                documentType: "MANUSCRIPT",
            },
        }),
    ]);

    if (!appFile) {
        return res.status(404).json({ error: "Manuscript version not found" });
    }

    if (
        !canSubmitToReading(
            req.group.groupType,
            req.group.creatorUserId === req.user.id,
            Boolean(readingsParticipant)
        ) ||
        !readingsParticipant
    ) {
        return res.status(403).json({
            error: "You must be added to this reading before changing its manuscript version",
        });
    }

    const readingSubmission = await prisma.readingSubmission.update({
        where: { participantId: readingsParticipant.id },
        data: { appFileId },
    });

    return res.json(readingSubmission);
});
export default router;
