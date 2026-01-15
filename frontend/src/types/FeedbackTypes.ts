export type CommentTargetDTO = {
  id: string;
  paragraphId: string;
  from: number;
  to: number;
  targetText: string;
};

export type CommentDTO = {
  id: string;
  fileFeedbackId: string;
  reviewerUserId: string;
  reviewerDisplayName: string;
  reviewerAvatarUrl: string | null;
  commentText: string;
  isResolved: boolean;
  createdAt: string;
  updatedAt: string;
  targets: CommentTargetDTO[];
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