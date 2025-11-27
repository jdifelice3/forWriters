/*
  Warnings:

  - A unique constraint covering the columns `[readingId,authorId]` on the table `ReadingAuthor` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ReadingAuthor_authorId_key";

-- CreateIndex
CREATE UNIQUE INDEX "ReadingAuthor_readingId_authorId_key" ON "ReadingAuthor"("readingId", "authorId");
