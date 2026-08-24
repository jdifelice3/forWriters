import { NextFunction, Request, Response, Router } from "express";
import { z } from "zod";
import prisma from "../../database/prisma";
import { loadGroupById, loadGroupMembership } from "../groups/group.middleware";

const router = Router({ mergeParams: true });

const requestInput = z.object({
  appFileId: z.string().min(1),
});

const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.use(loadGroupById);
router.use(loadGroupMembership);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { appFileId } = requestInput.parse(req.body);
    const appFile = await prisma.appFile.findFirst({
      where: {
        id: appFileId,
        userId: req.user.id,
        documentType: "MANUSCRIPT",
      },
      include: { appFileMeta: true },
    });

    if (!appFile) {
      return res.status(404).json({ error: "Manuscript version not found" });
    }

    const existing = await prisma.readingSubmission.findFirst({
      where: {
        appFileId: appFile.id,
        participant: { userId: req.user.id },
        reading: { groupId: req.group.id },
      },
      orderBy: { submittedAt: "desc" },
    });

    if (existing) {
      return res.json({
        groupId: req.group.id,
        readingId: existing.readingId,
        submissionId: existing.id,
        created: false,
      });
    }

    const created = await prisma.$transaction(async (tx) => {
      const reading = await tx.reading.create({
        data: {
          groupId: req.group.id,
          createdUserId: req.user.id,
          name: `Ad-hoc review · ${appFile.appFileMeta.title} · v${appFile.version}`,
          description:
            "Unscheduled review created directly from a manuscript version.",
          readingDate: null,
          submissionDeadline: null,
        },
      });

      const participant = await tx.readingParticipant.create({
        data: {
          readingId: reading.id,
          userId: req.user.id,
          role: "AUTHOR",
        },
      });

      const submission = await tx.readingSubmission.create({
        data: {
          readingId: reading.id,
          participantId: participant.id,
          appFileId: appFile.id,
        },
      });

      return { reading, submission };
    });

    return res.status(201).json({
      groupId: req.group.id,
      readingId: created.reading.id,
      submissionId: created.submission.id,
      created: true,
    });
  })
);

export default router;
