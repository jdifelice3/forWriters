-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('READING');

-- CreateEnum
CREATE TYPE "WorkType" AS ENUM ('FLASHFICTION', 'NOVEL', 'NOVELLA', 'NOVELETTE', 'PLAY', 'SCREENPLAY', 'SERIALIZEDFICTION', 'SHORTSTORY');

-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('FANTASY', 'HISTORICAL', 'HORROR', 'LITERARY', 'MYSTERY', 'POEM', 'ROMANCE', 'SCIENCEFICTION');

-- AlterTable
ALTER TABLE "Urls" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "WritingGroups" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Events" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "eventType" "EventType" NOT NULL DEFAULT 'READING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdUserId" TEXT NOT NULL,
    "eventDate" TEXT NOT NULL,
    "eventTime" TEXT NOT NULL,
    "eventLocation" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Work" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "workType" "WorkType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "wordCount" INTEGER,
    "pageCount" INTEGER,
    "genre" "Genre" NOT NULL,
    "fileName" TEXT,
    "manuscriptIsVisible" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Work_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_createdUserId_fkey" FOREIGN KEY ("createdUserId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Work" ADD CONSTRAINT "Work_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
