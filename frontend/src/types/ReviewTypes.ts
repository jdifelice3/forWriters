export type Comment = {
  id: string;
  commentId: string;
  // Anchor (TipTap document positions)
  from: number;
  to: number;

  // Snapshot of selected text (for re-anchoring & display)
  quote: string;

  // Structural anchor (paragraph identity)
  paragraphId: string | null;

  // Comment content
  text: string;

  // UI / workflow state
  resolutionState: "open" | "addressed" | "dismissed";

  // Re-anchoring confidence (0–1)
  reanchorConfidence?: number;

  // Metadata (optional at UI level)
  reviewerName?: string;
  createdAt?: string;
};

export type CommentRange = {
  commentId: string;
  from: number;
  to: number;
};

export type ReviewHTML = {
    html: string[],
    submissionId: string[]
}