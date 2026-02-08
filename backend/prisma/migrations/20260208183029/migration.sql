/*
  Warnings:

  - You are about to drop the column `sizeBytes` on the `AppFile` table. All the data in the column will be lost.
  - You are about to drop the column `proTrialUsedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Subscription` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_userId_fkey";

-- AlterTable
ALTER TABLE "AppFile" DROP COLUMN "sizeBytes";

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "href" TEXT NOT NULL DEFAULT '/dashboard';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "proTrialUsedAt";

-- DropTable
DROP TABLE "Subscription";

-- DropEnum
DROP TYPE "SubscriptionTier";

-- CreateTable
CREATE TABLE "UserSearch" (
    "userId" TEXT NOT NULL,
    "fullName" TEXT,
    "bio" TEXT,

    CONSTRAINT "UserSearch_pkey" PRIMARY KEY ("userId")
);
