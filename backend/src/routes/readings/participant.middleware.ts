// src/routes/readings/participant.middleware.ts
import { Request, Response, NextFunction } from "express";
import prisma from "../../database/prisma";

export async function loadReadingParticipantById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { participantId } = req.params;
  const participant = await prisma.readingParticipant.findUnique({
    where: {
      readingId_userId: {
        readingId: req.reading.id,
        userId: participantId,
      },
    },
  });

  if (!participant) {
    return res.status(404).json({ error: "Participant not found" });
  }

  req.readingParticipant = participant;
  next();
}
