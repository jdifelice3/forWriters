/*
  Warnings:

  - You are about to drop the column `reviewerParticipantId` on the `FileFeedback` table. All the data in the column will be lost.
  - You are about to drop the column `submissionId` on the `FileFeedback` table. All the data in the column will be lost.
  - You are about to drop the column `reviewerParticipantId` on the `FileFeedbackComment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[appFileId,reviewerUserId]` on the table `FileFeedback` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `reviewerUserId` to the `FileFeedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewerUserId` to the `FileFeedbackComment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FileFeedback" DROP CONSTRAINT "FileFeedback_reviewerParticipantId_fkey";

-- DropForeignKey
ALTER TABLE "FileFeedback" DROP CONSTRAINT "FileFeedback_submissionId_fkey";

-- DropForeignKey
ALTER TABLE "FileFeedbackComment" DROP CONSTRAINT "FileFeedbackComment_reviewerParticipantId_fkey";

-- DropIndex
DROP INDEX "FileFeedback_appFileId_reviewerParticipantId_key";

-- DropIndex
DROP INDEX "FileFeedback_submissionId_idx";

-- DropIndex
DROP INDEX "FileFeedbackComment_reviewerParticipantId_idx";

-- AlterTable
ALTER TABLE "FileFeedback" DROP COLUMN "reviewerParticipantId",
DROP COLUMN "submissionId",
ADD COLUMN     "reviewerUserId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "FileFeedbackComment" DROP COLUMN "reviewerParticipantId",
ADD COLUMN     "reviewerUserId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "FileFeedback_appFileId_idx" ON "FileFeedback"("appFileId");

-- CreateIndex
CREATE UNIQUE INDEX "FileFeedback_appFileId_reviewerUserId_key" ON "FileFeedback"("appFileId", "reviewerUserId");

-- CreateIndex
CREATE INDEX "FileFeedbackComment_reviewerUserId_idx" ON "FileFeedbackComment"("reviewerUserId");

-- AddForeignKey
ALTER TABLE "FileFeedback" ADD CONSTRAINT "FileFeedback_reviewerUserId_fkey" FOREIGN KEY ("reviewerUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileFeedbackComment" ADD CONSTRAINT "FileFeedbackComment_reviewerUserId_fkey" FOREIGN KEY ("reviewerUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
