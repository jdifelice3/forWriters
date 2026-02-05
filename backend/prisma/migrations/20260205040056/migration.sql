/*
  Warnings:

  - The values [PROFILE_IMAGE] on the enum `FileType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `profileImageFileId` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the column `profileImageUrl` on the `UserProfile` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "FileType_new" AS ENUM ('DOCX', 'PDF');
ALTER TABLE "public"."AppFile" ALTER COLUMN "mimetype" DROP DEFAULT;
ALTER TABLE "AppFile" ALTER COLUMN "mimetype" TYPE "FileType_new" USING ("mimetype"::text::"FileType_new");
ALTER TYPE "FileType" RENAME TO "FileType_old";
ALTER TYPE "FileType_new" RENAME TO "FileType";
DROP TYPE "public"."FileType_old";
ALTER TABLE "AppFile" ALTER COLUMN "mimetype" SET DEFAULT 'DOCX';
COMMIT;

-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "profileImageFileId",
DROP COLUMN "profileImageUrl";
