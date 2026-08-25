import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Session from "supertokens-auth-react/recipe/session";
import { mutate } from "swr";
import { useGroupContext } from "../context/GroupContextProvider";
import { useGroupInvite } from "../hooks/useGroup";
import { GroupSummary } from "../types/ContextTypes";
import { tokenValidationResponse } from "../types/InviteTypes";

const pendingGroupKey = "groupInviteGroupId";
const pendingSessionKey = "groupInvitePendingId";

export default function GroupInvite() {
  const { groupId } = useParams<{ groupId: string }>();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const { setActiveGroup } = useGroupContext();
  const { validate, completeInvite, declineInvite } = useGroupInvite();

  const [invitation, setInvitation] = useState<tokenValidationResponse>();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [declined, setDeclined] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let active = true;

    async function loadInvitation() {
      if (!token || !groupId) {
        setErrorMessage("This invitation link is incomplete.");
        setLoading(false);
        return;
      }

      try {
        const response = await validate(token);
        if (active) setInvitation(response);
      } catch (error) {
        if (active) {
          setErrorMessage(
            error instanceof Error ? error.message : "The invitation could not be validated."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadInvitation();
    return () => {
      active = false;
    };
  }, [groupId, token, validate]);

  async function finishInvitation(pendingId: string) {
    const completeResponse = await completeInvite(pendingId);
    const groupSummary: GroupSummary = {
      id: completeResponse.groupId,
      name: completeResponse.name,
      role: completeResponse.role,
      groupType: completeResponse.groupType,
    };

    sessionStorage.removeItem(pendingGroupKey);
    sessionStorage.removeItem(pendingSessionKey);
    await mutate("/me/groups");
    setActiveGroup(groupSummary);
    navigate(`/groups/${completeResponse.groupId}`, { replace: true });
  }

  async function onAccept() {
    if (!invitation || !groupId) return;
    setSubmitting(true);
    setErrorMessage("");

    try {
      if (await Session.doesSessionExist()) {
        await finishInvitation(invitation.pendingId);
        return;
      }

      sessionStorage.setItem(pendingGroupKey, groupId);
      sessionStorage.setItem(pendingSessionKey, invitation.pendingId);
      navigate(`/auth?redirectToPath=${encodeURIComponent("/studio")}`);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "The invitation could not be accepted."
      );
      setSubmitting(false);
    }
  }

  async function onDecline() {
    if (!invitation) return;
    setSubmitting(true);
    setErrorMessage("");
    try {
      await declineInvite(invitation.pendingId);
      setDeclined(true);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "The invitation could not be declined."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <Box display="flex" alignItems="center" gap={1.5} p={3}>
        <CircularProgress size={22} />
        <Typography>Opening invitation…</Typography>
      </Box>
    );
  }

  if (errorMessage && !invitation) {
    return <Alert severity="error" sx={{ m: 3 }}>{errorMessage}</Alert>;
  }

  if (declined) {
    return (
      <Typography variant="h6" m={3}>
        You’ve declined the invitation to join {invitation?.groupName}.
      </Typography>
    );
  }

  return (
    <Box m={3} maxWidth={620}>
      <Typography variant="h5" mb={2}>
        You’ve been invited to join {invitation?.groupName}
      </Typography>
      <Typography mb={1}>Invited by <b>{invitation?.invitedBy || "a group administrator"}</b></Typography>
      <Typography mb={1}>Your role: <b>{invitation?.role.toLowerCase()}</b></Typography>
      <Typography mb={2}>Invitation sent to: <b>{invitation?.email}</b></Typography>

      {errorMessage && <Alert severity="error" sx={{ mb: 2 }}>{errorMessage}</Alert>}

      <Button variant="contained" sx={{ mr: 1 }} onClick={onAccept} disabled={submitting}>
        {submitting ? "Accepting…" : "Accept"}
      </Button>
      <Button variant="outlined" onClick={onDecline} disabled={submitting}>
        Decline
      </Button>
    </Box>
  );
}
