/*
  Warnings:

  - You are about to drop the column `bio` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserProfiles" ADD COLUMN     "bio" TEXT;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "bio";
