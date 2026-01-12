import prisma from "../database/prisma";
import { ExtractedComment } from "../types/Feedback";

export async function saveReadingFeedbackComments(
  readingFeedbackId: string,
  reviewerParticipantId: string,
  extracted: ExtractedComment[]
) {
  return prisma.$transaction(async tx => {
    // 1️⃣ Insert comments
    const createdComments = await Promise.all(
      extracted.map(ec =>
        tx.readingFeedbackComment.create({
          data: {
            readingFeedbackId,
            reviewerParticipantId,
            source: "DOCX",
            commentText: ec.commentText,
          },
        })
      )
    );

    // 2️⃣ Build targets in memory (fast)
    const targetsData = createdComments.flatMap((comment, i) =>
      extracted[i].targets.map((targetText, ordinal) => ({
        commentId: comment.id,
        targetText,
        ordinal,
      }))
    );

    // 3️⃣ Batch insert targets
    if (targetsData.length > 0) {
      await tx.readingFeedbackCommentTarget.createMany({
        data: targetsData,
      });
    }

    return createdComments;
  });
}
