/*
  Warnings:

  - Added the required column `readingFeedbackId` to the `ReadingFeedbackComments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReadingFeedbackComments" ADD COLUMN     "readingFeedbackId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ReadingFeedbackComments" ADD CONSTRAINT "ReadingFeedbackComments_readingFeedbackId_fkey" FOREIGN KEY ("readingFeedbackId") REFERENCES "ReadingFeedback"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
