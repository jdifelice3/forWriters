import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function resolveReviewerParticipant(req: any, res: any, next: any) {
  const userId = req.user?.id;
  const { submissionId } = req.params;

  if (!userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  if (!submissionId) {
    return res.status(400).json({ error: "submissionId required to resolve reviewer" });
  }

  const submission = await prisma.readingSubmission.findUnique({
    where: { id: submissionId },
    select: {
      readingId: true,
      appFileId: true,
    },
  });

  if (!submission) {
    return res.status(404).json({ error: "Submission not found" });
  }

  const participant = await prisma.readingParticipant.findUnique({
    where: {
      readingId_userId: {
        readingId: submission.readingId,
        userId,
      },
    },
    select: { id: true },
  });

  if (!participant) {
    return res.status(403).json({ error: "User is not a participant in this reading" });
  }

  // Inject canonical context
  req.appFileId = submission.appFileId;
  req.reviewerParticipantId = participant.id;

  next();
}
