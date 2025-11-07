/*
  Warnings:

  - You are about to drop the column `writingGroupId` on the `Urls` table. All the data in the column will be lost.
  - You are about to drop the column `supertokensid` on the `Users` table. All the data in the column will be lost.
  - Added the required column `urlOwnerId` to the `Urls` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authtoken` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UrlOwnerType" AS ENUM ('USER', 'WRITINGGROUP');

-- AlterEnum
ALTER TYPE "UrlType" ADD VALUE 'SUBSTACK';

-- DropForeignKey
ALTER TABLE "Urls" DROP CONSTRAINT "Urls_writingGroupId_fkey";

-- AlterTable
ALTER TABLE "Urls" DROP COLUMN "writingGroupId",
ADD COLUMN     "urlOwnerId" TEXT NOT NULL,
ADD COLUMN     "urlOwnerType" "UrlOwnerType" NOT NULL DEFAULT 'USER';

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "supertokensid",
ADD COLUMN     "authtoken" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "UserProfiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT,

    CONSTRAINT "UserProfiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProfiles_userId_key" ON "UserProfiles"("userId");

-- AddForeignKey
ALTER TABLE "UserProfiles" ADD CONSTRAINT "UserProfiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
