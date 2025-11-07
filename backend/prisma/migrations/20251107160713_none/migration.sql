/*
  Warnings:

  - The values [WEB] on the enum `UrlType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `authtoken` on the `Users` table. All the data in the column will be lost.
  - Added the required column `superTokensId` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UrlType_new" AS ENUM ('AUDIO', 'IMAGE', 'LINKEDIN', 'MEETUP', 'SUBSTACK', 'WEBSITE', 'YOUTUBE');
ALTER TABLE "public"."Urls" ALTER COLUMN "urlType" DROP DEFAULT;
ALTER TABLE "Urls" ALTER COLUMN "urlType" TYPE "UrlType_new" USING ("urlType"::text::"UrlType_new");
ALTER TYPE "UrlType" RENAME TO "UrlType_old";
ALTER TYPE "UrlType_new" RENAME TO "UrlType";
DROP TYPE "public"."UrlType_old";
ALTER TABLE "Urls" ALTER COLUMN "urlType" SET DEFAULT 'WEBSITE';
COMMIT;

-- AlterTable
ALTER TABLE "Urls" ALTER COLUMN "urlType" SET DEFAULT 'WEBSITE';

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "authtoken",
ADD COLUMN     "superTokensId" TEXT NOT NULL;
