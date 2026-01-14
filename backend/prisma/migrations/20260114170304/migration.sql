/*
  Warnings:

  - You are about to drop the `ReadingFeedback` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReadingFeedbackComment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReadingFeedbackCommentTarget` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ReadingFeedback" DROP CONSTRAINT "ReadingFeedback_appFileId_fkey";

-- DropForeignKey
ALTER TABLE "ReadingFeedback" DROP CONSTRAINT "ReadingFeedback_reviewerParticipantId_fkey";

-- DropForeignKey
ALTER TABLE "ReadingFeedback" DROP CONSTRAINT "ReadingFeedback_submissionId_fkey";

-- DropForeignKey
ALTER TABLE "ReadingFeedbackComment" DROP CONSTRAINT "ReadingFeedbackComment_readingFeedbackId_fkey";

-- DropForeignKey
ALTER TABLE "ReadingFeedbackCommentTarget" DROP CONSTRAINT "ReadingFeedbackCommentTarget_commentId_fkey";

-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "avatarUrl" TEXT;

-- DropTable
DROP TABLE "ReadingFeedback";

-- DropTable
DROP TABLE "ReadingFeedbackComment";

-- DropTable
DROP TABLE "ReadingFeedbackCommentTarget";

-- CreateTable
CREATE TABLE "FileFeedback" (
    "id" TEXT NOT NULL,
    "reviewerParticipantId" TEXT NOT NULL,
    "submissionId" TEXT NOT NULL,
    "appFileId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FileFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FileFeedbackComment" (
    "id" TEXT NOT NULL,
    "fileFeedbackId" TEXT NOT NULL,
    "reviewerParticipantId" TEXT NOT NULL,
    "source" "CommentSource" NOT NULL DEFAULT 'DOCX',
    "commentText" TEXT NOT NULL,
    "isResolved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FileFeedbackComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FileFeedbackCommentTarget" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "paragraphId" TEXT NOT NULL,
    "from" INTEGER NOT NULL,
    "to" INTEGER NOT NULL,
    "targetText" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FileFeedbackCommentTarget_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FileFeedback_appFileId_idx" ON "FileFeedback"("appFileId");

-- CreateIndex
CREATE UNIQUE INDEX "FileFeedback_submissionId_reviewerParticipantId_key" ON "FileFeedback"("submissionId", "reviewerParticipantId");

-- CreateIndex
CREATE INDEX "FileFeedbackComment_fileFeedbackId_idx" ON "FileFeedbackComment"("fileFeedbackId");

-- CreateIndex
CREATE INDEX "FileFeedbackComment_reviewerParticipantId_idx" ON "FileFeedbackComment"("reviewerParticipantId");

-- CreateIndex
CREATE INDEX "FileFeedbackCommentTarget_commentId_idx" ON "FileFeedbackCommentTarget"("commentId");

-- CreateIndex
CREATE INDEX "FileFeedbackCommentTarget_paragraphId_idx" ON "FileFeedbackCommentTarget"("paragraphId");

-- CreateIndex
CREATE INDEX "FileFeedbackCommentTarget_from_idx" ON "FileFeedbackCommentTarget"("from");

-- AddForeignKey
ALTER TABLE "FileFeedback" ADD CONSTRAINT "FileFeedback_reviewerParticipantId_fkey" FOREIGN KEY ("reviewerParticipantId") REFERENCES "ReadingParticipant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileFeedback" ADD CONSTRAINT "FileFeedback_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "ReadingSubmission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileFeedback" ADD CONSTRAINT "FileFeedback_appFileId_fkey" FOREIGN KEY ("appFileId") REFERENCES "AppFile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileFeedbackComment" ADD CONSTRAINT "FileFeedbackComment_fileFeedbackId_fkey" FOREIGN KEY ("fileFeedbackId") REFERENCES "FileFeedback"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileFeedbackComment" ADD CONSTRAINT "FileFeedbackComment_reviewerParticipantId_fkey" FOREIGN KEY ("reviewerParticipantId") REFERENCES "ReadingParticipant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileFeedbackCommentTarget" ADD CONSTRAINT "FileFeedbackCommentTarget_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "FileFeedbackComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
