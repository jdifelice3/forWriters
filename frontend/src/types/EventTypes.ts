import { AppFile } from "../types/FileTypes";

export interface EventType {
  id: string;
  groupId: string;
  eventType: string;
  eventDate: Date;
  submissionDeadline: string;
  minDaysBetweenReads: string;
  maxConsecutiveReads: string;
  createdAt: Date;
  eventSubmission: Submission[]; 
}

export interface Submission {
  id: string;
  eventId: string;
  userId: string;
  appFileId: string;
  signedAt: string;
  appFiles: AppFile;
}