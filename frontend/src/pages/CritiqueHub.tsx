import {
  Box,
  Button,
  Chip,
  CircularProgress,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import CloudDoneRoundedIcon from "@mui/icons-material/CloudDoneRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import { useNavigate, useParams } from "react-router-dom";
import { useGroupContext } from "../context/GroupContextProvider";
import { useReadings } from "../hooks/reading/useReadings";
import { Reading } from "../types/domain-types";
import "../assets/css/critique-hub.css";

function formatDate(value?: string) {
  if (!value) return "Date to be arranged";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function readingProgress(reading: Reading) {
  const participantCount = reading.readingParticipant.length;
  const submissionCount = reading.readingSubmission.length;

  if (!participantCount) return 0;
  return Math.min(100, Math.round((submissionCount / participantCount) * 100));
}

export default function CritiqueHub() {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const { activeGroup } = useGroupContext();
  const { readings, isLoading, isError } = useReadings();

  if (!activeGroup || activeGroup.id !== groupId || isLoading) {
    return (
      <Box className="critique-hub-loading">
        <CircularProgress size={28} />
        <Typography>Opening Critique Studio…</Typography>
      </Box>
    );
  }

  const orderedReadings = [...readings].sort((a, b) => {
    if (!a.readingDate) return 1;
    if (!b.readingDate) return -1;
    return new Date(a.readingDate).getTime() - new Date(b.readingDate).getTime();
  });

  return (
    <Box className="critique-hub-page">
      <Box className="critique-hub-hero">
        <Box className="critique-hub-copy">
          <Typography className="critique-hub-eyebrow">
            {activeGroup.name} · working prototype
          </Typography>
          <Typography component="h1">Critique Studio</Typography>
          <Typography className="critique-hub-lede">
            Move a manuscript from submission to thoughtfully assigned review,
            then see the feedback take shape in one focused workspace.
          </Typography>
          <Stack direction="row" spacing={1} className="critique-hub-badges">
            <Chip icon={<LockRoundedIcon />} label="Authenticated" />
            <Chip icon={<CloudDoneRoundedIcon />} label="S3 files" />
            <Chip icon={<StorageRoundedIcon />} label="Persisted data" />
          </Stack>
        </Box>

        <Box className="critique-hub-flow" aria-label="Critique workflow overview">
          <Box>
            <span><UploadFileRoundedIcon /></span>
            <strong>Submit</strong>
            <small>Choose or upload a manuscript</small>
          </Box>
          <ArrowForwardRoundedIcon />
          <Box>
            <span><GroupsRoundedIcon /></span>
            <strong>Assign</strong>
            <small>Balance reviewers across the group</small>
          </Box>
          <ArrowForwardRoundedIcon />
          <Box>
            <span><MenuBookRoundedIcon /></span>
            <strong>Review</strong>
            <small>Write and explore feedback</small>
          </Box>
        </Box>
      </Box>

      <Box className="critique-hub-section-heading">
        <Box>
          <Typography component="h2">Choose a reading</Typography>
          <Typography>
            Every reading below belongs to {activeGroup.name}. Change groups in
            the header to explore another workspace.
          </Typography>
        </Box>
        <Button
          variant="outlined"
          onClick={() => navigate(`/groups/${activeGroup.id}/readings`)}
        >
          Manage readings
        </Button>
      </Box>

      {isError && (
        <Box className="critique-hub-empty">
          <Typography component="h3">We couldn’t load this group’s readings.</Typography>
          <Typography>Please refresh the page and try again.</Typography>
        </Box>
      )}

      {!isError && orderedReadings.length === 0 && (
        <Box className="critique-hub-empty">
          <span><CalendarMonthRoundedIcon /></span>
          <Typography component="h3">Begin with a reading</Typography>
          <Typography>
            Create a reading for this group, then return here to submit a manuscript
            and assign its reviewers.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate(`/groups/${activeGroup.id}/readings`)}
          >
            Create a reading
          </Button>
        </Box>
      )}

      {!isError && orderedReadings.length > 0 && (
        <Box className="critique-reading-grid">
          {orderedReadings.map((reading) => {
            const participants = reading.readingParticipant.length;
            const submissions = reading.readingSubmission.length;
            const progress = readingProgress(reading);

            return (
              <Box className="critique-reading-card" key={reading.id}>
                <Box className="critique-reading-card-topline">
                  <Typography>{formatDate(reading.readingDate)}</Typography>
                  <span>{submissions ? "In progress" : "Ready to begin"}</span>
                </Box>
                <Typography component="h3">{reading.name}</Typography>
                <Typography className="critique-reading-description">
                  {reading.description || "A focused space for this reading’s manuscripts and feedback."}
                </Typography>

                <Box className="critique-reading-stats">
                  <Box>
                    <strong>{participants}</strong>
                    <small>participants</small>
                  </Box>
                  <Box>
                    <strong>{submissions}</strong>
                    <small>submissions</small>
                  </Box>
                  <Box>
                    <strong>{progress}%</strong>
                    <small>submitted</small>
                  </Box>
                </Box>

                <LinearProgress variant="determinate" value={progress} />

                <Button
                  variant="contained"
                  endIcon={<ArrowForwardRoundedIcon />}
                  onClick={() =>
                    navigate(
                      `/groups/${activeGroup.id}/readings/${reading.id}/workflow`
                    )
                  }
                >
                  Open critique workflow
                </Button>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
}
