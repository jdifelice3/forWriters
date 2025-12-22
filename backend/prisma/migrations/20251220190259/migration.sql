/*
  Warnings:

  - You are about to drop the column `description` on the `AppFile` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `AppFile` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `UserSearch` table. All the data in the column will be lost.
  - You are about to drop the `AuthorAppFile` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `appFileMetaId` to the `AppFile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `UserSearch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "GroupType" ADD VALUE 'PERSONAL';

-- DropForeignKey
ALTER TABLE "AppFile" DROP CONSTRAINT "AppFile_userId_fkey";

-- DropForeignKey
ALTER TABLE "AuthorAppFile" DROP CONSTRAINT "AuthorAppFile_appFileId_fkey";

-- DropForeignKey
ALTER TABLE "AuthorAppFile" DROP CONSTRAINT "AuthorAppFile_readingAuthorId_fkey";

-- DropForeignKey
ALTER TABLE "ReadingFeedback" DROP CONSTRAINT "ReadingFeedback_feedbackFileId_fkey";

-- AlterTable
ALTER TABLE "AppFile" DROP COLUMN "description",
DROP COLUMN "title",
ADD COLUMN     "appFileMetaId" TEXT NOT NULL,
ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "versionComment" TEXT,
ALTER COLUMN "mimetype" SET DEFAULT 'DOCX';

-- AlterTable
ALTER TABLE "UserSearch" DROP COLUMN "id",
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "UserSearch_pkey" PRIMARY KEY ("userId");

-- DropTable
DROP TABLE "AuthorAppFile";

-- CreateTable
CREATE TABLE "AppFileMeta" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "currentVersionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppFileMeta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthorAppFileMeta" (
    "id" TEXT NOT NULL,
    "readingAuthorId" TEXT NOT NULL,
    "appFileId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuthorAppFileMeta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AuthorAppFileMeta_readingAuthorId_key" ON "AuthorAppFileMeta"("readingAuthorId");

-- AddForeignKey
ALTER TABLE "AppFile" ADD CONSTRAINT "AppFile_appFileMetaId_fkey" FOREIGN KEY ("appFileMetaId") REFERENCES "AppFileMeta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppFileMeta" ADD CONSTRAINT "AppFileMeta_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorAppFileMeta" ADD CONSTRAINT "AuthorAppFileMeta_readingAuthorId_fkey" FOREIGN KEY ("readingAuthorId") REFERENCES "ReadingAuthor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorAppFileMeta" ADD CONSTRAINT "AuthorAppFileMeta_appFileId_fkey" FOREIGN KEY ("appFileId") REFERENCES "AppFileMeta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingFeedback" ADD CONSTRAINT "ReadingFeedback_feedbackFileId_fkey" FOREIGN KEY ("feedbackFileId") REFERENCES "AppFileMeta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
