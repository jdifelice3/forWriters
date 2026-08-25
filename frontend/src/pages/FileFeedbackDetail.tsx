"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";
import LockIcon from "@mui/icons-material/Lock";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import { useFileDomain } from "../hooks/file/useFileDomain";
import { useFilesDataFeedback } from "../hooks/file/useFilesDataFeedback";
import { useFiles } from "../hooks/file/useFiles";
import { useBillingUI } from "../hooks/billing/useBillingUI";
import { CommentDTO } from "../types/FeedbackTypes";
import { ManuscriptReview } from "../components/review/ManuscriptReview";
import "../assets/css/feedback-studio.css";

type FeedbackNavigationState = {
  workflowPath?: string;
  feedbackContext?: {
    groupName?: string;
    readingName?: string;
    title?: string;
    version?: number;
    filename?: string;
  };
};

function reviewerNames(comments: CommentDTO[]) {
  return Array.from(
    new Set(comments.map((comment) => comment.reviewerDisplayName))
  );
}

const FileFeedbackDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { appFileId } = useParams<{ appFileId: string }>();
  const navigationState = location.state as FeedbackNavigationState | null;
  const { isPro } = useBillingUI();
  const { getFileFeedbackUnique, getHTML, exportFeedbackReport } = useFileDomain();
  const { files } = useFiles();

  const [comments, setComments] = useState<CommentDTO[] | undefined>();
  const [selectedReviewers, setSelectedReviewers] = useState<string[]>([]);
  const [tab, setTab] = useState(0);
  const [manuscriptHtml, setManuscriptHtml] = useState("");
  const [loadError, setLoadError] = useState("");

  const appFileMeta = useMemo(
    () =>
      files.find((meta) =>
        meta.appFile.some((fileVersion) => fileVersion.id === appFileId)
      ),
    [appFileId, files]
  );
  const appFile = appFileMeta?.appFile.find(
    (fileVersion) => fileVersion.id === appFileId
  );
  const context = navigationState?.feedbackContext;
  const manuscriptTitle = appFileMeta?.title ?? context?.title ?? "Manuscript";
  const manuscriptVersion = appFile?.version ?? context?.version;
  const manuscriptFilename = (
    appFile?.filename ??
    context?.filename ??
    ""
  ).replace(/^\d+-/, "");

  useEffect(() => {
    if (!appFileId) return;
    let cancelled = false;

    async function loadFeedback() {
      try {
        const [result, html] = await Promise.all([
          getFileFeedbackUnique(appFileId!),
          getHTML(appFileId!),
        ]);
        if (cancelled) return;

        const names = reviewerNames(result);
        setComments(result);
        setSelectedReviewers(names);
        setManuscriptHtml(html);
        setLoadError("");
      } catch (error) {
        if (cancelled) return;
        console.error("Unable to load manuscript feedback", error);
        setLoadError("The completed feedback could not be loaded. Please try again.");
      }
    }

    loadFeedback();
    return () => {
      cancelled = true;
    };
  }, [appFileId, getFileFeedbackUnique, getHTML]);

  const reviewers = useMemo(() => reviewerNames(comments ?? []), [comments]);
  const visibleComments = useMemo(
    () =>
      (comments ?? []).filter((comment) =>
        selectedReviewers.includes(comment.reviewerDisplayName)
      ),
    [comments, selectedReviewers]
  );
  const { commentsByParagraph, commentsByReviewer } = useFilesDataFeedback(comments);

  const goBack = () => {
    if (navigationState?.workflowPath) {
      navigate(navigationState.workflowPath);
      return;
    }
    navigate(-1);
  };

  const toggleReviewer = (reviewer: string) => {
    setSelectedReviewers((current) =>
      current.includes(reviewer)
        ? current.filter((name) => name !== reviewer)
        : [...current, reviewer]
    );
  };

  if (!appFileId) {
    return <Alert severity="error">No manuscript version was selected.</Alert>;
  }

  return (
    <Box className="feedback-studio-page feedback-results-page">
      <Box className="feedback-studio-heading">
        <Box>
          <Button
            className="feedback-back-link"
            startIcon={<ArrowBackRoundedIcon />}
            onClick={goBack}
          >
            Back to review
          </Button>
          <Typography className="feedback-eyebrow">
            {context?.groupName && context?.readingName
              ? `${context.groupName} / ${context.readingName}`
              : "Critique Studio / Completed feedback"}
          </Typography>
          <Typography component="h1">Feedback for {manuscriptTitle}</Typography>
          <Typography className="feedback-studio-lede">
            Explore every response in the manuscript, by passage, or by reviewer.
          </Typography>
        </Box>
        <Button
          className="feedback-export-button"
          variant="contained"
          startIcon={<DownloadRoundedIcon />}
          endIcon={isPro ? <LockIcon fontSize="small" /> : undefined}
          disabled={!appFile || isPro}
          onClick={() => exportFeedbackReport(appFile!.id, true, true)}
        >
          Export feedback PDF
        </Button>
      </Box>

      <Stack direction="row" spacing={1} className="feedback-summary-chips">
        {manuscriptVersion !== undefined && (
          <Chip icon={<ArticleRoundedIcon />} label={`Version ${manuscriptVersion}`} />
        )}
        {manuscriptFilename && <Chip label={manuscriptFilename} />}
        <Chip
          icon={<ChatBubbleOutlineRoundedIcon />}
          label={`${comments?.length ?? 0} ${comments?.length === 1 ? "comment" : "comments"}`}
        />
        <Chip
          icon={<PersonOutlineRoundedIcon />}
          label={`${reviewers.length} ${reviewers.length === 1 ? "reviewer" : "reviewers"}`}
        />
      </Stack>

      {loadError && <Alert severity="error">{loadError}</Alert>}

      {comments === undefined && !loadError ? (
        <Box className="feedback-studio-loading feedback-results-loading">
          <CircularProgress size={26} />
          <Typography>Gathering completed feedback…</Typography>
        </Box>
      ) : (
        <Box className="feedback-results-panel">
          <Tabs
            value={tab}
            onChange={(_, value) => setTab(value)}
            className="feedback-results-tabs"
          >
            <Tab label="In manuscript" />
            <Tab label="By passage" disabled={(comments?.length ?? 0) === 0} />
            <Tab label="By reviewer" disabled={(comments?.length ?? 0) === 0} />
          </Tabs>

          {tab === 0 && (
            <Box className="feedback-result-view">
              {reviewers.length > 0 && (
                <Box className="feedback-reviewer-filter">
                  <Box>
                    <Typography fontWeight={800}>Visible reviewers</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Toggle a reviewer to compare voices in the manuscript.
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                    {reviewers.map((reviewer) => (
                      <Chip
                        key={reviewer}
                        clickable
                        color={
                          selectedReviewers.includes(reviewer) ? "success" : "default"
                        }
                        variant={
                          selectedReviewers.includes(reviewer) ? "filled" : "outlined"
                        }
                        label={reviewer}
                        onClick={() => toggleReviewer(reviewer)}
                      />
                    ))}
                  </Stack>
                </Box>
              )}

              {(comments?.length ?? 0) === 0 && (
                <Alert severity="info" sx={{ mb: 2 }}>
                  This review was marked complete without any saved comments.
                </Alert>
              )}

              {manuscriptHtml ? (
                <Box className="feedback-editor-shell feedback-readonly-shell">
                  <ManuscriptReview
                    html={manuscriptHtml}
                    initialComments={visibleComments}
                    fileFeedbackId={undefined}
                    reviewerUserId={undefined}
                    readOnly
                  />
                </Box>
              ) : (
                !loadError && <CircularProgress size={22} />
              )}
            </Box>
          )}

          {tab === 1 && (
            <Box className="feedback-grouped-list">
              {Object.entries(commentsByParagraph).map(([paragraphId, items]) => (
                <Box className="feedback-group-card" key={paragraphId}>
                  <Box className="feedback-group-card-heading">
                    <span><FormatQuoteRoundedIcon /></span>
                    <Box>
                      <Typography variant="h6">
                        Passage {paragraphId.split("-")[1] ?? paragraphId}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {items.length} {items.length === 1 ? "comment" : "comments"}
                      </Typography>
                    </Box>
                  </Box>
                  <Box className="feedback-group-card-items">
                    {items.map((item, index) => (
                      <Box key={`${paragraphId}-${item.reviewerDisplayName}-${index}`}>
                        <Typography className="feedback-target-quote">
                          “{item.targetText}”
                        </Typography>
                        <Typography className="feedback-comment-copy">
                          {item.commentText}
                        </Typography>
                        <Typography className="feedback-comment-byline">
                          {item.reviewerDisplayName}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          )}

          {tab === 2 && (
            <Box className="feedback-grouped-list">
              {Object.entries(commentsByReviewer).map(([reviewer, items]) => (
                <Box className="feedback-group-card" key={reviewer}>
                  <Box className="feedback-group-card-heading">
                    <span><PersonOutlineRoundedIcon /></span>
                    <Box>
                      <Typography variant="h6">{reviewer}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {items.length} {items.length === 1 ? "comment" : "comments"}
                      </Typography>
                    </Box>
                  </Box>
                  <Box className="feedback-group-card-items">
                    {items.map((item, index) => (
                      <Box key={`${reviewer}-${item.paragraphId}-${index}`}>
                        <Typography className="feedback-passage-label">
                          Passage {item.paragraphId.split("-")[1] ?? item.paragraphId}
                        </Typography>
                        <Typography className="feedback-target-quote">
                          “{item.targetText}”
                        </Typography>
                        <Typography className="feedback-comment-copy">
                          {item.commentText}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default FileFeedbackDetail;
