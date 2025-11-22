/*
  Warnings:

  - You are about to drop the column `readingManuscriptId` on the `ReadingFeedback` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `ReadingFeedback` table. All the data in the column will be lost.
  - You are about to drop the `ReadingManuscript` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[authorId]` on the table `ReadingAuthor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `readingAuthorId` to the `ReadingFeedback` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ReadingFeedback" DROP CONSTRAINT "ReadingFeedback_readingManuscriptId_fkey";

-- DropForeignKey
ALTER TABLE "ReadingFeedback" DROP CONSTRAINT "ReadingFeedback_userId_fkey";

-- DropForeignKey
ALTER TABLE "ReadingManuscript" DROP CONSTRAINT "ReadingManuscript_appFileId_fkey";

-- DropForeignKey
ALTER TABLE "ReadingManuscript" DROP CONSTRAINT "ReadingManuscript_readingId_fkey";

-- DropIndex
DROP INDEX "ReadingAuthor_readingId_authorId_key";

-- DropIndex
DROP INDEX "ReadingFeedback_readingManuscriptId_userId_key";

-- AlterTable
ALTER TABLE "ReadingAuthor" ADD COLUMN     "appFileId" TEXT;

-- AlterTable
ALTER TABLE "ReadingFeedback" DROP COLUMN "readingManuscriptId",
DROP COLUMN "userId",
ADD COLUMN     "readingAuthorId" TEXT NOT NULL;

-- DropTable
DROP TABLE "ReadingManuscript";

-- CreateTable
CREATE TABLE "AuthorAppFile" (
    "id" TEXT NOT NULL,
    "readingAuthorId" TEXT NOT NULL,
    "appFileId" TEXT NOT NULL,

    CONSTRAINT "AuthorAppFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AuthorAppFile_readingAuthorId_key" ON "AuthorAppFile"("readingAuthorId");

-- CreateIndex
CREATE UNIQUE INDEX "ReadingAuthor_authorId_key" ON "ReadingAuthor"("authorId");

-- AddForeignKey
ALTER TABLE "AuthorAppFile" ADD CONSTRAINT "AuthorAppFile_readingAuthorId_fkey" FOREIGN KEY ("readingAuthorId") REFERENCES "ReadingAuthor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorAppFile" ADD CONSTRAINT "AuthorAppFile_appFileId_fkey" FOREIGN KEY ("appFileId") REFERENCES "AppFile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingFeedback" ADD CONSTRAINT "ReadingFeedback_readingAuthorId_fkey" FOREIGN KEY ("readingAuthorId") REFERENCES "ReadingAuthor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
