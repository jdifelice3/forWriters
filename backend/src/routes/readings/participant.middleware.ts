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
    where: { id: participantId },
  });

  if (!participant) {
    return res.status(404).json({ error: "Participant not found" });
  }

  // 🔐 Enforce reading ownership
  if (participant.readingId !== req.reading.id) {
    // Intentionally 404 to avoid leaking existence
    return res.status(404).json({ error: "Participant not found" });
  }

  req.readingParticipant = participant;
  next();
}
