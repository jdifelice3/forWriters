import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Typography,
} from "@mui/material";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Group, Reading } from "../types/domain-types";
import { useUserContext } from "../context/UserContext";
import { useGroupDetails } from "../hooks/useGroup";
import { useReadings } from "../hooks/reading/useReadings";
import { useReadingDomain } from "../hooks/reading/useReadingDomain";
import { useReadingsUI } from "../hooks/reading/useReadingsUI";
import { useNotificationDomain } from "../hooks/notification/useNotificationDomain";
import ReadingCalendar from "../components/reading/ReadingCalendar";
import "../assets/css/workspace-pages.css";

const Readings = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { user, isLoading: userLoading } = useUserContext();
  const { data: group, isLoading: groupLoading } = useGroupDetails<Group>(groupId);
  const { readings, isLoading: readingsLoading, refresh } = useReadings();
  const { createNotification } = useNotificationDomain(group?.id, user);
  const ui = useReadingsUI();
  const domain = useReadingDomain(group?.id, user, readings, refresh);

  if (userLoading || groupLoading || readingsLoading || !group || !user) {
    return (
      <Box className="workspace-loading">
        <CircularProgress size={26} />
        <Typography>Loading readings…</Typography>
      </Box>
    );
  }

  const membership = group.groupUser.find((member) => member.userId === user.id);
  const hasAdminRole = membership?.role === "ADMIN" || membership?.role === "OWNER";
  const isAdmin = Boolean(
    hasAdminRole &&
    (group.groupType === "WRITING" ||
      (group.groupType === "PERSONAL" && group.creatorUserId === user.id))
  );
  const submissionCount = readings.reduce(
    (total, reading) => total + reading.readingSubmission.length,
    0
  );

  const openFeedback = async (selectedReadingId: string) => {
    const reading: Reading | undefined = readings.find(
      (item) => item.id === selectedReadingId
    );
    if (!reading) return;

    const href = `/filefeedback/${selectedReadingId}`;
    for (const participant of reading.readingParticipant) {
      const profile = participant.user.userProfile;
      const name = profile?.firstName
        ? `${profile.firstName} ${profile.lastName}`
        : participant.user.email;
      createNotification(
        `${name} is reviewing your reading`,
        "READING_FEEDBACK",
        participant.user.id,
        href
      );
    }
    navigate(href);
  };

  return (
    <Box className="workspace-page readings-workspace">
      <Box className="workspace-page-header">
        <Box>
          <Typography className="workspace-eyebrow">{group.name}</Typography>
          <Typography component="h1">Readings</Typography>
          <Typography className="workspace-page-lede">
            {group.groupType === "WRITING"
              ? "Schedule critique sessions, collect exact manuscript versions, and move every reading into the feedback workflow."
              : "Create focused review spaces for your manuscripts and invite the right readers when you are ready."}
          </Typography>
        </Box>
        <Box className="workspace-header-actions">
          <Button
            variant="outlined"
            startIcon={<ArrowBackRoundedIcon />}
            onClick={() => navigate(`/groups/${group.id}/critique`)}
          >
            Back to Critique Studio
          </Button>
        </Box>
      </Box>

      <Box className="workspace-summary-strip">
        <Chip icon={<CalendarMonthRoundedIcon />} label={`${readings.length} readings`} />
        <Chip icon={<DescriptionRoundedIcon />} label={`${submissionCount} submissions`} />
        <Chip icon={<GroupsRoundedIcon />} label={isAdmin ? "Reading manager" : "Group participant"} />
      </Box>

      <Box className="workspace-surface">
        <Box className="workspace-section-heading">
          <Box>
            <Typography component="h2">
              {group.groupType === "WRITING" ? "Reading calendar" : "Review queue"}
            </Typography>
            <Typography>
              Open a reading to submit, assign reviewers, or continue a critique.
            </Typography>
          </Box>
        </Box>
        <ReadingCalendar
          readings={readings}
          isAdmin={isAdmin}
          domain={domain}
          ui={ui}
          onFeedback={openFeedback}
        />
      </Box>
    </Box>
  );
};

export default Readings;
