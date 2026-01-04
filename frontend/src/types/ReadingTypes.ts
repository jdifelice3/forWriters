import { Reading } from "./domain-types";

export type FormInput = {
  name: string,
  readingDate: Date,
  readingStartTime: string,
  readingEndTime: string,
  submissionDeadline: Date,
  description: string,
  schedule: string
}

export interface ReadingDomainCommands {
  createReading(input: CreateReadingInput): Promise<void>;
  deleteReading(readingId: string): Promise<void>;

  signUpForReading(readingId: string): Promise<void>;
  withdrawFromReading(readingId: string): Promise<void>;

  submitFileVersion(readingId: string, appFileId: string): Promise<void>;
  updateSubmittedVersion(readingId: string, appFileId: string): Promise<void>;

}


export interface CreateReadingInput {
  name: string;
  readingDate: Date;
  readingStartTime: string;
  readingEndTime: string;
  submissionDeadline: Date;
  description: string;
  schedule: string;
}

