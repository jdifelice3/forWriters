/*
  Warnings:

  - You are about to drop the column `isAdmin` on the `WritingGroups` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "writingGroupId" TEXT;

-- AlterTable
ALTER TABLE "WritingGroups" DROP COLUMN "isAdmin";

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_writingGroupId_fkey" FOREIGN KEY ("writingGroupId") REFERENCES "WritingGroups"("id") ON DELETE SET NULL ON UPDATE CASCADE;
