export type ReviewerAssignmentStatus =
  | "ASSIGNED"
  | "IN_PROGRESS"
  | "COMPLETED";

export type WorkflowReviewer = {
  userId: string;
  name: string;
  email: string;
  avatarUrl: string | null;
};

export type WorkflowAssignment = {
  id: string;
  status: ReviewerAssignmentStatus;
  assignedAt: string;
  completedAt: string | null;
  reviewer: WorkflowReviewer;
};

export type WorkflowSubmission = {
  id: string;
  participantId: string;
  submittedAt: string;
  author: {
    userId: string;
    name: string;
    email: string;
  };
  manuscript: {
    appFileId: string;
    appFileMetaId: string;
    title: string;
    description: string;
    version: number;
    filename: string;
    wordCount: number | null;
    pageCount: number | null;
  };
  assignments: WorkflowAssignment[];
};

export type EligibleReviewer = WorkflowReviewer & {
  groupRole: "OWNER" | "MEMBER" | "ADMIN" | "READER";
  openAssignmentCount: number;
};

export type CritiqueWorkflowData = {
  readingId: string;
  groupType: "WRITING" | "PERSONAL" | "STUDIO";
  currentUserId: string;
  currentGroupRole: "OWNER" | "MEMBER" | "ADMIN" | "READER";
  canSubmit: boolean;
  canManageAssignments: boolean;
  eligibleReviewers: EligibleReviewer[];
  submissions: WorkflowSubmission[];
};
