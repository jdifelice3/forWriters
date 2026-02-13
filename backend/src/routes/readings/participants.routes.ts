import { Router, Response } from "express";
import prisma from "../../database/prisma";
import Session from "supertokens-node/recipe/session";
import { loadReadingParticipantById } from "./participant.middleware";
import { loadSubmissionById } from "./readings.middleware";
import { SessionRequest } from "supertokens-node/framework/express";
import multer from "multer";
import { uploadFile } from "../../files/uploadFile";
import { mapMimeToEnum } from "../../util/Enum";
import { loadAppFileMetaById } from "../files/fileMeta.middleware";

const router = Router({ mergeParams: true });

router.use((req, res, next) => {
    
    next(); // Pass the request to the next middleware/route handler
});

const upload = multer({ dest: "uploads/" });

router.get(
  "/",
  async (req: SessionRequest, res: Response) => {
    const participants = await prisma.readingParticipant.findMany({
      where: {
        readingId: req.reading.id,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            userProfile: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        readingSubmission: {
          select: {
            id: true,
            submittedAt: true,
            appFileId: true,
          },
        },
      },
      orderBy: {
        joinedAt: "asc",
      },
    });

    const payload = participants.map((p) => ({
      participantId: p.id,
      userId: p.user.id,
      name: `${p.user.userProfile?.firstName ?? ""} ${p.user.userProfile?.lastName ?? ""}`.trim(),
      username: p.user.username,
      joinedAt: p.joinedAt,
      submission: p.readingSubmission
        ? {
            id: p.readingSubmission.id,
            submittedAt: p.readingSubmission.submittedAt,
          }
        : null,
    }));

    res.json(payload);
  }
);

// /api/groups/:groupId/readings/:readingId/participants/:participantId/withdraw
router.delete("/withdraw", loadReadingParticipantById, async (req: SessionRequest, res: Response) => {
    
    const session = await Session.getSession(req, res);
    const authId = session.getUserId();
    const actingUser: any = await prisma.user.findUnique({where: {superTokensId: authId}});
    
    if (req.readingParticipant.userId !== actingUser.id) {
      return res.status(403).json({ error: "Cannot withdraw another participant" });
    }

    await prisma.readingParticipant.delete({
      where: { id: req.readingParticipant.id },
    });

    res.status(204).send();
  }
);

router.post(
  "/submissions",
  loadReadingParticipantById,
  async (req: SessionRequest, res: Response) => {
    const session = await Session.getSession(req, res);
    const authId = session.getUserId();
    const actingUser: any = await prisma.user.findUnique({where: {superTokensId: authId}});
    const actingUserId = actingUser.id;
    const { appFileId } = req.body;

    if (req.readingParticipant.userId !== actingUserId) {
      return res.status(403).json({ error: "Cannot submit for another participant" });
    }

    const submission = await prisma.readingSubmission.create({
      data: {
        readingId: req.reading.id,
        participantId: req.readingParticipant.id,
        appFileId,
      },
    });

    res.json(submission);
  }
);

router.post(
  "/submissions/:submissionId/feedback",
  loadReadingParticipantById,
  loadSubmissionById,
  loadAppFileMetaById,
  upload.single("file"),
  async (req: SessionRequest, res: Response) => {
    const session = await Session.getSession(req, res);
    const authId = session.getUserId();
    const actingUser: any = await prisma.user.findUnique({where: {superTokensId: authId}});
    const actingUserId = actingUser.id;

    // Authorization
    if (req.readingParticipant.userId !== actingUserId) {
      return res.status(403).json({ error: "Cannot act as another participant" });
    }

    if (req.submission.participantId === req.readingParticipant.id) {
      return res.status(400).json({ error: "Cannot give feedback on your own submission" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Missing feedback file" });
    }

    // 1️⃣ Upload file (infrastructure)
    const appFile = await uploadFile({
            appFileMetaId: req.appFileMeta.id,
            userId: actingUserId,
            filename: req.file.originalname,
            url: req.file.path,
            mimetype: mapMimeToEnum(req.file.mimetype),
    });

    // 2️⃣ Create feedback (workflow)
    const feedback = await prisma.fileFeedback.create({
        data: {
            reviewerUserId: req.readingParticipant.id,
            appFileId: appFile.id,
        },
    });

    res.status(201).json(feedback);
  }
);

export default router;
