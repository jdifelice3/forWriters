import { apiFetch } from "./client";
import { CommentDTO } from "../types/FeedbackTypes"

export const CommentsAPI = {
  list(fileFeedbackId: string) {
    return apiFetch<CommentDTO[]>(`/feedback/${fileFeedbackId}/comments`, {
      method: "GET",
    });
  },

  create(fileFeedbackId: string, payload: {
    reviewerUserId: string;
    commentText: string;
    source?: "DOCX" | "NATIVE";
    targets: Array<{ paragraphId: string; from: number; to: number; targetText: string; }>;
  }) {
    return apiFetch<CommentDTO>(`/feedback/${fileFeedbackId}/comments`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  updateText(fileFeedbackId: string, commentId: string, commentText: string) {
    return apiFetch<CommentDTO>(`/feedback/${fileFeedbackId}/comments/${commentId}`, {
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