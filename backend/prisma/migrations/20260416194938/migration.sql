-- CreateIndex
CREATE INDEX "PendingInviteSession_inviteId_idx" ON "PendingInviteSession"("inviteId");

-- AddForeignKey
ALTER TABLE "PendingInviteSession" ADD CONSTRAINT "PendingInviteSession_inviteId_fkey" FOREIGN KEY ("inviteId") REFERENCES "GroupInvite"("id") ON DELETE CASCADE ON UPDATE CASCADE;
