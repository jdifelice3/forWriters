/*
  Warnings:

  - You are about to drop the `WritingGroupUrls` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WritingGroups` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "GroupType" AS ENUM ('WRITING');

-- DropForeignKey
ALTER TABLE "WritingGroupUrls" DROP CONSTRAINT "WritingGroupUrls_writingGroupId_fkey";

-- DropTable
DROP TABLE "WritingGroupUrls";

-- DropTable
DROP TABLE "WritingGroups";

-- CreateTable
CREATE TABLE "Groups" (
    "id" TEXT NOT NULL,
    "groupType" "GroupType" NOT NULL DEFAULT 'WRITING',
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "Groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupUrls" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "urlType" "UrlType" NOT NULL DEFAULT 'WEB',

    CONSTRAINT "GroupUrls_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GroupUrls" ADD CONSTRAINT "GroupUrls_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
