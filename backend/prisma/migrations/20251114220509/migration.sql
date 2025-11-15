-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('MANUSCRIPT', 'FEEDBACK');

-- AlterTable
ALTER TABLE "AppFiles" ADD COLUMN     "documentType" "DocumentType" NOT NULL DEFAULT 'MANUSCRIPT';
