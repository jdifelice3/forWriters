/*
  Warnings:

  - A unique constraint covering the columns `[superTokensId]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Users_superTokensId_key" ON "Users"("superTokensId");
