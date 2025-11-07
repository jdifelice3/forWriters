/*
  Warnings:

  - You are about to drop the `GroupUrls` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Groups` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GroupUrls" DROP CONSTRAINT "GroupUrls_groupId_fkey";

-- DropTable
DROP TABLE "GroupUrls";

-- DropTable
DROP TABLE "Groups";

-- DropEnum
DROP TYPE "GroupType";

-- CreateTable
CREATE TABLE "WritingGroups" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "WritingGroups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Urls" (
    "id" TEXT NOT NULL,
    "writingGroupId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "urlType" "UrlType" NOT NULL DEFAULT 'WEB',

    CONSTRAINT "Urls_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Urls" ADD CONSTRAINT "Urls_writingGroupId_fkey" FOREIGN KEY ("writingGroupId") REFERENCES "WritingGroups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
