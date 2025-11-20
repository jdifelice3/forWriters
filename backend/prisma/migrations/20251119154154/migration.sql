/*
  Warnings:

  - You are about to drop the `Feedback` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReadingParticipant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReadingSubmission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Work` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ParticipantType" AS ENUM ('AUTHOR', 'REVIEWER');

-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_appFileId_fkey";

-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_reviewerId_fkey";

-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_submissionId_fkey";

-- DropForeignKey
ALTER TABLE "ReadingParticipant" DROP CONSTRAINT "ReadingParticipant_participantId_fkey";

-- DropForeignKey
ALTER TABLE "ReadingParticipant" DROP CONSTRAINT "ReadingParticipant_readingId_fkey";

-- DropForeignKey
ALTER TABLE "ReadingSubmission" DROP CONSTRAINT "ReadingSubmission_appFileId_fkey";

-- DropForeignKey
ALTER TABLE "ReadingSubmission" DROP CONSTRAINT "ReadingSubmission_participantId_fkey";

-- DropForeignKey
ALTER TABLE "ReadingSubmission" DROP CONSTRAINT "ReadingSubmission_readingId_fkey";

-- DropForeignKey
ALTER TABLE "Work" DROP CONSTRAINT "Work_userId_fkey";

-- AlterTable
ALTER TABLE "AppFile" ADD COLUMN     "genre" "Genre",
ADD COLUMN     "manuscriptIsVisible" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pageCount" INTEGER,
ADD COLUMN     "wordCount" INTEGER,
ADD COLUMN     "workType" "WorkType";

-- DropTable
DROP TABLE "Feedback";

-- DropTable
DROP TABLE "ReadingParticipant";

-- DropTable
DROP TABLE "ReadingSubmission";

-- DropTable
DROP TABLE "Work";

-- DropEnum
DROP TYPE "EventUserType";

-- CreateTable
CREATE TABLE "ReadingAuthor" (
    "id" TEXT NOT NULL,
    "readingId" TEXT NOT NULL,
    "groupUserId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReadingAuthor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReadingFeedback" (
    "id" TEXT NOT NULL,
    "readingManuscriptId" TEXT NOT NULL,
    "groupUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReadingFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReadingManuscript" (
    "id" TEXT NOT NULL,
    "readingId" TEXT NOT NULL,
    "readingAuthorId" TEXT NOT NULL,
    "appFileId" TEXT NOT NULL,

    CONSTRAINT "ReadingManuscript_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReadingAuthor_readingId_groupUserId_key" ON "ReadingAuthor"("readingId", "groupUserId");

-- CreateIndex
CREATE UNIQUE INDEX "ReadingFeedback_readingManuscriptId_groupUserId_key" ON "ReadingFeedback"("readingManuscriptId", "groupUserId");

-- CreateIndex
CREATE UNIQUE INDEX "ReadingManuscript_readingAuthorId_key" ON "ReadingManuscript"("readingAuthorId");

-- AddForeignKey
ALTER TABLE "ReadingAuthor" ADD CONSTRAINT "ReadingAuthor_readingId_fkey" FOREIGN KEY ("readingId") REFERENCES "Reading"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingAuthor" ADD CONSTRAINT "ReadingAuthor_groupUserId_fkey" FOREIGN KEY ("groupUserId") REFERENCES "GroupUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingFeedback" ADD CONSTRAINT "ReadingFeedback_groupUserId_fkey" FOREIGN KEY ("groupUserId") REFERENCES "GroupUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingFeedback" ADD CONSTRAINT "ReadingFeedback_readingManuscriptId_fkey" FOREIGN KEY ("readingManuscriptId") REFERENCES "ReadingManuscript"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingManuscript" ADD CONSTRAINT "ReadingManuscript_readingId_fkey" FOREIGN KEY ("readingId") REFERENCES "ReadingAuthor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingManuscript" ADD CONSTRAINT "ReadingManuscript_appFileId_fkey" FOREIGN KEY ("appFileId") REFERENCES "AppFile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
