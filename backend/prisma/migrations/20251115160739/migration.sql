/*
  Warnings:

  - You are about to drop the `Urls` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Urls";

-- CreateTable
CREATE TABLE "GroupsUrls" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "urlType" "UrlType" NOT NULL DEFAULT 'WEBSITE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GroupsUrls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersUrls" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "urlType" "UrlType" NOT NULL DEFAULT 'WEBSITE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsersUrls_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GroupsUrls" ADD CONSTRAINT "GroupsUrls_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersUrls" ADD CONSTRAINT "UsersUrls_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
