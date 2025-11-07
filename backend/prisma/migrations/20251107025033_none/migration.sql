/*
  Warnings:

  - You are about to drop the column `writingGroupId` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the `Events` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Works` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Events" DROP CONSTRAINT "Events_createdUserId_fkey";

-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_writingGroupId_fkey";

-- DropForeignKey
ALTER TABLE "Works" DROP CONSTRAINT "Works_userId_fkey";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "writingGroupId";

-- DropTable
DROP TABLE "Events";

-- DropTable
DROP TABLE "Works";

-- CreateTable
CREATE TABLE "WritingGroupsUsers" (
    "id" TEXT NOT NULL,
    "writingGroupId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "idAdmin" BOOLEAN NOT NULL DEFAULT false,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WritingGroupsUsers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WritingGroupsUsers_writingGroupId_userId_key" ON "WritingGroupsUsers"("writingGroupId", "userId");

-- AddForeignKey
ALTER TABLE "WritingGroupsUsers" ADD CONSTRAINT "WritingGroupsUsers_writingGroupId_fkey" FOREIGN KEY ("writingGroupId") REFERENCES "WritingGroups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WritingGroupsUsers" ADD CONSTRAINT "WritingGroupsUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
