/*
  Warnings:

  - You are about to drop the `Work` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Work" DROP CONSTRAINT "Work_userId_fkey";

-- DropTable
DROP TABLE "Work";

-- CreateTable
CREATE TABLE "Works" (
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

    CONSTRAINT "Works_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Works" ADD CONSTRAINT "Works_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
