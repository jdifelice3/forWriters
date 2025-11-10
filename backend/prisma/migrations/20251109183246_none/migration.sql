/*
  Warnings:

  - You are about to drop the `AppFile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AppFile" DROP CONSTRAINT "AppFile_userId_fkey";

-- DropTable
DROP TABLE "AppFile";

-- CreateTable
CREATE TABLE "AppFiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "filename" TEXT NOT NULL,
    "mimetype" "FileType" NOT NULL DEFAULT 'PDF',
    "url" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AppFiles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AppFiles" ADD CONSTRAINT "AppFiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
