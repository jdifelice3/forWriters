import { apiFetch } from "./client";
import {
  CritiqueWorkflowData,
  ReviewerAssignmentStatus,
} from "../types/CritiqueWorkflowTypes";

const basePath = (groupId: string, readingId: string) =>
  `/groups/${groupId}/readings/${readingId}/reviewer-assignments`;

export const ReviewerAssignmentsAPI = {
  get(groupId: string, readingId: string) {
    return apiFetch<CritiqueWorkflowData>(basePath(groupId, readingId));
  },

  assign(
    groupId: string,
    readingId: string,
    submissionId: string,
    reviewerUserId: string
  ) {
    return apiFetch(`${basePath(groupId, readingId)}/submissions/${submissionId}`, {
      method: "POST",
      body: JSON.stringify({ reviewerUserId }),
    });
  },

  updateStatus(
    groupId: string,
    readingId: string,
    assignmentId: string,
    status: ReviewerAssignmentStatus
  ) {
    return apiFetch(`${basePath(groupId, readingId)}/${assignmentId}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  },

  remove(
    groupId: string,
    readingId: string,
    assignmentId: string
  ) {
    return apiFetch(`${basePath(groupId, readingId)}/${assignmentId}`, {
      method: "DELETE",
    });
  },
};

export type DirectReviewSetup = {
  groupId: string;
  readingId: string;
  submissionId: string;
  created: boolean;
};

export const ReviewRequestsAPI = {
  start(groupId: string, appFileId: string) {
    return apiFetch<DirectReviewSetup>(`/groups/${groupId}/review-requests`, {
      method: "POST",
      body: JSON.stringify({ appFileId }),
    });
  },
};
