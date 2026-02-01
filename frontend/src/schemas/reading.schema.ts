// schemas/reading.schema.ts
import { z } from "zod";

export const ReadingParticipantSchema = z.object({
  userId: z.string(),
  fullName: z.string().optional(),
  role: z.enum(["AUTHOR", "REVIEWER"]).optional().default("AUTHOR"),
});

export const ReadingFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),

  readingDate: z.string().optional(),
  submissionDeadline: z.string().optional(),
  readingStartTime: z.string().optional(),
  readingEndTime: z.string().optional(),

  participants: z
    .array(ReadingParticipantSchema)
    //.min(1, "At least one author is required"),
});

export type ReadingFormInput = z.input<typeof ReadingFormSchema>;
export type ReadingFormOutput = z.output<typeof ReadingFormSchema>;
