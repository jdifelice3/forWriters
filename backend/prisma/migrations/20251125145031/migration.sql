/*
  Warnings:

  - Added the required column `feedbackUserId` to the `ReadingFeedback` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReadingFeedback" ADD COLUMN     "feedbackUserId" TEXT NOT NULL;
