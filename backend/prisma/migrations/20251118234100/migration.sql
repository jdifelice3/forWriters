-- DropForeignKey
ALTER TABLE "Reading" DROP CONSTRAINT "Reading_readingAddressId_fkey";

-- AlterTable
ALTER TABLE "Reading" ALTER COLUMN "readingAddressId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Reading" ADD CONSTRAINT "Reading_readingAddressId_fkey" FOREIGN KEY ("readingAddressId") REFERENCES "GroupAddress"("id") ON DELETE SET NULL ON UPDATE CASCADE;
