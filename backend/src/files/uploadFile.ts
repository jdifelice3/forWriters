// src/files/uploadFile.ts
import prisma from "../database/prisma";
import { FileType } from "@prisma/client";

export async function uploadFile({
    appFileMetaId,
    userId,
    filename,
    url,
    mimetype,
}: {
    appFileMetaId: string,
    userId: string;
    filename: string;
    url: string;
    mimetype: FileType;
}) {
  return prisma.appFile.create({
    data: {
      appFileMetaId,
      userId,
      filename,
      url,
      mimetype,
    },
  });
}
