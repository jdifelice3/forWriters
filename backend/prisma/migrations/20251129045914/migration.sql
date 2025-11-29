/*
  Warnings:

  - Made the column `feedbackUserId` on table `ReadingFeedback` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "CommentSource" AS ENUM ('DOCX', 'MANUAL');

-- AlterTable
ALTER TABLE "ReadingFeedback" ALTER COLUMN "feedbackUserId" SET NOT NULL;

-- CreateTable
CREATE TABLE "ReadingFeedbackComments" (
    "id" TEXT NOT NULL,
    "readingAuthorId" TEXT NOT NULL,
    "source" "CommentSource" NOT NULL DEFAULT 'DOCX',
    "commentText" TEXT,
    "targetText" TEXT,

    CONSTRAINT "ReadingFeedbackComments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReadingFeedback" ADD CONSTRAINT "ReadingFeedback_feedbackUserId_fkey" FOREIGN KEY ("feedbackUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingFeedbackComments" ADD CONSTRAINT "ReadingFeedbackComments_readingAuthorId_fkey" FOREIGN KEY ("readingAuthorId") REFERENCES "ReadingAuthor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
