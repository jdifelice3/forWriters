/*
  Warnings:

  - You are about to drop the `AuthorAppFileMeta` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AuthorAppFileMeta" DROP CONSTRAINT "AuthorAppFileMeta_appFileMetaId_fkey";

-- DropForeignKey
ALTER TABLE "AuthorAppFileMeta" DROP CONSTRAINT "AuthorAppFileMeta_readingAuthorId_fkey";

-- DropTable
DROP TABLE "AuthorAppFileMeta";

-- CreateTable
CREATE TABLE "AuthorAppFile" (
    "id" TEXT NOT NULL,
    "readingAuthorId" TEXT NOT NULL,
    "appFileId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuthorAppFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AuthorAppFile_readingAuthorId_key" ON "AuthorAppFile"("readingAuthorId");

-- AddForeignKey
ALTER TABLE "AuthorAppFile" ADD CONSTRAINT "AuthorAppFile_readingAuthorId_fkey" FOREIGN KEY ("readingAuthorId") REFERENCES "ReadingAuthor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorAppFile" ADD CONSTRAINT "AuthorAppFile_appFileId_fkey" FOREIGN KEY ("appFileId") REFERENCES "AppFile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
