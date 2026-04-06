/*
  Warnings:

  - A unique constraint covering the columns `[tokenHash]` on the table `GroupInvite` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `invitedById` to the `GroupInvite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `GroupInvite` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GroupInvite" DROP CONSTRAINT "GroupInvite_groupId_fkey";

-- AlterTable
ALTER TABLE "GroupInvite" ADD COLUMN     "invitedById" TEXT NOT NULL,
ADD COLUMN     "revokedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "GroupInvite_tokenHash_key" ON "GroupInvite"("tokenHash");

-- CreateIndex
CREATE INDEX "GroupInvite_groupId_idx" ON "GroupInvite"("groupId");

-- CreateIndex
CREATE INDEX "GroupInvite_email_idx" ON "GroupInvite"("email");

-- CreateIndex
CREATE INDEX "GroupInvite_invitedById_idx" ON "GroupInvite"("invitedById");

-- CreateIndex
CREATE INDEX "GroupUser_groupId_idx" ON "GroupUser"("groupId");

-- CreateIndex
CREATE INDEX "GroupUser_userId_idx" ON "GroupUser"("userId");

-- AddForeignKey
ALTER TABLE "GroupInvite" ADD CONSTRAINT "GroupInvite_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupInvite" ADD CONSTRAINT "GroupInvite_invitedById_fkey" FOREIGN KEY ("invitedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
