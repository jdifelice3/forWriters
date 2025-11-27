/*
  Warnings:

  - A unique constraint covering the columns `[readingId,authorId,appFileId]` on the table `ReadingAuthor` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ReadingAuthor_readingId_authorId_key";

-- CreateIndex
CREATE UNIQUE INDEX "ReadingAuthor_readingId_authorId_appFileId_key" ON "ReadingAuthor"("readingId", "authorId", "appFileId");
