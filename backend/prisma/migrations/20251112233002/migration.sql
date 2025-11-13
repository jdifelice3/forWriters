/*
  Warnings:

  - The values [RETREAT] on the enum `GroupType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `type` on the `GroupsEvents` table. All the data in the column will be lost.
  - You are about to drop the `ReadingEventSignups` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "EventType" ADD VALUE 'RETREAT';

-- AlterEnum
BEGIN;
CREATE TYPE "GroupType_new" AS ENUM ('WRITING');
ALTER TABLE "public"."Groups" ALTER COLUMN "groupType" DROP DEFAULT;
ALTER TABLE "Groups" ALTER COLUMN "groupType" TYPE "GroupType_new" USING ("groupType"::text::"GroupType_new");
ALTER TYPE "GroupType" RENAME TO "GroupType_old";
ALTER TYPE "GroupType_new" RENAME TO "GroupType";
DROP TYPE "public"."GroupType_old";
ALTER TABLE "Groups" ALTER COLUMN "groupType" SET DEFAULT 'WRITING';
COMMIT;

-- DropForeignKey
ALTER TABLE "ReadingEventSignups" DROP CONSTRAINT "ReadingEventSignups_appFileId_fkey";

-- DropForeignKey
ALTER TABLE "ReadingEventSignups" DROP CONSTRAINT "ReadingEventSignups_eventId_fkey";

-- DropForeignKey
ALTER TABLE "ReadingEventSignups" DROP CONSTRAINT "ReadingEventSignups_userId_fkey";

-- AlterTable
ALTER TABLE "GroupsEvents" DROP COLUMN "type",
ADD COLUMN     "eventType" "EventType" NOT NULL DEFAULT 'READING';

-- DropTable
DROP TABLE "ReadingEventSignups";

-- CreateTable
CREATE TABLE "EventSignups" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "appFileId" TEXT,
    "eventType" "EventType" NOT NULL DEFAULT 'READING',
    "signedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventSignups_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventSignups_eventId_userId_appFileId_key" ON "EventSignups"("eventId", "userId", "appFileId");

-- AddForeignKey
ALTER TABLE "EventSignups" ADD CONSTRAINT "EventSignups_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "GroupsEvents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSignups" ADD CONSTRAINT "EventSignups_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSignups" ADD CONSTRAINT "EventSignups_appFileId_fkey" FOREIGN KEY ("appFileId") REFERENCES "AppFiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
