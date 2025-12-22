/*
  Warnings:

  - You are about to drop the column `appFileId` on the `AuthorAppFileMeta` table. All the data in the column will be lost.
  - Added the required column `appFileMetaId` to the `AuthorAppFileMeta` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AuthorAppFileMeta" DROP CONSTRAINT "AuthorAppFileMeta_appFileId_fkey";

-- AlterTable
ALTER TABLE "AppFileMeta" ALTER COLUMN "deletedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "AuthorAppFileMeta" DROP COLUMN "appFileId",
ADD COLUMN     "appFileMetaId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "AuthorAppFileMeta" ADD CONSTRAINT "AuthorAppFileMeta_appFileMetaId_fkey" FOREIGN KEY ("appFileMetaId") REFERENCES "AppFileMeta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
