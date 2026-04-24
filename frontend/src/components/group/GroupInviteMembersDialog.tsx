import { useMemo, useState } from "react";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { UserSearch } from "../../types/UserTypes";
import MemberSearchBox from "../member/MemberSearchBox";

// type GroupRole = "MEMBER" | "READER" | "ADMIN";

import { GroupRole } from "../../types/domain-types";

type InviteEligibility =
  | "idle"
  | "eligible"
  | "already_member"
  | "pending_invite"
  | "expired_invite"
  | "error";

type MemberOption = {
  id: string;
  displayName: string;
  email: string;
  groupStatus: "not_in_group" | "already_member" | "pending_invite" | "expired_invite";
};

type InviteMembersDialogProps = {
  open: boolean;
  onClose: () => void;
  onSendExistingInvite: (input: { userId: string; role: GroupRole }) => Promise<void>;
  onSendEmailInvite: (input: { email: string; role: GroupRole }) => Promise<void>;
  memberOptions: MemberOption[];
  loadingMembers?: boolean;
  groupId?: string | undefined
};

const GroupInviteMembersDialog = ({
  open,
  onClose,
  onSendExistingInvite,
  onSendEmailInvite,
  memberOptions,
  loadingMembers = false,
  groupId
}: InviteMembersDialogProps) => {
  const [tab, setTab] = useState(0);

//   const [selectedMember, setSelectedMember] = useState<MemberOption | null>(null);
  const [selectedMember, setSelectedMember] = useState<UserSearch | null>(null);
  const [existingRole, setExistingRole] = useState<GroupRole>("MEMBER");
  const [email, setEmail] = useState("");
  const [emailRole, setEmailRole] = useState<GroupRole>("MEMBER");
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const eligibility: InviteEligibility = useMemo(() => {
    if (!selectedMember) return "idle";
    switch (selectedMember.groupStatus) {
      case "not_in_group":
        return "eligible";
      case "already_member":
        return "already_member";
      case "pending_invite":
        return "pending_invite";
      case "expired_invite":
        return "expired_invite";
      default:
        return "error";
    }
  }, [selectedMember]);

  const eligibilityAlert = useMemo(() => {
    switch (eligibility) {
      case "eligible":
        return { severity: "success" as const, message: "Eligible to invite." };
      case "already_member":
        return { severity: "warning" as const, message: "This member is already in the group." };
      case "pending_invite":
        return { severity: "info" as const, message: "This member already has a pending invite." };
      case "expired_invite":
        return { severity: "info" as const, message: "A previous invite expired. You can resend it." };
      case "error":
        return { severity: "error" as const, message: "Unable to determine invitation status." };
      default:
        return null;
    }
  }, [eligibility]);

  const canSendExisting =
    selectedMember &&
    (eligibility === "eligible" || eligibility === "expired_invite");

    const handleOnClose = () => {
        setSubmitting(false);
        setSuccessMessage("");
        setSelectedMember(null);
        onClose();
    }

  async function handleSendExistingInvite() {
    if (!selectedMember || !canSendExisting) return;
    setSubmitting(true);
    setSuccessMessage("");

    try {
      await onSendExistingInvite({
        userId: selectedMember.userId,
        role: existingRole,
      });
      setSuccessMessage(`Invitation sent to ${selectedMember.fullname}.`);
      setSelectedMember(null);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSendEmailInvite() {
    if (!email.trim()) return;
    setSubmitting(true);
    setSuccessMessage("");

    try {
      await onSendEmailInvite({
        email: email.trim(),
        role: emailRole,
      });
      setSuccessMessage(`Invitation sent to ${email.trim()}.`);
      setEmail("");
    } finally {
      setSubmitting(false);
    }
  }

  function renderOptionLabel(option: UserSearch) {
    switch (option.groupStatus) {
      case "already_member":
        return "Already a member";
      case "pending_invite":
        return "Pending invite";
      case "expired_invite":
        return "Invite expired";
      default:
        return "Not in this group";
    }
  }

  return (
    <Dialog open={open} onClose={handleOnClose} fullWidth maxWidth="sm">
      <DialogTitle>Invite to Group</DialogTitle>

      <DialogContent dividers>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Invite an existing forWriters member or send an invitation by email.
        </Typography>

        <Tabs value={tab} onChange={(_, value) => setTab(value)} sx={{ mb: 3 }}>
          <Tab label="Existing Member" />
          <Tab label="Invite by Email" />
        </Tabs>

        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}

        {tab === 0 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <MemberSearchBox onSelectMember={setSelectedMember} groupId={groupId}/>
            {selectedMember && (
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="subtitle1">{selectedMember.fullname}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedMember.email}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {renderOptionLabel(selectedMember)}
                  </Typography>
                </CardContent>
              </Card>
            )}

            <FormControl fullWidth>
              <InputLabel id="existing-role-label">Role</InputLabel>
              <Select
                labelId="existing-role-label"
                value={existingRole}
                label="Role"
                onChange={(e) => setExistingRole(e.target.value as GroupRole)}
              >
                <MenuItem value="MEMBER">Member</MenuItem>
                <MenuItem value="READER">Reader</MenuItem>
                <MenuItem value="ADMIN">Admin</MenuItem>
              </Select>
            </FormControl>

            {eligibilityAlert && (
              <Alert severity={eligibilityAlert.severity}>
                {eligibilityAlert.message}
              </Alert>
            )}
          </Box>
        )}

        {tab === 1 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel id="email-role-label">Role</InputLabel>
              <Select
                labelId="email-role-label"
                value={emailRole}
                label="Role"
                onChange={(e) => setEmailRole(e.target.value as GroupRole)}
              >
                <MenuItem value="MEMBER">Member</MenuItem>
                <MenuItem value="READER">Reader</MenuItem>
                <MenuItem value="ADMIN">Admin</MenuItem>
              </Select>
            </FormControl>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleOnClose} disabled={submitting} variant="contained">
          {successMessage.length === 0 ? "Cancel" : "Close"}
        </Button>

        {tab === 0 ? (
          <Button
            variant="contained"
            onClick={handleSendExistingInvite}
            disabled={!canSendExisting || submitting}
          >
            {eligibility === "expired_invite" ? "Resend Invite" : "Send Invite"}
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleSendEmailInvite}
            disabled={!email.trim() || submitting}
          >
            Send Invite
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default GroupInviteMembersDialog;