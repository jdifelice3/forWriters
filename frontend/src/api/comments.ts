import { apiFetch } from "./client";
import { CommentDTO } from "../types/FeedbackTypes"

export const CommentsAPI = {
  list(readingFeedbackId: string) {
    return apiFetch<CommentDTO[]>(`/feedback/${readingFeedbackId}/comments`, {
      method: "GET",
    });
  },

  create(readingFeedbackId: string, payload: {
    reviewerParticipantId: string;
    commentText: string;
    source?: "DOCX" | "NATIVE";
    targets: Array<{ paragraphId: string; from: number; to: number; targetText: string; }>;
  }) {
    return apiFetch<CommentDTO>(`/feedback/${readingFeedbackId}/comments`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  updateText(readingFeedbackId: string, commentId: string, commentText: string) {
    return apiFetch<CommentDTO>(`/feedback/${readingFeedbackId}/comments/${commentId}`, {
      method: "PATCH",
      body: JSON.stringify({ commentText }),
    });
  },

  setResolved(readingFeedbackId: string, commentId: string, isResolved: boolean) {
    return apiFetch<{ id: string; isResolved: boolean; updatedAt: string }>(
      `/feedback/${readingFeedbackId}/comments/${commentId}/resolve`,
      { method: "PATCH", body: JSON.stringify({ isResolved }) }
    );
  },
};