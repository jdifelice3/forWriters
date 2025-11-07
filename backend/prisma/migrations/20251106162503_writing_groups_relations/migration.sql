/*
  Warnings:

  - The required column `id` was added to the `WritingGroupUrls` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "WritingGroupUrls_writingGroupId_key";

-- AlterTable
ALTER TABLE "WritingGroupUrls" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "WritingGroupUrls_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "WritingGroupUrls" ADD CONSTRAINT "WritingGroupUrls_writingGroupId_fkey" FOREIGN KEY ("writingGroupId") REFERENCES "WritingGroups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
