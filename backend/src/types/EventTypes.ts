import { AppFile } from "../types/FileTypes";

export interface Events {
  id: string;
  groupId: string;
  eventType: string;
  eventDate: Date;
  submissionDeadline: string;
  minDaysBetweenReads: string;
  maxConsecutiveReads: string;
  createdAt: Date;
  submissions: Submission[]; 
}

export interface Submission {
  id: string;
  eventId: string;
  userId: string;
  appFileId: string;
  signedAt: string;
  appFiles: AppFile;

}