-- DropForeignKey
ALTER TABLE "ReadingAuthor" DROP CONSTRAINT "ReadingAuthor_authorId_fkey";

-- DropForeignKey
ALTER TABLE "ReadingFeedback" DROP CONSTRAINT "ReadingFeedback_feedbackUserId_fkey";

-- AddForeignKey
ALTER TABLE "ReadingAuthor" ADD CONSTRAINT "ReadingAuthor_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingFeedback" ADD CONSTRAINT "ReadingFeedback_feedbackUserId_fkey" FOREIGN KEY ("feedbackUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
