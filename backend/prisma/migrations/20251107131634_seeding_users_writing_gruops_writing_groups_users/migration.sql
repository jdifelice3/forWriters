/*
  Warnings:

  - You are about to drop the column `idAdmin` on the `WritingGroupsUsers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WritingGroupsUsers" DROP COLUMN "idAdmin",
ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false;
