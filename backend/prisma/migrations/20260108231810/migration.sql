/*
  Warnings:

  - You are about to drop the column `participantId` on the `ReadingFeedbackComment` table. All the data in the column will be lost.
  - Added the required column `reviewerParticipantId` to the `ReadingFeedbackComment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReadingFeedbackComment" DROP COLUMN "participantId",
ADD COLUMN     "reviewerParticipantId" TEXT NOT NULL;
