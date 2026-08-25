"use client";

import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import { useGroupContext } from "../context/GroupContextProvider";
import { useUserContext } from "../context/UserContext";
import { useFileDomain } from "../hooks/file/useFileDomain";
import { useReadings } from "../hooks/reading/useReadings";
import { useReadingDomain } from "../hooks/reading/useReadingDomain";
import { useCritiqueWorkflow } from "../hooks/reading/useCritiqueWorkflow";
import { Reading, ReadingSubmission } from "../types/domain-types";
import { CommentDTO } from "../types/FeedbackTypes";
import { ManuscriptReview } from "../components/review/ManuscriptReview";
import "../assets/css/feedback-studio.css";

const FileFeedback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useUserContext();
  const { activeGroup } = useGroupContext();
  const { groupId, readingId } = useParams<{
    groupId: string;
    readingId: string;
  }>();
  const { readings, isLoading: readingsLoading, refresh } = useReadings();
  const { getFileFeedback, getComments } = useFileDomain();
  const { workflow, isLoading: workflowLoading } = useCritiqueWorkflow(
    groupId,
    readingId
  );
  const { canReviewFile, getManuscriptHtml } = useReadingDomain(
    activeGroup?.id,
    user,
    readings,
    refresh
  );

  const [manuscriptHtmlBySubmission, setManuscriptHtmlBySubmission] = useState<
    Record<string, string>
  >({});
  const [fileFeedbackIds, setFileFeedbackIds] = useState<Record<string, string>>(
    {}
  );
  const [initialComments, setInitialComments] = useState<
    Record<string, CommentDTO[]>
  >({});
  const [reviewLoadError, setReviewLoadError] = useState("");

  const reading: Reading | undefined = readings.find(
    (item) => item.id === readingId
  );
  const requestedSubmissionId = searchParams.get("submission");

  const visibleSubmissions = useMemo(() => {
    const reviewableSubmissionIds = new Set(
      workflow?.submissions
        .filter((submission) =>
          submission.assignments.some(
            (assignment) => assignment.reviewer.userId === user?.id
          )
        )
        .map((submission) => submission.id) ?? []
    );

    return (
      reading?.readingSubmission.filter((submission) => {
        if (groupId && !workflow) return false;
        if (groupId && !reviewableSubmissionIds.has(submission.id)) return false;
        return !requestedSubmissionId || submission.id === requestedSubmissionId;
      }) ?? []
    );
  }, [groupId, reading?.readingSubmission, requestedSubmissionId, user?.id, workflow]);

  const reviewReading = useMemo(
    () =>
      reading ? { ...reading, readingSubmission: visibleSubmissions } : undefined,
    [reading, visibleSubmissions]
  );

  useEffect(() => {
    if (!reviewReading || reviewReading.readingSubmission.length === 0) return;
    const currentReviewReading = reviewReading;
    let cancelled = false;

    async function loadReviewData() {
      try {
        const ids = await getFileFeedback(currentReviewReading);
        const commentEntries = await Promise.all(
          Object.entries(ids).map(async ([submissionId, feedbackId]) =>
            [submissionId, await getComments(feedbackId)] as const
          )
        );
        const htmlEntries = await Promise.all(
          currentReviewReading.readingSubmission.map(async (submission) =>
            [
              submission.id,
              await getManuscriptHtml(currentReviewReading.id, submission.id),
            ] as const
          )
        );

        if (cancelled) return;
        if (htmlEntries.some(([, html]) => !html)) {
          throw new Error("The manuscript response did not contain document content.");
        }

        setFileFeedbackIds(ids);
        setInitialComments(Object.fromEntries(commentEntries));
        setManuscriptHtmlBySubmission(
          Object.fromEntries(htmlEntries) as Record<string, string>
        );
        setReviewLoadError("");
      } catch (error) {
        if (cancelled) return;
        console.error("Unable to load review data", error);
        setReviewLoadError(
          "The manuscript could not be loaded. Please try refreshing the page."
        );
      }
    }

    loadReviewData();
    return () => {
      cancelled = true;
    };
  }, [reviewReading, getFileFeedback, getComments, getManuscriptHtml]);

  if (
    readingsLoading ||
    (groupId && workflowLoading) ||
    !activeGroup ||
    !reading ||
    !user
  ) {
    return (
      <Box className="feedback-studio-loading">
        <CircularProgress size={26} />
        <Typography>Preparing the manuscript workspace…</Typography>
      </Box>
    );
  }

  const workflowPath = groupId
    ? `/groups/${groupId}/readings/${reading.id}/workflow?stage=review`
    : `/groups/${activeGroup.id}/readings`;

  return (
    <Box className="feedback-studio-page">
      <Box className="feedback-studio-heading">
        <Box>
          <Button
            className="feedback-back-link"
            startIcon={<ArrowBackRoundedIcon />}
            onClick={() => navigate(workflowPath)}
          >
            Critique workflow
          </Button>
          <Typography className="feedback-eyebrow">
            {activeGroup.name} / {reading.name}
          </Typography>
          <Typography component="h1">Manuscript review</Typography>
          <Typography className="feedback-studio-lede">
            Read in context, highlight the exact passage, and leave feedback beside
            the manuscript.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1} className="feedback-heading-badges">
          <Chip
            icon={<AutoStoriesRoundedIcon />}
            label={`${visibleSubmissions.length} assigned`}
          />
          <Chip icon={<EditNoteRoundedIcon />} label="Inline review" />
        </Stack>
      </Box>

      <Box className="feedback-guidance">
        <span><ChatBubbleOutlineRoundedIcon /></span>
        <Box>
          <Typography fontWeight={800}>Add a comment to a passage</Typography>
          <Typography variant="body2">
            Highlight manuscript text, write in the comment card that appears, and
            save. Existing comments remain attached to their original passage.
          </Typography>
        </Box>
      </Box>

      {reviewLoadError && <Alert severity="error">{reviewLoadError}</Alert>}

      {visibleSubmissions.length === 0 ? (
        <Box className="feedback-empty-state">
          <AutoStoriesRoundedIcon />
          <Typography variant="h5">Nothing is assigned to you</Typography>
          <Typography color="text.secondary">
            Return to the workflow to see reading progress or manage assignments.
          </Typography>
          <Button variant="contained" onClick={() => navigate(workflowPath)}>
            Return to workflow
          </Button>
        </Box>
      ) : (
        visibleSubmissions.map((submission: ReadingSubmission) => {
          const author = submission.appFile.appFileMeta.user.userProfile;
          const comments = initialComments[submission.id] ?? [];
          const manuscriptHtml = manuscriptHtmlBySubmission[submission.id];

          return (
            <Box className="feedback-manuscript-panel" key={submission.id}>
              <Box className="feedback-manuscript-header">
                <Box className="feedback-manuscript-icon">W</Box>
                <Box className="feedback-manuscript-copy">
                  <Typography component="h2">
                    {submission.appFile.appFileMeta.title}
                  </Typography>
                  <Typography className="feedback-author-line">
                    <PersonOutlineRoundedIcon />
                    {author?.firstName} {author?.lastName}
                  </Typography>
                  {submission.appFile.appFileMeta.description && (
                    <Typography className="feedback-description">
                      {submission.appFile.appFileMeta.description}
                    </Typography>
                  )}
                </Box>
                <Stack direction="row" spacing={1} className="feedback-manuscript-stats">
                  <Chip size="small" label={`Version ${submission.appFile.version}`} />
                  <Chip
                    size="small"
                    icon={<ChatBubbleOutlineRoundedIcon />}
                    label={`${comments.length} ${comments.length === 1 ? "comment" : "comments"}`}
                  />
                </Stack>
              </Box>

              <Box className="feedback-editor-shell">
                {!canReviewFile(submission.appFile, user.id) ? (
                  <Alert severity="info">
                    You are the author of this manuscript and cannot review it.
                  </Alert>
                ) : reviewLoadError ? null : manuscriptHtml ? (
                  <ManuscriptReview
                    html={manuscriptHtml}
                    initialComments={comments}
                    fileFeedbackId={fileFeedbackIds[submission.id]}
                    reviewerUserId={user.id}
                    readOnly={false}
                  />
                ) : (
                  <Box className="feedback-inline-loading">
                    <CircularProgress size={22} />
                    <Typography>Loading manuscript from Amazon S3…</Typography>
                  </Box>
                )}
              </Box>
            </Box>
          );
        })
      )}
    </Box>
  );
};

export default FileFeedback;
