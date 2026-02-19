import { CommentDTO } from "../types/Feedback";
import { PdfComment } from "../types/Pdf";

export const mapCommentDtoToPdfComment = (
  comment: CommentDTO
): PdfComment => {
  const targets = comment.targets.map(t => ({
    paragraphNumber: getParagraphNumber(t.paragraphId),
    from: t.from,
    to: t.to,
    excerpt: normalizeExcerpt(t.targetText),
  }));

  const minParagraph = Math.min(...targets.map(t => t.paragraphNumber));

  return {
    paragraphNumber: minParagraph,
    targets,
    reviewerName: comment.reviewerDisplayName,
    isResolved: comment.isResolved,
    commentText: comment.commentText,
    createdAt: new Date(comment.createdAt),
  };
};

export const getParagraphNumber = (paragraphId: string) => {
  const match = paragraphId.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
};

export const normalizeExcerpt = (text: string) =>
  text.replace(/\s+/g, " ").trim();

export const sanitizeFilename = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
};

