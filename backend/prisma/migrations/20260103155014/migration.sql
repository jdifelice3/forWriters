/*
  Warnings:

  - A unique constraint covering the columns `[appFileMetaId,version]` on the table `AppFile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AppFile_appFileMetaId_version_key" ON "AppFile"("appFileMetaId", "version");
