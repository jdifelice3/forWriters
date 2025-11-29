/*
  Warnings:

  - Made the column `commentText` on table `ReadingFeedbackComment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `targetText` on table `ReadingFeedbackComment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ReadingFeedbackComment" ALTER COLUMN "commentText" SET NOT NULL,
ALTER COLUMN "targetText" SET NOT NULL;
