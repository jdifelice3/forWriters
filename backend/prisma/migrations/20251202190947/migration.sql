-- CreateTable
CREATE TABLE "CollaboratorRequest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "collaboratorId" TEXT NOT NULL,
    "status" "JoinRequestStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CollaboratorRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCollaborator" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "collaboratorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserCollaborator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSearch" (
    "id" TEXT NOT NULL,
    "fullName" TEXT,
    "bio" TEXT,

    CONSTRAINT "UserSearch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CollaboratorRequest_userId_idx" ON "CollaboratorRequest"("userId");

-- CreateIndex
CREATE INDEX "CollaboratorRequest_status_idx" ON "CollaboratorRequest"("status");

-- AddForeignKey
ALTER TABLE "CollaboratorRequest" ADD CONSTRAINT "CollaboratorRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCollaborator" ADD CONSTRAINT "UserCollaborator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCollaborator" ADD CONSTRAINT "UserCollaborator_collaboratorId_fkey" FOREIGN KEY ("collaboratorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
