/*
  Warnings:

  - You are about to drop the `ReadingAuthor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AuthorAppFileMeta" DROP CONSTRAINT "AuthorAppFileMeta_readingAuthorId_fkey";

-- DropForeignKey
ALTER TABLE "ReadingAuthor" DROP CONSTRAINT "ReadingAuthor_authorId_fkey";

-- DropForeignKey
ALTER TABLE "ReadingAuthor" DROP CONSTRAINT "ReadingAuthor_readingId_fkey";

-- DropForeignKey
ALTER TABLE "ReadingFeedback" DROP CONSTRAINT "ReadingFeedback_readingAuthorId_fkey";

-- DropTable
DROP TABLE "ReadingAuthor";

-- CreateTable
CREATE TABLE "ReadingParticipant" (
    "id" TEXT NOT NULL,
    "readingId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReadingParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReadingParticipant_readingId_userId_key" ON "ReadingParticipant"("readingId", "userId");

-- AddForeignKey
ALTER TABLE "AuthorAppFileMeta" ADD CONSTRAINT "AuthorAppFileMeta_readingAuthorId_fkey" FOREIGN KEY ("readingAuthorId") REFERENCES "ReadingParticipant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingParticipant" ADD CONSTRAINT "ReadingParticipant_readingId_fkey" FOREIGN KEY ("readingId") REFERENCES "Reading"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingParticipant" ADD CONSTRAINT "ReadingParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingFeedback" ADD CONSTRAINT "ReadingFeedback_readingAuthorId_fkey" FOREIGN KEY ("readingAuthorId") REFERENCES "ReadingParticipant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
