/*
  Warnings:

  - You are about to drop the `EventSignups` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EventSignups" DROP CONSTRAINT "EventSignups_appFileId_fkey";

-- DropForeignKey
ALTER TABLE "EventSignups" DROP CONSTRAINT "EventSignups_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventSignups" DROP CONSTRAINT "EventSignups_userId_fkey";

-- DropTable
DROP TABLE "EventSignups";

-- CreateTable
CREATE TABLE "EventSubmission" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "appFileId" TEXT,
    "signedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubmissionFeedback" (
    "id" TEXT NOT NULL,
    "submissionId" TEXT NOT NULL,
    "reviewerId" TEXT NOT NULL,
    "appFileId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubmissionFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventSubmission_eventId_userId_appFileId_key" ON "EventSubmission"("eventId", "userId", "appFileId");

-- CreateIndex
CREATE UNIQUE INDEX "SubmissionFeedback_submissionId_reviewerId_appFileId_key" ON "SubmissionFeedback"("submissionId", "reviewerId", "appFileId");

-- AddForeignKey
ALTER TABLE "EventSubmission" ADD CONSTRAINT "EventSubmission_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "GroupsEvents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSubmission" ADD CONSTRAINT "EventSubmission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSubmission" ADD CONSTRAINT "EventSubmission_appFileId_fkey" FOREIGN KEY ("appFileId") REFERENCES "AppFiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubmissionFeedback" ADD CONSTRAINT "SubmissionFeedback_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubmissionFeedback" ADD CONSTRAINT "SubmissionFeedback_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "EventSubmission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubmissionFeedback" ADD CONSTRAINT "SubmissionFeedback_appFileId_fkey" FOREIGN KEY ("appFileId") REFERENCES "AppFiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
