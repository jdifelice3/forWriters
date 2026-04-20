-- CreateTable
CREATE TABLE "PendingInviteSession" (
    "id" TEXT NOT NULL,
    "inviteId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PendingInviteSession_pkey" PRIMARY KEY ("id")
);
