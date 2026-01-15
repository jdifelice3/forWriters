// src/routes/readings/reading.middleware.ts
import { Request, Response, NextFunction } from "express";
import prisma from "../../database/prisma";

export async function loadReadingById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { readingId } = req.params;

  const reading = await prisma.reading.findUnique({
    where: { id: readingId },
  });

  if (!reading) {
    return res.status(404).json({ error: "Reading not found" });
  }

  // 🔐 Enforce group ownership here
  if (reading.groupId !== req.group.id) {
    // Intentionally 404 to avoid leaking existence
    return res.status(404).json({ error: "Reading not found" });
  }

  req.reading = reading;
  next();
}

export async function loadSubmissionById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  
  const submission = await prisma.readingSubmission.findUnique({
    where: { id: req.params.submissionId },
  });
  if (submission && submission?.readingId === req.reading.id) {
    req.submission = submission;
    next();
  } else {
    return res.status(404).json({ error: "Submission not found" });
  }

}

