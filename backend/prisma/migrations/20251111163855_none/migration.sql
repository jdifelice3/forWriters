/*
  Warnings:

  - Added the required column `creatorUserId` to the `Groups` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Groups" ADD COLUMN     "creatorUserId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Groups" ADD CONSTRAINT "Groups_creatorUserId_fkey" FOREIGN KEY ("creatorUserId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
