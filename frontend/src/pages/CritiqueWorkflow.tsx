import { FormEvent, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  LinearProgress,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloudDoneRoundedIcon from "@mui/icons-material/CloudDoneRounded";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import MessageRoundedIcon from "@mui/icons-material/MessageRounded";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import { ReadingsAPI } from "../api/readingsApi";
import { useGroupContext } from "../context/GroupContextProvider";
import { useUserContext } from "../context/UserContext";
import { useFileDomain } from "../hooks/file/useFileDomain";
import { useFiles } from "../hooks/file/useFiles";
import { useCritiqueWorkflow } from "../hooks/reading/useCritiqueWorkflow";
import { useReadings } from "../hooks/reading/useReadings";
import { WorkflowSubmission } from "../types/CritiqueWorkflowTypes";
import "../assets/css/critique-workflow.css";

type Stage = 1 | 2 | 3;

const stageMeta = [
  {
    id: 1 as Stage,
    label: "Submit",
    detail: "Upload to S3 and submit a version",
    icon: CloudUploadRoundedIcon,
  },
  {
    id: 2 as Stage,
    label: "Assign",
    detail: "Persist reviewer assignments",
    icon: GroupsRoundedIcon,
  },
  {
    id: 3 as Stage,
    label: "Review",
    detail: "Write and visualize feedback",
    icon: MessageRoundedIcon,
  },
];

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default function CritiqueWorkflow() {
  const { groupId, readingId } = useParams<{
    groupId: string;
    readingId: string;
  }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, isLoading: userLoading } = useUserContext();
  const { activeGroup } = useGroupContext();
  const { readings, isLoading: readingsLoading, refresh: refreshReadings } =
    useReadings();
  const { files, isLoading: filesLoading, mutate: refreshFiles } = useFiles();
  const fileDomain = useFileDomain();
  const {
    workflow,
    isLoading: workflowLoading,
    error,
    refresh: refreshWorkflow,
    assign,
    remove,
    updateStatus,
  } = useCritiqueWorkflow(groupId, readingId);

  const initialStage = searchParams.get("stage") === "assign" ? 2 : 1;
  const [stage, setStage] = useState<Stage>(initialStage);
  const [selectedSubmissionId, setSelectedSubmissionId] = useState("");
  const [selectedAppFileId, setSelectedAppFileId] = useState("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadDescription, setUploadDescription] = useState("");
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState("");

  const reading = readings.find((item) => item.id === readingId);
  const ownSubmission = workflow?.submissions.find(
    (submission) => submission.author.userId === user?.id
  );

  useEffect(() => {
    const requestedSubmissionId = searchParams.get("submission");
    const requestedSubmission = workflow?.submissions.find(
      (submission) => submission.id === requestedSubmissionId
    );
    if (!selectedSubmissionId && (requestedSubmission || workflow?.submissions[0])) {
      setSelectedSubmissionId(
        requestedSubmission?.id ?? workflow!.submissions[0].id
      );
    }
  }, [searchParams, selectedSubmissionId, workflow]);

  const versionOptions = useMemo(
    () =>
      files.flatMap((meta) =>
        meta.appFile.map((version) => ({
          id: version.id,
          label: `${meta.title} · version ${version.version}`,
          title: meta.title,
          description: meta.description,
          version: version.version,
          filename: version.filename.replace(/^\d+-/, ""),
        }))
      ),
    [files]
  );

  const selectedVersion = versionOptions.find(
    (version) => version.id === selectedAppFileId
  );
  const selectedSubmission = workflow?.submissions.find(
    (submission) => submission.id === selectedSubmissionId
  );
  const canManageSelectedSubmission = Boolean(
    workflow?.canManageAssignments ||
    selectedSubmission?.author.userId === workflow?.currentUserId
  );

  const myAssignments = useMemo(
    () =>
      (workflow?.submissions ?? []).flatMap((submission) =>
        submission.assignments
          .filter((assignment) => assignment.reviewer.userId === user?.id)
          .map((assignment) => ({ assignment, submission }))
      ),
    [user?.id, workflow?.submissions]
  );

  const feedbackReceived = useMemo(
    () =>
      (workflow?.submissions ?? [])
        .filter((submission) => submission.author.userId === user?.id)
        .map((submission) => ({
          submission,
          completedAssignments: submission.assignments.filter(
            (assignment) => assignment.status === "COMPLETED"
          ),
        }))
        .filter(({ completedAssignments }) => completedAssignments.length > 0),
    [user?.id, workflow?.submissions]
  );

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 4 }}>
        The workflow could not be loaded. {String(error.message ?? error)}
      </Alert>
    );
  }

  if (
    userLoading ||
    readingsLoading ||
    filesLoading ||
    workflowLoading ||
    !user ||
    !activeGroup ||
    !reading ||
    !workflow
  ) {
    return (
      <Box className="critique-loading">
        <CircularProgress size={28} />
        <Typography>Loading the critique workflow…</Typography>
      </Box>
    );
  }

  const handleUpload = async (event: FormEvent) => {
    event.preventDefault();
    if (!uploadFile || !uploadTitle.trim()) return;

    setBusy(true);
    try {
      const formData = new FormData();
      formData.append("file", uploadFile);
      formData.append("title", uploadTitle.trim());
      formData.append("description", uploadDescription.trim());
      await fileDomain.uploadManuscript(formData);
      const updatedFiles = await refreshFiles();
      const newest = updatedFiles
        ?.flatMap((meta) => meta.appFile)
        .sort(
          (a, b) =>
            new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
        )[0];
      if (newest) setSelectedAppFileId(newest.id);
      setToast("The manuscript is stored in Amazon S3 and its metadata is in PostgreSQL.");
    } catch (uploadError) {
      setToast(
        uploadError instanceof Error ? uploadError.message : "Upload failed"
      );
    } finally {
      setBusy(false);
    }
  };

  const submitVersion = async () => {
    if (!selectedAppFileId) return;
    setBusy(true);
    try {
      const isParticipant = reading.readingParticipant.some(
        (participant) => participant.userId === user.id
      );
      if (!isParticipant) {
        await ReadingsAPI.signup(groupId!, reading.id, user.id);
      }
      if (ownSubmission) {
        await ReadingsAPI.updateVersion(groupId!, reading.id, selectedAppFileId);
      } else {
        await ReadingsAPI.addVersion(groupId!, reading.id, selectedAppFileId);
      }
      await Promise.all([refreshReadings(), refreshWorkflow()]);
      setToast("Submission saved to the staging database.");
      setStage(2);
    } catch (submissionError) {
      setToast(
        submissionError instanceof Error
          ? submissionError.message
          : "Submission failed"
      );
    } finally {
      setBusy(false);
    }
  };

  const toggleReviewer = async (reviewerUserId: string) => {
    if (!selectedSubmission) return;
    setBusy(true);
    try {
      const existing = selectedSubmission.assignments.find(
        (assignment) => assignment.reviewer.userId === reviewerUserId
      );
      if (existing) {
        await remove(existing.id);
        setToast("Reviewer assignment removed.");
      } else {
        await assign(selectedSubmission.id, reviewerUserId);
        setToast("Reviewer assignment persisted.");
      }
    } catch (assignmentError) {
      setToast(
        assignmentError instanceof Error
          ? assignmentError.message
          : "Assignment failed"
      );
    } finally {
      setBusy(false);
    }
  };

  const openReview = async (
    submission: WorkflowSubmission,
    assignmentId: string,
    status: string
  ) => {
    if (status === "ASSIGNED") {
      await updateStatus(assignmentId, "IN_PROGRESS");
    }
    navigate(
      `/groups/${groupId}/readings/${readingId}/review?submission=${submission.id}`
    );
  };

  return (
    <Box className="critique-workflow-page">
      <Box className="critique-workflow-heading">
        <Box>
          <Button
            className="back-link"
            startIcon={<ArrowBackRoundedIcon />}
            onClick={() => navigate(`/groups/${groupId}/critique`)}
          >
            Critique Studio
          </Button>
          <Typography className="critique-eyebrow">
            {activeGroup.name} / {reading.name}
          </Typography>
          <Typography component="h1">Critique workflow</Typography>
          <Typography color="text.secondary">
            One authenticated path from manuscript upload through attributed feedback.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1} className="persistence-badges">
          <Chip icon={<LockRoundedIcon />} label="SuperTokens session" />
          <Chip icon={<CloudDoneRoundedIcon />} label="Amazon S3" />
          <Chip icon={<StorageRoundedIcon />} label="PostgreSQL" />
        </Stack>
      </Box>

      <Box className="critique-stage-bar">
        {stageMeta.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={stage === item.id ? "active" : ""}
              onClick={() => setStage(item.id)}
            >
              <span><Icon /></span>
              <span>
                <strong>{item.label}</strong>
                <small>{item.detail}</small>
              </span>
              <b>0{item.id}</b>
            </button>
          );
        })}
      </Box>

      <LinearProgress
        className="critique-progress"
        variant="determinate"
        value={stage === 1 ? 33 : stage === 2 ? 66 : 100}
      />

      {stage === 1 && (
        <Box className="critique-stage-grid">
          <Box className="critique-panel upload-panel">
            <Box className="critique-panel-title">
              <span>1</span>
              <Box>
                <Typography variant="h6">Upload a manuscript</Typography>
                <Typography variant="body2">
                  This uses the application’s real S3 upload route.
                </Typography>
              </Box>
            </Box>
            <Box component="form" onSubmit={handleUpload} className="real-upload-form">
              <Button
                component="label"
                className="real-dropzone"
                startIcon={<CloudUploadRoundedIcon />}
              >
                {uploadFile ? uploadFile.name : "Choose a DOCX manuscript"}
                <input
                  hidden
                  type="file"
                  accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={(event) =>
                    setUploadFile(event.target.files?.[0] ?? null)
                  }
                />
              </Button>
              <TextField
                label="Manuscript title"
                value={uploadTitle}
                onChange={(event) => setUploadTitle(event.target.value)}
                required
                fullWidth
              />
              <TextField
                label="What feedback would help most?"
                value={uploadDescription}
                onChange={(event) => setUploadDescription(event.target.value)}
                multiline
                minRows={3}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                disabled={busy || !uploadFile || !uploadTitle.trim()}
                startIcon={<CloudUploadRoundedIcon />}
              >
                Upload to S3
              </Button>
            </Box>
          </Box>

          <Box className="critique-panel submit-panel">
            <Box className="critique-panel-title">
              <span>2</span>
              <Box>
                <Typography variant="h6">Submit an exact version</Typography>
                <Typography variant="body2">
                  The selected version becomes a persisted ReadingSubmission.
                </Typography>
              </Box>
            </Box>

            {ownSubmission && (
              <Alert severity="success" icon={<CheckRoundedIcon />} sx={{ mb: 2 }}>
                You already submitted <strong>{ownSubmission.manuscript.title}</strong>,
                version {ownSubmission.manuscript.version}. Selecting another version will
                update that submission.
              </Alert>
            )}

            <Typography className="field-label">Your available manuscript versions</Typography>
            <Select
              fullWidth
              displayEmpty
              value={selectedAppFileId}
              onChange={(event) => setSelectedAppFileId(event.target.value)}
            >
              <MenuItem value="" disabled>
                Select a manuscript version
              </MenuItem>
              {versionOptions.map((version) => (
                <MenuItem key={version.id} value={version.id}>
                  {version.label}
                </MenuItem>
              ))}
            </Select>

            {selectedVersion && (
              <Box className="selected-version-card">
                <span><InsertDriveFileRoundedIcon /></span>
                <Box>
                  <Typography fontWeight={800}>{selectedVersion.title}</Typography>
                  <Typography variant="body2">
                    {selectedVersion.filename} · version {selectedVersion.version}
                  </Typography>
                  <Typography variant="body2">{selectedVersion.description}</Typography>
                </Box>
                <Chip label="Ready" color="success" size="small" />
              </Box>
            )}

            <Divider />
            <Box className="critique-actions">
              {workflow.canManageAssignments && !selectedAppFileId ? (
                <Button endIcon={<ArrowForwardRoundedIcon />} onClick={() => setStage(2)}>
                  Manage assignments
                </Button>
              ) : (
                <Button
                  variant="contained"
                  disabled={!selectedAppFileId || busy}
                  endIcon={<ArrowForwardRoundedIcon />}
                  onClick={submitVersion}
                >
                  {ownSubmission ? "Update submission" : "Submit to reading"}
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      )}

      {stage === 2 && (
        <Box className="critique-assignment-stage">
          {workflow.submissions.length === 0 ? (
            <Alert severity="info">
              No manuscripts have been submitted to this reading yet.
            </Alert>
          ) : (
            <>
              <Box className="critique-panel submission-strip">
                <Typography fontWeight={800}>Choose a submission</Typography>
                <Select
                  value={selectedSubmissionId}
                  onChange={(event) => setSelectedSubmissionId(event.target.value)}
                  size="small"
                >
                  {workflow.submissions.map((submission) => (
                    <MenuItem key={submission.id} value={submission.id}>
                      {submission.manuscript.title} · {submission.author.name}
                    </MenuItem>
                  ))}
                </Select>
                {selectedSubmission && (
                  <Chip
                    label={`${selectedSubmission.assignments.length} assigned`}
                    color="success"
                    variant="outlined"
                  />
                )}
              </Box>

              {selectedSubmission && (
                <>
                  <Box className="assignment-heading">
                    <Box>
                      <Typography variant="h5">
                        Reviewers for {selectedSubmission.manuscript.title}
                      </Typography>
                      <Typography color="text.secondary">
                        Assignments are isolated to {activeGroup.name} and saved immediately.
                      </Typography>
                    </Box>
                    {!canManageSelectedSubmission && (
                      <Chip icon={<LockRoundedIcon />} label="Author or admin managed" />
                    )}
                  </Box>

                  {workflow.eligibleReviewers.filter(
                    (reviewer) => reviewer.userId !== selectedSubmission.author.userId
                  ).length === 0 ? (
                    <Alert severity="info">
                      This group has no other members to assign yet. Invite a reviewer to
                      {activeGroup.name}, then return to this version.
                    </Alert>
                  ) : (
                    <Box className="real-reviewer-grid">
                    {workflow.eligibleReviewers
                      .filter((reviewer) => reviewer.userId !== selectedSubmission.author.userId)
                      .map((reviewer) => {
                        const assignment = selectedSubmission.assignments.find(
                          (item) => item.reviewer.userId === reviewer.userId
                        );
                        return (
                          <button
                            key={reviewer.userId}
                            className={assignment ? "selected" : ""}
                            disabled={!canManageSelectedSubmission || busy}
                            onClick={() => toggleReviewer(reviewer.userId)}
                          >
                            <span className="reviewer-check">
                              {assignment && <CheckRoundedIcon />}
                            </span>
                            <Avatar src={reviewer.avatarUrl ?? undefined}>
                              {initials(reviewer.name)}
                            </Avatar>
                            <span className="reviewer-info">
                              <strong>{reviewer.name}</strong>
                              <small>{reviewer.email}</small>
                              <em>{reviewer.groupRole.toLowerCase()} in this group</em>
                            </span>
                            <Chip
                              size="small"
                              label={
                                reviewer.openAssignmentCount === 0
                                  ? "Available"
                                  : `${reviewer.openAssignmentCount} open`
                              }
                              color={
                                reviewer.openAssignmentCount === 0
                                  ? "success"
                                  : "default"
                              }
                            />
                          </button>
                        );
                      })}
                    </Box>
                  )}
                </>
              )}
            </>
          )}
          <Box className="critique-bottom-actions">
            <Button onClick={() => setStage(1)}>Back to submission</Button>
            <Button
              variant="contained"
              endIcon={<ArrowForwardRoundedIcon />}
              onClick={() => setStage(3)}
            >
              Continue to review
            </Button>
          </Box>
        </Box>
      )}

      {stage === 3 && (
        <Box className="critique-review-stage">
          <Box className="review-stage-heading">
            <Box>
              <Typography variant="h4">Feedback studio</Typography>
              <Typography color="text.secondary">
                Assigned manuscripts open in the real TipTap review editor. Comments and
                highlight targets persist in PostgreSQL.
              </Typography>
            </Box>
            <Chip icon={<AssignmentTurnedInRoundedIcon />} label={`${myAssignments.length} assigned to you`} />
          </Box>

          {myAssignments.length === 0 ? (
            <Alert severity="info">
              You do not currently have a manuscript assigned to review in this reading.
              {workflow.canManageAssignments &&
                " Use the Assign stage to manage reviewer assignments."}
              {feedbackReceived.length > 0 &&
                " Completed feedback on your manuscript is available below."}
            </Alert>
          ) : (
            <Box className="review-assignment-list">
              {myAssignments.map(({ assignment, submission }) => (
                <Box className="critique-panel review-assignment-card" key={assignment.id}>
                  <Box className="manuscript-symbol">W</Box>
                  <Box>
                    <Typography variant="h6">{submission.manuscript.title}</Typography>
                    <Typography variant="body2">
                      by {submission.author.name} · version {submission.manuscript.version}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {submission.manuscript.wordCount
                        ? `${submission.manuscript.wordCount.toLocaleString()} words`
                        : submission.manuscript.filename}
                    </Typography>
                  </Box>
                  <Chip
                    label={assignment.status.replace("_", " ").toLowerCase()}
                    color={assignment.status === "COMPLETED" ? "success" : "default"}
                  />
                  <Button
                    variant="contained"
                    onClick={() =>
                      openReview(submission, assignment.id, assignment.status)
                    }
                  >
                    {assignment.status === "ASSIGNED" ? "Begin review" : "Open review"}
                  </Button>
                  {assignment.status !== "COMPLETED" && (
                    <Button
                      startIcon={<CheckRoundedIcon />}
                      onClick={() => updateStatus(assignment.id, "COMPLETED")}
                    >
                      Mark complete
                    </Button>
                  )}
                </Box>
              ))}
            </Box>
          )}

          {feedbackReceived.length > 0 && (
            <Box className="critique-received-feedback">
              <Box className="review-stage-heading">
                <Box>
                  <Typography variant="h5">Feedback received</Typography>
                  <Typography color="text.secondary">
                    Completed reviews of manuscripts you submitted to this reading.
                  </Typography>
                </Box>
                <Chip
                  icon={<CheckRoundedIcon />}
                  color="success"
                  label={`${feedbackReceived.reduce(
                    (total, item) => total + item.completedAssignments.length,
                    0
                  )} completed`}
                />
              </Box>
              <Box className="review-assignment-list">
                {feedbackReceived.map(({ submission, completedAssignments }) => (
                  <Box
                    className="critique-panel review-assignment-card"
                    key={submission.id}
                  >
                    <Box className="manuscript-symbol">W</Box>
                    <Box>
                      <Typography variant="h6">{submission.manuscript.title}</Typography>
                      <Typography variant="body2">
                        version {submission.manuscript.version} · reviewed by{" "}
                        {completedAssignments
                          .map((assignment) => assignment.reviewer.name)
                          .join(", ")}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {completedAssignments.length} completed{" "}
                        {completedAssignments.length === 1 ? "review" : "reviews"}
                      </Typography>
                    </Box>
                    <Chip label="feedback ready" color="success" />
                    <Button
                      variant="contained"
                      onClick={() =>
                        navigate(
                          `/filefeedbackdetail/${submission.manuscript.appFileId}`
                        )
                      }
                    >
                      View feedback
                    </Button>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {workflow.canManageAssignments && (
            <Box className="critique-panel admin-overview">
              <Typography variant="h6">Reading progress</Typography>
              <Box>
                {workflow.submissions.map((submission) => {
                  const completed = submission.assignments.filter(
                    (assignment) => assignment.status === "COMPLETED"
                  ).length;
                  return (
                    <Box key={submission.id}>
                      <span>
                        <strong>{submission.manuscript.title}</strong>
                        <small>{submission.assignments.length} reviewer assignments</small>
                      </span>
                      <LinearProgress
                        variant="determinate"
                        value={
                          submission.assignments.length
                            ? (completed / submission.assignments.length) * 100
                            : 0
                        }
                      />
                      <b>{completed}/{submission.assignments.length}</b>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          )}
        </Box>
      )}

      <Snackbar
        open={Boolean(toast)}
        autoHideDuration={5000}
        onClose={() => setToast("")}
        message={toast}
      />
    </Box>
  );
}
