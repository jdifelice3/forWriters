-- CreateEnum
CREATE TYPE "CommentSource" AS ENUM ('DOCX', 'MANUAL');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('MANUSCRIPT', 'FEEDBACK');

-- CreateEnum
CREATE TYPE "ParticipantType" AS ENUM ('AUTHOR', 'REVIEWER');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('READING', 'RETREAT');

-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('FANTASY', 'HISTORICAL', 'HORROR', 'LITERARY', 'MYSTERY', 'POEM', 'ROMANCE', 'SCIENCEFICTION');

-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('DOCX', 'PDF');

-- CreateEnum
CREATE TYPE "GroupType" AS ENUM ('WRITING');

-- CreateEnum
CREATE TYPE "JoinRequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "GroupMemberRole" AS ENUM ('MEMBER', 'ADMIN');

-- CreateEnum
CREATE TYPE "ReadingScheduleType" AS ENUM ('SCHEDULED', 'UNSCHEDULED');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'AUTHOR', 'EDITOR', 'READER');

-- CreateEnum
CREATE TYPE "UrlOwnerType" AS ENUM ('USER', 'WRITINGGROUP');

-- CreateEnum
CREATE TYPE "UrlType" AS ENUM ('AUDIO', 'FACEBOOK', 'IMAGE', 'LINKEDIN', 'MEETUP', 'SUBSTACK', 'WEBSITE', 'YOUTUBE');

-- CreateEnum
CREATE TYPE "WorkType" AS ENUM ('FLASHFICTION', 'NOVEL', 'NOVELLA', 'NOVELETTE', 'PLAY', 'SCREENPLAY', 'SERIALIZEDFICTION', 'SHORTSTORY');

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
    "workType" "WorkType",
    "wordCount" INTEGER,
    "pageCount" INTEGER,
    "genre" "Genre",
    "manuscriptIsVisible" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "AppFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthorAppFile" (
    "id" TEXT NOT NULL,
    "readingAuthorId" TEXT NOT NULL,
    "appFileId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuthorAppFile_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "JoinRequest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "status" "JoinRequestStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JoinRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reading" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdUserId" TEXT NOT NULL,
    "readingDate" TIMESTAMP(3),
    "readingStartTime" TEXT,
    "readingEndTime" TEXT,
    "readingAddressId" TEXT,
    "submissionDeadline" TIMESTAMP(3),
    "spotsOpen" INTEGER NOT NULL DEFAULT 2,
    "description" TEXT NOT NULL,
    "minDaysBetweenReads" INTEGER NOT NULL DEFAULT 20,
    "maxConsecutiveReads" INTEGER NOT NULL DEFAULT 1,
    "scheduledType" "ReadingScheduleType" NOT NULL DEFAULT 'SCHEDULED',

    CONSTRAINT "Reading_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReadingAuthor" (
    "id" TEXT NOT NULL,
    "readingId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReadingAuthor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReadingFeedback" (
    "id" TEXT NOT NULL,
    "readingAuthorId" TEXT NOT NULL,
    "feedbackUserId" TEXT NOT NULL,
    "feedbackFileId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReadingFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReadingFeedbackComment" (
    "id" TEXT NOT NULL,
    "readingAuthorId" TEXT NOT NULL,
    "readingFeedbackId" TEXT NOT NULL,
    "source" "CommentSource" NOT NULL DEFAULT 'DOCX',
    "commentText" TEXT NOT NULL,
    "targetText" TEXT NOT NULL,

    CONSTRAINT "ReadingFeedbackComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "superTokensId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'READER',
    "username" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "UserProfile" (
    "id" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "phone" TEXT,
    "bio" TEXT,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSearch" (
    "id" TEXT,
    "fullName" TEXT,
    "bio" TEXT
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

-- CreateIndex
CREATE UNIQUE INDEX "AuthorAppFile_readingAuthorId_key" ON "AuthorAppFile"("readingAuthorId");

-- CreateIndex
CREATE INDEX "CollaboratorRequest_userId_idx" ON "CollaboratorRequest"("userId");

-- CreateIndex
CREATE INDEX "CollaboratorRequest_status_idx" ON "CollaboratorRequest"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Group_name_key" ON "Group"("name");

-- CreateIndex
CREATE UNIQUE INDEX "GroupUser_groupId_userId_key" ON "GroupUser"("groupId", "userId");

-- CreateIndex
CREATE INDEX "JoinRequest_userId_idx" ON "JoinRequest"("userId");

-- CreateIndex
CREATE INDEX "JoinRequest_groupId_idx" ON "JoinRequest"("groupId");

-- CreateIndex
CREATE INDEX "JoinRequest_status_idx" ON "JoinRequest"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Reading_readingAddressId_key" ON "Reading"("readingAddressId");

-- CreateIndex
CREATE UNIQUE INDEX "ReadingAuthor_readingId_authorId_key" ON "ReadingAuthor"("readingId", "authorId");

-- CreateIndex
CREATE UNIQUE INDEX "User_superTokensId_key" ON "User"("superTokensId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "AppFile" ADD CONSTRAINT "AppFile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorAppFile" ADD CONSTRAINT "AuthorAppFile_readingAuthorId_fkey" FOREIGN KEY ("readingAuthorId") REFERENCES "ReadingAuthor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorAppFile" ADD CONSTRAINT "AuthorAppFile_appFileId_fkey" FOREIGN KEY ("appFileId") REFERENCES "AppFile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollaboratorRequest" ADD CONSTRAINT "CollaboratorRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollaboratorRequest" ADD CONSTRAINT "CollaboratorRequest_collaboratorId_fkey" FOREIGN KEY ("collaboratorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "JoinRequest" ADD CONSTRAINT "JoinRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JoinRequest" ADD CONSTRAINT "JoinRequest_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reading" ADD CONSTRAINT "Reading_createdUserId_fkey" FOREIGN KEY ("createdUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reading" ADD CONSTRAINT "Reading_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reading" ADD CONSTRAINT "Reading_readingAddressId_fkey" FOREIGN KEY ("readingAddressId") REFERENCES "GroupAddress"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingAuthor" ADD CONSTRAINT "ReadingAuthor_readingId_fkey" FOREIGN KEY ("readingId") REFERENCES "Reading"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingAuthor" ADD CONSTRAINT "ReadingAuthor_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingFeedback" ADD CONSTRAINT "ReadingFeedback_readingAuthorId_fkey" FOREIGN KEY ("readingAuthorId") REFERENCES "ReadingAuthor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingFeedback" ADD CONSTRAINT "ReadingFeedback_feedbackFileId_fkey" FOREIGN KEY ("feedbackFileId") REFERENCES "AppFile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingFeedback" ADD CONSTRAINT "ReadingFeedback_feedbackUserId_fkey" FOREIGN KEY ("feedbackUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingFeedbackComment" ADD CONSTRAINT "ReadingFeedbackComment_readingFeedbackId_fkey" FOREIGN KEY ("readingFeedbackId") REFERENCES "ReadingFeedback"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCollaborator" ADD CONSTRAINT "UserCollaborator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCollaborator" ADD CONSTRAINT "UserCollaborator_collaboratorId_fkey" FOREIGN KEY ("collaboratorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserUrl" ADD CONSTRAINT "UserUrl_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
