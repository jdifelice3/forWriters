-- CreateEnum
CREATE TYPE "EventUserType" AS ENUM ('AUTHOR', 'REVIEWER');

-- AlterTable
ALTER TABLE "Events" ADD COLUMN     "EventUserType" "EventUserType" NOT NULL DEFAULT 'AUTHOR';
