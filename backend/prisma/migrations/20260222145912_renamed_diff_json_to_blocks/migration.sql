/*
  Warnings:

  - You are about to drop the column `diffJson` on the `AppFileDiff` table. All the data in the column will be lost.
  - Added the required column `blocks` to the `AppFileDiff` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "GroupType" ADD VALUE 'STUDIO';

-- AlterTable
ALTER TABLE "AppFileDiff" DROP COLUMN "diffJson",
ADD COLUMN     "blocks" JSONB NOT NULL;
