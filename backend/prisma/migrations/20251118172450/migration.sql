/*
  Warnings:

  - You are about to drop the `AppFiles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EventFeedback` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EventSubmission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Events` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EventsUsers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Groups` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GroupsAddresses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GroupsEvents` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GroupsNews` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GroupsUrls` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GroupsUsers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubmissionFeedback` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserProfiles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsersUrls` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Works` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AppFiles" DROP CONSTRAINT "AppFiles_userId_fkey";

-- DropForeignKey
ALTER TABLE "EventSubmission" DROP CONSTRAINT "EventSubmission_appFileId_fkey";

-- DropForeignKey
ALTER TABLE "EventSubmission" DROP CONSTRAINT "EventSubmission_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventSubmission" DROP CONSTRAINT "EventSubmission_userId_fkey";

-- DropForeignKey
ALTER TABLE "Events" DROP CONSTRAINT "Events_createdUserId_fkey";

-- DropForeignKey
ALTER TABLE "EventsUsers" DROP CONSTRAINT "EventsUsers_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventsUsers" DROP CONSTRAINT "EventsUsers_userId_fkey";

-- DropForeignKey
ALTER TABLE "Groups" DROP CONSTRAINT "Groups_creatorUserId_fkey";

-- DropForeignKey
ALTER TABLE "GroupsAddresses" DROP CONSTRAINT "GroupsAddresses_groupId_fkey";

-- DropForeignKey
ALTER TABLE "GroupsEvents" DROP CONSTRAINT "GroupsEvents_groupId_fkey";

-- DropForeignKey
ALTER TABLE "GroupsNews" DROP CONSTRAINT "GroupsNews_groupId_fkey";

-- DropForeignKey
ALTER TABLE "GroupsUrls" DROP CONSTRAINT "GroupsUrls_groupId_fkey";

-- DropForeignKey
ALTER TABLE "GroupsUsers" DROP CONSTRAINT "GroupsUsers_groupId_fkey";

-- DropForeignKey
ALTER TABLE "GroupsUsers" DROP CONSTRAINT "GroupsUsers_userId_fkey";

-- DropForeignKey
ALTER TABLE "SubmissionFeedback" DROP CONSTRAINT "SubmissionFeedback_appFileId_fkey";

-- DropForeignKey
ALTER TABLE "SubmissionFeedback" DROP CONSTRAINT "SubmissionFeedback_reviewerId_fkey";

-- DropForeignKey
ALTER TABLE "SubmissionFeedback" DROP CONSTRAINT "SubmissionFeedback_submissionId_fkey";

-- DropForeignKey
ALTER TABLE "UserProfiles" DROP CONSTRAINT "UserProfiles_userId_fkey";

-- DropForeignKey
ALTER TABLE "UsersUrls" DROP CONSTRAINT "UsersUrls_userId_fkey";

-- DropForeignKey
ALTER TABLE "Works" DROP CONSTRAINT "Works_userId_fkey";

-- DropTable
DROP TABLE "AppFiles";

-- DropTable
DROP TABLE "EventFeedback";

-- DropTable
DROP TABLE "EventSubmission";

-- DropTable
DROP TABLE "Events";

-- DropTable
DROP TABLE "EventsUsers";

-- DropTable
DROP TABLE "Groups";

-- DropTable
DROP TABLE "GroupsAddresses";

-- DropTable
DROP TABLE "GroupsEvents";

-- DropTable
DROP TABLE "GroupsNews";

-- DropTable
DROP TABLE "GroupsUrls";

-- DropTable
DROP TABLE "GroupsUsers";

-- DropTable
DROP TABLE "SubmissionFeedback";

-- DropTable
DROP TABLE "UserProfiles";

-- DropTable
DROP TABLE "Users";

-- DropTable
DROP TABLE "UsersUrls";

-- DropTable
DROP TABLE "Works";

-- CreateTable
CREATE TABLE "AppFile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "filename" TEXT NOT NULL,
    "documentType" "DocumentType" NOT NULL DEFAULT 'MANUSCRIPT',
    "mimetype" "FileType" NOT NULL DEFAULT 'PDF',
    "url" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AppFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reading" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdUserId" TEXT NOT NULL,
    "readingDate" TIMESTAMP(3) NOT NULL,
    "readingStartTime" TEXT NOT NULL,
    "readingEndTime" TEXT NOT NULL,
    "readingAddressId" TEXT NOT NULL,
    "submissionDeadline" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "minDaysBetweenReads" INTEGER NOT NULL DEFAULT 20,
    "maxConsecutiveReads" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Reading_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReadingSubmission" (
    "id" TEXT NOT NULL,
    "readingId" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "appFileId" TEXT,
    "signedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReadingSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReadingParticipant" (
    "id" TEXT NOT NULL,
    "readingId" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReadingParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" TEXT NOT NULL,
    "creatorUserId" TEXT NOT NULL,
    "groupType" "GroupType" NOT NULL DEFAULT 'WRITING',
    "name" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "websiteUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupAddress" (
    "id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,

    CONSTRAINT "GroupAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupNews" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "postedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "archived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "GroupNews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupUser" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "invitedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GroupUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupUrl" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "urlType" "UrlType" NOT NULL DEFAULT 'WEBSITE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GroupUrl_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "submissionId" TEXT NOT NULL,
    "reviewerId" TEXT NOT NULL,
    "appFileId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "superTokensId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'EDITOR',
    "username" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "phone" TEXT,
    "bio" TEXT,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserUrl" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "urlType" "UrlType" NOT NULL DEFAULT 'WEBSITE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserUrl_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Work" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "workType" "WorkType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "wordCount" INTEGER,
    "pageCount" INTEGER,
    "genre" "Genre" NOT NULL,
    "fileName" TEXT,
    "manuscriptIsVisible" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Work_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Reading_readingAddressId_key" ON "Reading"("readingAddressId");

-- CreateIndex
CREATE UNIQUE INDEX "ReadingSubmission_readingId_participantId_appFileId_key" ON "ReadingSubmission"("readingId", "participantId", "appFileId");

-- CreateIndex
CREATE UNIQUE INDEX "ReadingParticipant_readingId_participantId_key" ON "ReadingParticipant"("readingId", "participantId");

-- CreateIndex
CREATE UNIQUE INDEX "Group_name_key" ON "Group"("name");

-- CreateIndex
CREATE UNIQUE INDEX "GroupUser_groupId_userId_key" ON "GroupUser"("groupId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Feedback_submissionId_reviewerId_appFileId_key" ON "Feedback"("submissionId", "reviewerId", "appFileId");

-- CreateIndex
CREATE UNIQUE INDEX "User_superTokensId_key" ON "User"("superTokensId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userId_key" ON "UserProfile"("userId");

-- AddForeignKey
ALTER TABLE "AppFile" ADD CONSTRAINT "AppFile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reading" ADD CONSTRAINT "Reading_createdUserId_fkey" FOREIGN KEY ("createdUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reading" ADD CONSTRAINT "Reading_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reading" ADD CONSTRAINT "Reading_readingAddressId_fkey" FOREIGN KEY ("readingAddressId") REFERENCES "GroupAddress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingSubmission" ADD CONSTRAINT "ReadingSubmission_readingId_fkey" FOREIGN KEY ("readingId") REFERENCES "Reading"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingSubmission" ADD CONSTRAINT "ReadingSubmission_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingSubmission" ADD CONSTRAINT "ReadingSubmission_appFileId_fkey" FOREIGN KEY ("appFileId") REFERENCES "AppFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingParticipant" ADD CONSTRAINT "ReadingParticipant_readingId_fkey" FOREIGN KEY ("readingId") REFERENCES "Reading"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingParticipant" ADD CONSTRAINT "ReadingParticipant_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_creatorUserId_fkey" FOREIGN KEY ("creatorUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupAddress" ADD CONSTRAINT "GroupAddress_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupNews" ADD CONSTRAINT "GroupNews_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupUser" ADD CONSTRAINT "GroupUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupUser" ADD CONSTRAINT "GroupUser_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupUrl" ADD CONSTRAINT "GroupUrl_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "ReadingSubmission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_appFileId_fkey" FOREIGN KEY ("appFileId") REFERENCES "AppFile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserUrl" ADD CONSTRAINT "UserUrl_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Work" ADD CONSTRAINT "Work_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
