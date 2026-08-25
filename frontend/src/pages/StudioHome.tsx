import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { mutate } from "swr";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CloudDoneRoundedIcon from "@mui/icons-material/CloudDoneRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import MessageRoundedIcon from "@mui/icons-material/MessageRounded";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import { Navigate, useNavigate } from "react-router-dom";
import { useGroupContext } from "../context/GroupContextProvider";
import { useGroupInvite } from "../hooks/useGroup";
import "../assets/css/studio-shell.css";

export default function StudioHome() {
  const navigate = useNavigate();
  const { activeGroup, groups, isLoading, setActiveGroup } = useGroupContext();
  const { completeInvite } = useGroupInvite();
  const [pendingInvite] = useState(() => ({
    groupId: sessionStorage.getItem("groupInviteGroupId"),
    pendingId: sessionStorage.getItem("groupInvitePendingId"),
  }));
  const [inviteCompletion, setInviteCompletion] = useState<
    "idle" | "completing" | "error"
  >(
    pendingInvite.groupId && pendingInvite.pendingId
      ? "completing"
      : pendingInvite.groupId || pendingInvite.pendingId
        ? "error"
        : "idle"
  );
  const [inviteError, setInviteError] = useState("");

  useEffect(() => {
    if (!pendingInvite.groupId || !pendingInvite.pendingId) return;

    async function finishPendingInvitation() {
      try {
        const completed = await completeInvite(pendingInvite.pendingId!);
        sessionStorage.removeItem("groupInviteGroupId");
        sessionStorage.removeItem("groupInvitePendingId");
        await mutate("/me/groups");
        setActiveGroup({
          id: completed.groupId,
          name: completed.name,
          role: completed.role,
          groupType: completed.groupType,
        });
        navigate(`/groups/${completed.groupId}`, { replace: true });
      } catch (error) {
        setInviteError(
          error instanceof Error ? error.message : "The invitation could not be completed."
        );
        setInviteCompletion("error");
      }
    }

    finishPendingInvitation();
  }, [completeInvite, navigate, pendingInvite.groupId, pendingInvite.pendingId, setActiveGroup]);

  if (inviteCompletion === "completing") {
    return (
      <Box className="studio-home-loading">
        <CircularProgress size={28} />
        <Typography>Adding you to the writing group…</Typography>
      </Box>
    );
  }

  if (inviteCompletion === "error") {
    return (
      <Box className="studio-home-page">
        <Alert severity="error">
          {inviteError || "The invitation session is incomplete. Open the invitation link again."}
        </Alert>
        <Button
          sx={{ mt: 2 }}
          onClick={() => {
            sessionStorage.removeItem("groupInviteGroupId");
            sessionStorage.removeItem("groupInvitePendingId");
            setInviteCompletion("idle");
          }}
        >
          Continue to forWriters
        </Button>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box className="studio-home-loading">
        <CircularProgress size={28} />
        <Typography>Preparing your writing workspace…</Typography>
      </Box>
    );
  }

  if (activeGroup) {
    return <Navigate replace to={`/groups/${activeGroup.id}/critique`} />;
  }

  return (
    <Box className="studio-home-page">
      <Box className="studio-home-hero">
        <Typography className="studio-kicker">forWriters · functional prototype</Typography>
        <Typography component="h1">
          A clearer path from
          <br />
          draft to dialogue.
        </Typography>
        <Typography className="studio-home-lede">
          Organize a reading, submit a manuscript, choose the right reviewers,
          and turn many voices into feedback a writer can actually use.
        </Typography>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
          <Button
            className="studio-primary-action"
            variant="contained"
            endIcon={<ArrowForwardRoundedIcon />}
            onClick={() => navigate("/creategroup")}
          >
            Start a writing group
          </Button>
          <Button
            className="studio-secondary-action"
            variant="outlined"
            onClick={() => navigate("/groupsearch")}
          >
            Find an existing group
          </Button>
        </Stack>

        <Typography className="studio-home-note">
          {groups.length === 0
            ? "Your staging account is authenticated. Add a group to begin the live workflow."
            : `${groups.length} group${groups.length === 1 ? "" : "s"} available.`}
        </Typography>
      </Box>

      <Box className="studio-home-workflow">
        <Box className="studio-home-workflow-heading">
          <Typography component="h2">One connected critique workflow</Typography>
          <Typography>
            The prototype uses the existing forWriters services instead of sample data.
          </Typography>
        </Box>

        <Box className="studio-home-step-grid">
          <Box>
            <span><UploadFileRoundedIcon /></span>
            <b>01</b>
            <Typography component="h3">Submit with context</Typography>
            <Typography>
              Upload a DOCX manuscript or choose an existing version, then attach it
              to a group reading.
            </Typography>
          </Box>
          <Box>
            <span><GroupsRoundedIcon /></span>
            <b>02</b>
            <Typography component="h3">Assign deliberately</Typography>
            <Typography>
              See eligible group members and reviewer workloads before making
              persistent assignments.
            </Typography>
          </Box>
          <Box>
            <span><MessageRoundedIcon /></span>
            <b>03</b>
            <Typography component="h3">Understand the feedback</Typography>
            <Typography>
              Move from in-manuscript comments to an organized view of themes,
              reviewers, and progress.
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box className="studio-home-foundation">
        <Typography>Connected to the staging foundation</Typography>
        <Stack direction="row" spacing={1}>
          <span><LockRoundedIcon /> SuperTokens</span>
          <span><CloudDoneRoundedIcon /> Amazon S3</span>
          <span><StorageRoundedIcon /> PostgreSQL</span>
        </Stack>
      </Box>
    </Box>
  );
}
