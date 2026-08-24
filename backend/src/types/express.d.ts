import {
  AppFileMeta,
  Group,
  GroupRole,
  Reading,
  ReadingParticipant,
  ReadingSubmission,
  User,
} from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
        group: Group;
        groupRole: GroupRole;
        reading: Reading;
        readingParticipant: ReadingParticipant;
        submission: ReadingSubmission;
        appFileMeta: AppFileMeta;
        user: User;
    }
  }
}

export {};
