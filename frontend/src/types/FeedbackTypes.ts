export type CommentDTO = {
  id: string;
  readingFeedbackId: string;
  reviewerParticipantId: string;

  reviewerDisplayName: string;
  reviewerAvatarUrl?: string | null;

  commentText: string;
  isResolved: boolean;

  createdAt: string; // ISO
  updatedAt: string; // ISO

  targets: Array<{
    id: string;
    paragraphId: string;
    from: number;
    to: number;
    targetText: string;
  }>;
};

export type Comment = {
  id: string;
  commentText: string;
  isResolved: boolean;

  reviewerDisplayName: string;
  reviewerAvatarUrl?: string | null;

  createdAt: string; // ISO
  updatedAt: string; // ISO

  targets: Array<{
    id: string;
    paragraphId: string;
    from: number;
    to: number;
    targetText: string;
  }>;
};