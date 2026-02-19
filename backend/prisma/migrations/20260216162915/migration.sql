/*
  Warnings:

  - Added the required column `addedCount` to the `AppFileDiff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deletedCount` to the `AppFileDiff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modifiedCount` to the `AppFileDiff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paragraphDelta` to the `AppFileDiff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sentenceDelta` to the `AppFileDiff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wordDelta` to the `AppFileDiff` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AppFileDiff" ADD COLUMN     "addedCount" INTEGER NOT NULL,
ADD COLUMN     "deletedCount" INTEGER NOT NULL,
ADD COLUMN     "modifiedCount" INTEGER NOT NULL,
ADD COLUMN     "paragraphDelta" INTEGER NOT NULL,
ADD COLUMN     "sentenceDelta" INTEGER NOT NULL,
ADD COLUMN     "wordDelta" INTEGER NOT NULL;
