/*
  Warnings:

  - The primary key for the `Users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `Users` table. All the data in the column will be lost.
  - The required column `id` was added to the `Users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- CreateEnum
CREATE TYPE "UrlType" AS ENUM ('WEB', 'MEETUP', 'LINKEDIN');

-- AlterTable
ALTER TABLE "Users" DROP CONSTRAINT "Users_pkey",
DROP COLUMN "userId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "WritingGroups" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "WritingGroups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WritingGroupUrls" (
    "writingGroupId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "urlType" "UrlType" NOT NULL DEFAULT 'WEB'
);

-- CreateIndex
CREATE UNIQUE INDEX "WritingGroupUrls_writingGroupId_key" ON "WritingGroupUrls"("writingGroupId");
