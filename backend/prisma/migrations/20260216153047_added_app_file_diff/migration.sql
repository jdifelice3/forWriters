-- CreateTable
CREATE TABLE "AppFileDiff" (
    "id" TEXT NOT NULL,
    "appFileMetaId" TEXT NOT NULL,
    "fromVersion" INTEGER NOT NULL,
    "toVersion" INTEGER NOT NULL,
    "diffJson" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AppFileDiff_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AppFileDiff_appFileMetaId_fromVersion_toVersion_key" ON "AppFileDiff"("appFileMetaId", "fromVersion", "toVersion");

-- AddForeignKey
ALTER TABLE "AppFileDiff" ADD CONSTRAINT "AppFileDiff_appFileMetaId_fkey" FOREIGN KEY ("appFileMetaId") REFERENCES "AppFileMeta"("id") ON DELETE CASCADE ON UPDATE CASCADE;
