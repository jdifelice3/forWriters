/*
  Warnings:

  - You are about to drop the column `feedbackFileId` on the `ReadingFeedback` table. All the data in the column will be lost.
  - You are about to drop the column `feedbackUserId` on the `ReadingFeedback` table. All the data in the column will be lost.
  - You are about to drop the column `readingAuthorId` on the `ReadingFeedback` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ReadingFeedback` table. All the data in the column will be lost.
  - You are about to drop the `AuthorAppFileMeta` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `appFileId` to the `ReadingFeedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewerParticipantId` to the `ReadingFeedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `submissionId` to the `ReadingFeedback` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AuthorAppFileMeta" DROP CONSTRAINT "AuthorAppFileMeta_appFileMetaId_fkey";

-- DropForeignKey
ALTER TABLE "AuthorAppFileMeta" DROP CONSTRAINT "AuthorAppFileMeta_readingAuthorId_fkey";

-- DropForeignKey
ALTER TABLE "ReadingFeedback" DROP CONSTRAINT "ReadingFeedback_feedbackFileId_fkey";

-- DropForeignKey
ALTER TABLE "ReadingFeedback" DROP CONSTRAINT "ReadingFeedback_feedbackUserId_fkey";

-- DropForeignKey
ALTER TABLE "ReadingFeedback" DROP CONSTRAINT "ReadingFeedback_readingAuthorId_fkey";

-- AlterTable
ALTER TABLE "ReadingFeedback" DROP COLUMN "feedbackFileId",
DROP COLUMN "feedbackUserId",
DROP COLUMN "readingAuthorId",
DROP COLUMN "updatedAt",
ADD COLUMN     "appFileId" TEXT NOT NULL,
ADD COLUMN     "reviewerParticipantId" TEXT NOT NULL,
ADD COLUMN     "submissionId" TEXT NOT NULL;

-- DropTable
DROP TABLE "AuthorAppFileMeta";

-- CreateTable
CREATE TABLE "ReadingSubmission" (
    "id" TEXT NOT NULL,
    "readingId" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "appFileId" TEXT NOT NULL,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReadingSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReadingSubmission_participantId_key" ON "ReadingSubmission"("participantId");

-- CreateIndex
CREATE UNIQUE INDEX "ReadingSubmission_readingId_participantId_appFileId_key" ON "ReadingSubmission"("readingId", "participantId", "appFileId");

-- AddForeignKey
ALTER TABLE "ReadingFeedback" ADD CONSTRAINT "ReadingFeedback_reviewerParticipantId_fkey" FOREIGN KEY ("reviewerParticipantId") REFERENCES "ReadingParticipant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingFeedback" ADD CONSTRAINT "ReadingFeedback_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "ReadingSubmission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingFeedback" ADD CONSTRAINT "ReadingFeedback_appFileId_fkey" FOREIGN KEY ("appFileId") REFERENCES "AppFile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingSubmission" ADD CONSTRAINT "ReadingSubmission_readingId_fkey" FOREIGN KEY ("readingId") REFERENCES "Reading"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingSubmission" ADD CONSTRAINT "ReadingSubmission_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "ReadingParticipant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingSubmission" ADD CONSTRAINT "ReadingSubmission_appFileId_fkey" FOREIGN KEY ("appFileId") REFERENCES "AppFile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
