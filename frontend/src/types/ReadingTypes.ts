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

export interface ReadingCommands {
  edit(reading: Reading): void;
  save(values: FormInput): Promise<void>;
  delete(reading: Reading): Promise<void>;
  signup(event: React.MouseEvent<HTMLButtonElement>, readingId: string): Promise<void>;
  withdraw(event: React.MouseEvent<HTMLButtonElement>, readingId: string): Promise<void>;
  review(event: React.MouseEvent<HTMLButtonElement>, readingId: string): Promise<void>;
  feedback(event: React.MouseEvent<HTMLButtonElement>, readingId: string): (void);
}