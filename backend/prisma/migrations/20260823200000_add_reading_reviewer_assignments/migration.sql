-- CreateEnum
CREATE TYPE "ReviewerAssignmentStatus" AS ENUM ('ASSIGNED', 'IN_PROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "ReadingReviewerAssignment" (
    "id" TEXT NOT NULL,
    "submissionId" TEXT NOT NULL,
    "reviewerUserId" TEXT NOT NULL,
    "assignedByUserId" TEXT NOT NULL,
    "status" "ReviewerAssignmentStatus" NOT NULL DEFAULT 'ASSIGNED',
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "ReadingReviewerAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReadingReviewerAssignment_submissionId_reviewerUserId_key"
ON "ReadingReviewerAssignment"("submissionId", "reviewerUserId");

-- CreateIndex
CREATE INDEX "ReadingReviewerAssignment_reviewerUserId_status_idx"
ON "ReadingReviewerAssignment"("reviewerUserId", "status");

-- CreateIndex
CREATE INDEX "ReadingReviewerAssignment_assignedByUserId_idx"
ON "ReadingReviewerAssignment"("assignedByUserId");

-- AddForeignKey
ALTER TABLE "ReadingReviewerAssignment"
ADD CONSTRAINT "ReadingReviewerAssignment_submissionId_fkey"
FOREIGN KEY ("submissionId") REFERENCES "ReadingSubmission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingReviewerAssignment"
ADD CONSTRAINT "ReadingReviewerAssignment_reviewerUserId_fkey"
FOREIGN KEY ("reviewerUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingReviewerAssignment"
ADD CONSTRAINT "ReadingReviewerAssignment_assignedByUserId_fkey"
FOREIGN KEY ("assignedByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
