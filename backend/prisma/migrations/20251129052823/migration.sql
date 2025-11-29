/*
  Warnings:

  - You are about to drop the `ReadingFeedbackComments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ReadingFeedbackComments" DROP CONSTRAINT "ReadingFeedbackComments_readingAuthorId_fkey";

-- DropForeignKey
ALTER TABLE "ReadingFeedbackComments" DROP CONSTRAINT "ReadingFeedbackComments_readingFeedbackId_fkey";

-- DropTable
DROP TABLE "ReadingFeedbackComments";

-- CreateTable
CREATE TABLE "ReadingFeedbackComment" (
    "id" TEXT NOT NULL,
    "readingAuthorId" TEXT NOT NULL,
    "readingFeedbackId" TEXT NOT NULL,
    "source" "CommentSource" NOT NULL DEFAULT 'DOCX',
    "commentText" TEXT,
    "targetText" TEXT,

    CONSTRAINT "ReadingFeedbackComment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReadingFeedbackComment" ADD CONSTRAINT "ReadingFeedbackComment_readingAuthorId_fkey" FOREIGN KEY ("readingAuthorId") REFERENCES "ReadingAuthor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingFeedbackComment" ADD CONSTRAINT "ReadingFeedbackComment_readingFeedbackId_fkey" FOREIGN KEY ("readingFeedbackId") REFERENCES "ReadingFeedback"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
