/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Groups` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "GroupType" AS ENUM ('WRITING', 'RETREAT');

-- AlterTable
ALTER TABLE "Groups" ADD COLUMN     "groupType" "GroupType" NOT NULL DEFAULT 'WRITING';

-- CreateIndex
CREATE UNIQUE INDEX "Groups_name_key" ON "Groups"("name");
