/*
  Warnings:

  - You are about to drop the column `isAdmin` on the `GroupUser` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "GroupRole" AS ENUM ('MEMBER', 'ADMIN');

-- AlterTable
ALTER TABLE "GroupUser" DROP COLUMN "isAdmin",
ADD COLUMN     "role" "GroupRole" NOT NULL DEFAULT 'MEMBER';

-- DropEnum
DROP TYPE "GroupMemberRole";
