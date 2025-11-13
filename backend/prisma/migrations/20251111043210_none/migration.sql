/*
  Warnings:

  - You are about to drop the column `city` on the `WritingGroups` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `WritingGroups` table. All the data in the column will be lost.
  - You are about to drop the column `joinedAt` on the `WritingGroupsUsers` table. All the data in the column will be lost.
  - You are about to drop the column `writingGroupId` on the `WritingGroupsUsers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[groupId,userId]` on the table `WritingGroupsUsers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `WritingGroups` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupId` to the `WritingGroupsUsers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "WritingGroupsUsers" DROP CONSTRAINT "WritingGroupsUsers_writingGroupId_fkey";

-- DropIndex
DROP INDEX "WritingGroupsUsers_writingGroupId_userId_key";

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "WritingGroups" DROP COLUMN "city",
DROP COLUMN "state",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "WritingGroupsUsers" DROP COLUMN "joinedAt",
DROP COLUMN "writingGroupId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "groupId" TEXT NOT NULL,
ADD COLUMN     "invitedBy" TEXT;

-- CreateTable
CREATE TABLE "WritingGroupAddresses" (
    "id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,

    CONSTRAINT "WritingGroupAddresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WritingGroupNews" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "postedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "archived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "WritingGroupNews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WritingGroupEvents" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'READING',
    "eventDate" TIMESTAMP(3) NOT NULL,
    "submissionDeadline" TIMESTAMP(3) NOT NULL,
    "minDaysBetweenReads" INTEGER NOT NULL DEFAULT 20,
    "maxConsecutiveReads" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WritingGroupEvents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReadingEventSignups" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "appFileId" TEXT,
    "signedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReadingEventSignups_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WritingGroupAddresses_groupId_key" ON "WritingGroupAddresses"("groupId");

-- CreateIndex
CREATE UNIQUE INDEX "ReadingEventSignups_eventId_userId_appFileId_key" ON "ReadingEventSignups"("eventId", "userId", "appFileId");

-- CreateIndex
CREATE UNIQUE INDEX "WritingGroupsUsers_groupId_userId_key" ON "WritingGroupsUsers"("groupId", "userId");

-- AddForeignKey
ALTER TABLE "WritingGroupAddresses" ADD CONSTRAINT "WritingGroupAddresses_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "WritingGroups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WritingGroupsUsers" ADD CONSTRAINT "WritingGroupsUsers_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "WritingGroups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WritingGroupNews" ADD CONSTRAINT "WritingGroupNews_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "WritingGroups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WritingGroupEvents" ADD CONSTRAINT "WritingGroupEvents_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "WritingGroups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingEventSignups" ADD CONSTRAINT "ReadingEventSignups_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "WritingGroupEvents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingEventSignups" ADD CONSTRAINT "ReadingEventSignups_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingEventSignups" ADD CONSTRAINT "ReadingEventSignups_appFileId_fkey" FOREIGN KEY ("appFileId") REFERENCES "AppFiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
