/*
  Warnings:

  - You are about to drop the column `triggerUserId` on the `Notification` table. All the data in the column will be lost.
  - Made the column `firstName` on table `UserProfile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `UserProfile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "triggerUserId";

-- AlterTable
ALTER TABLE "UserProfile" ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "firstName" SET DEFAULT 'Name',
ALTER COLUMN "lastName" SET NOT NULL,
ALTER COLUMN "lastName" SET DEFAULT 'Unknown';
