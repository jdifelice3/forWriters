import {
  Group,
  GroupMemberRole,
  Reading,
  ReadingParticipant,
  ReadingSubmission,
} from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      group: Group;
      groupRole: GroupMemberRole;
    }
  }
}

declare global {
  namespace Express {
    interface Request {
      reading: Reading;
      readingParticipant: ReadingParticipant;
      submission: ReadingSubmission;
    }
  }
}

declare global {
  namespace Express {
    interface Request {
      appFileMeta: AppFileMeta;
    }
  }
}
export {};
