/*
  Warnings:

  - Added the required column `feedbackFileId` to the `ReadingFeedback` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReadingFeedback" ADD COLUMN     "feedbackFileId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ReadingFeedback" ADD CONSTRAINT "ReadingFeedback_feedbackFileId_fkey" FOREIGN KEY ("feedbackFileId") REFERENCES "AppFile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
