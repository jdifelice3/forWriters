-- DropForeignKey
ALTER TABLE "ReadingAuthor" DROP CONSTRAINT "ReadingAuthor_authorId_fkey";

-- AddForeignKey
ALTER TABLE "ReadingAuthor" ADD CONSTRAINT "ReadingAuthor_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "UserProfile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
