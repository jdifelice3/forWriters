-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'AUTHOR';

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_id_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'READER';

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
