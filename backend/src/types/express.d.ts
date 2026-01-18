import {
  Group,
  GroupMemberRole,
  Reading,
  ReadingParticipant,
  ReadingSubmission,
  User,
} from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
        group: Group;
        groupRole: GroupMemberRole;
        reading: Reading;
        readingParticipant: ReadingParticipant;
        submission: ReadingSubmission;
        appFileMeta: AppFileMeta;
        user: User;
    }
  }
}

export {};