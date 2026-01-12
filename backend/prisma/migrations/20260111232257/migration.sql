/*
  Warnings:

  - You are about to drop the column `targetText` on the `ReadingFeedbackComment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ReadingFeedbackComment" DROP COLUMN "targetText";

-- CreateTable
CREATE TABLE "ReadingFeedbackCommentTarget" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "targetText" TEXT NOT NULL,
    "ordinal" INTEGER NOT NULL,

    CONSTRAINT "ReadingFeedbackCommentTarget_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ReadingFeedbackCommentTarget_commentId_idx" ON "ReadingFeedbackCommentTarget"("commentId");

-- AddForeignKey
ALTER TABLE "ReadingFeedbackCommentTarget" ADD CONSTRAINT "ReadingFeedbackCommentTarget_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "ReadingFeedbackComment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
