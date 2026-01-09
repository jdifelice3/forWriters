/*
  Warnings:

  - You are about to drop the column `readingAuthorId` on the `ReadingFeedbackComment` table. All the data in the column will be lost.
  - Added the required column `participantId` to the `ReadingFeedbackComment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "GroupRole" ADD VALUE 'OWNER';
ALTER TYPE "GroupRole" ADD VALUE 'READER';

-- AlterTable
ALTER TABLE "ReadingFeedbackComment" DROP COLUMN "readingAuthorId",
ADD COLUMN     "participantId" TEXT NOT NULL;
