/*
  Warnings:

  - A unique constraint covering the columns `[appFileId,reviewerParticipantId]` on the table `FileFeedback` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "FileFeedback" DROP CONSTRAINT "FileFeedback_submissionId_fkey";

-- DropIndex
DROP INDEX "FileFeedback_appFileId_idx";

-- DropIndex
DROP INDEX "FileFeedback_submissionId_reviewerParticipantId_key";

-- AlterTable
ALTER TABLE "FileFeedback" ALTER COLUMN "submissionId" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "FileFeedback_submissionId_idx" ON "FileFeedback"("submissionId");

-- CreateIndex
CREATE UNIQUE INDEX "FileFeedback_appFileId_reviewerParticipantId_key" ON "FileFeedback"("appFileId", "reviewerParticipantId");

-- AddForeignKey
ALTER TABLE "FileFeedback" ADD CONSTRAINT "FileFeedback_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "ReadingSubmission"("id") ON DELETE SET NULL ON UPDATE CASCADE;
