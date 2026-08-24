import useSWR from "swr";
import { ReviewerAssignmentsAPI } from "../../api/reviewerAssignmentsApi";
import { ReviewerAssignmentStatus } from "../../types/CritiqueWorkflowTypes";

export function useCritiqueWorkflow(
  groupId: string | undefined,
  readingId: string | undefined
) {
  const key =
    groupId && readingId
      ? ["critique-workflow", groupId, readingId]
      : null;

  const swr = useSWR(
    key,
    () => ReviewerAssignmentsAPI.get(groupId!, readingId!),
    { revalidateOnFocus: false }
  );

  const assign = async (submissionId: string, reviewerUserId: string) => {
    if (!groupId || !readingId) return;
    await ReviewerAssignmentsAPI.assign(
      groupId,
      readingId,
      submissionId,
      reviewerUserId
    );
    await swr.mutate();
  };

  const remove = async (assignmentId: string) => {
    if (!groupId || !readingId) return;
    await ReviewerAssignmentsAPI.remove(groupId, readingId, assignmentId);
    await swr.mutate();
  };

  const updateStatus = async (
    assignmentId: string,
    status: ReviewerAssignmentStatus
  ) => {
    if (!groupId || !readingId) return;
    await ReviewerAssignmentsAPI.updateStatus(
      groupId,
      readingId,
      assignmentId,
      status
    );
    await swr.mutate();
  };

  return {
    workflow: swr.data,
    isLoading: swr.isLoading,
    error: swr.error,
    refresh: swr.mutate,
    assign,
    remove,
    updateStatus,
  };
}
