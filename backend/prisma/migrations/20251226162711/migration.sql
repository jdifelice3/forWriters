/*
  Warnings:

  - You are about to drop the `AuthorAppFile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AuthorAppFile" DROP CONSTRAINT "AuthorAppFile_appFileId_fkey";

-- DropForeignKey
ALTER TABLE "AuthorAppFile" DROP CONSTRAINT "AuthorAppFile_readingAuthorId_fkey";

-- DropTable
DROP TABLE "AuthorAppFile";

-- CreateTable
CREATE TABLE "AuthorAppFileMeta" (
    "id" TEXT NOT NULL,
    "readingAuthorId" TEXT NOT NULL,
    "appFileMetaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuthorAppFileMeta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AuthorAppFileMeta_readingAuthorId_key" ON "AuthorAppFileMeta"("readingAuthorId");

-- AddForeignKey
ALTER TABLE "AuthorAppFileMeta" ADD CONSTRAINT "AuthorAppFileMeta_readingAuthorId_fkey" FOREIGN KEY ("readingAuthorId") REFERENCES "ReadingAuthor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorAppFileMeta" ADD CONSTRAINT "AuthorAppFileMeta_appFileMetaId_fkey" FOREIGN KEY ("appFileMetaId") REFERENCES "AppFileMeta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
