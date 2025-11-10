-- AlterTable
ALTER TABLE "UserProfiles" ALTER COLUMN "firstName" DROP NOT NULL,
ALTER COLUMN "lastName" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "bio" TEXT;
