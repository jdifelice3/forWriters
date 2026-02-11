-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "triggerUserId" TEXT;

-- AlterTable
ALTER TABLE "Reading" ALTER COLUMN "readingDate" SET DATA TYPE DATE,
ALTER COLUMN "submissionDeadline" SET DATA TYPE DATE;
