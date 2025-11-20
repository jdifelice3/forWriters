import { createDeflate } from "zlib";
import { AppFile } from "./File";
import { Group } from "./Group";

export interface Reading {
  id: string;
  name: string;
  groupId: string;
  createdAt: Date;
  createdUserId: string;
  description: string;
  readingDate: Date;
  submissionDeadline: string;
  minDaysBetweenReads: string;
  maxConsecutiveReads: string;
  submissions: Submission[]; 
  group: Group;
}

export interface Submission {
  id: string;
  eventId: string;
  userId: string;
  appFileId: string;
  signedAt: string;
  appFiles: AppFile;
}