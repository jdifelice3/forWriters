// src/routes/files/fileMeta.middleware.ts
import { Request, Response, NextFunction } from "express";
import prisma from "../../database/prisma";

export async function loadAppFileMetaById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { appFileMetaId } = req.params;

  if (!appFileMetaId) {
    return res.status(400).json({ error: "appFileMetaId is required" });
  }

  const meta = await prisma.appFileMeta.findUnique({
    where: { id: appFileMetaId },
  });

  if (!meta) {
    return res.status(404).json({ error: "File metadata not found" });
  }

  req.appFileMeta = meta;
  next();
}
