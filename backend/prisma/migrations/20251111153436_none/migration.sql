/*
  Warnings:

  - You are about to drop the `WritingGroupAddresses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WritingGroupEvents` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WritingGroupNews` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WritingGroups` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WritingGroupsUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ReadingEventSignups" DROP CONSTRAINT "ReadingEventSignups_eventId_fkey";

-- DropForeignKey
ALTER TABLE "WritingGroupAddresses" DROP CONSTRAINT "WritingGroupAddresses_groupId_fkey";

-- DropForeignKey
ALTER TABLE "WritingGroupEvents" DROP CONSTRAINT "WritingGroupEvents_groupId_fkey";

-- DropForeignKey
ALTER TABLE "WritingGroupNews" DROP CONSTRAINT "WritingGroupNews_groupId_fkey";

-- DropForeignKey
ALTER TABLE "WritingGroupsUsers" DROP CONSTRAINT "WritingGroupsUsers_groupId_fkey";

-- DropForeignKey
ALTER TABLE "WritingGroupsUsers" DROP CONSTRAINT "WritingGroupsUsers_userId_fkey";

-- DropTable
DROP TABLE "WritingGroupAddresses";

-- DropTable
DROP TABLE "WritingGroupEvents";

-- DropTable
DROP TABLE "WritingGroupNews";

-- DropTable
DROP TABLE "WritingGroups";

-- DropTable
DROP TABLE "WritingGroupsUsers";

-- CreateTable
CREATE TABLE "Groups" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupsAddresses" (
    "id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,

    CONSTRAINT "GroupsAddresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupsUsers" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "invitedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GroupsUsers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupsNews" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "postedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "archived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "GroupsNews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupsEvents" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'READING',
    "eventDate" TIMESTAMP(3) NOT NULL,
    "submissionDeadline" TIMESTAMP(3) NOT NULL,
    "minDaysBetweenReads" INTEGER NOT NULL DEFAULT 20,
    "maxConsecutiveReads" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GroupsEvents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GroupsAddresses_groupId_key" ON "GroupsAddresses"("groupId");

-- CreateIndex
CREATE UNIQUE INDEX "GroupsUsers_groupId_userId_key" ON "GroupsUsers"("groupId", "userId");

-- AddForeignKey
ALTER TABLE "GroupsAddresses" ADD CONSTRAINT "GroupsAddresses_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupsUsers" ADD CONSTRAINT "GroupsUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupsUsers" ADD CONSTRAINT "GroupsUsers_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupsNews" ADD CONSTRAINT "GroupsNews_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupsEvents" ADD CONSTRAINT "GroupsEvents_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingEventSignups" ADD CONSTRAINT "ReadingEventSignups_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "GroupsEvents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
