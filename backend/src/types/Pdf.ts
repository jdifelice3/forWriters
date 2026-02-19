export interface PdfTarget {
  paragraphNumber: number;
  from: number;
  to: number;
  excerpt: string;
}

export interface PdfComment {
  paragraphNumber: number; // min paragraph for sorting
  targets: PdfTarget[];

  reviewerName: string;
  isResolved: boolean;

  commentText: string;

  createdAt: Date; // for stable fallback sorting
}

export interface PdfSummary {
  totalComments: number;
  unresolvedCount: number;
  resolvedCount: number;
  reviewerCount: number;
}

export interface GenerateFeedbackPdfInput {
  title: string;
  version: number;
  generatedDate: Date;

  summary: PdfSummary;

  comments: PdfComment[];

  includeReviewerAppendix: boolean;
}
