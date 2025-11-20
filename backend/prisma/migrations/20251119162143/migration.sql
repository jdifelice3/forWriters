/*
  Warnings:

  - You are about to drop the column `groupUserId` on the `ReadingAuthor` table. All the data in the column will be lost.
  - You are about to drop the column `groupUserId` on the `ReadingFeedback` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[readingId,authorId]` on the table `ReadingAuthor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[readingManuscriptId,userId]` on the table `ReadingFeedback` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authorId` to the `ReadingAuthor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `ReadingFeedback` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ReadingAuthor" DROP CONSTRAINT "ReadingAuthor_groupUserId_fkey";

-- DropForeignKey
ALTER TABLE "ReadingFeedback" DROP CONSTRAINT "ReadingFeedback_groupUserId_fkey";

-- DropIndex
DROP INDEX "ReadingAuthor_readingId_groupUserId_key";

-- DropIndex
DROP INDEX "ReadingFeedback_readingManuscriptId_groupUserId_key";

-- AlterTable
ALTER TABLE "ReadingAuthor" DROP COLUMN "groupUserId",
ADD COLUMN     "authorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ReadingFeedback" DROP COLUMN "groupUserId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ReadingAuthor_readingId_authorId_key" ON "ReadingAuthor"("readingId", "authorId");

-- CreateIndex
CREATE UNIQUE INDEX "ReadingFeedback_readingManuscriptId_userId_key" ON "ReadingFeedback"("readingManuscriptId", "userId");

-- AddForeignKey
ALTER TABLE "ReadingAuthor" ADD CONSTRAINT "ReadingAuthor_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingFeedback" ADD CONSTRAINT "ReadingFeedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
