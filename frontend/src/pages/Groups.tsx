import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Typography,
} from "@mui/material";
import GroupAddRoundedIcon from "@mui/icons-material/GroupAddRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import NewspaperRoundedIcon from "@mui/icons-material/NewspaperRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import { useUserContext } from "../context/UserContext";
import { useGroupDetails, useGroupInvite } from "../hooks/useGroup";
import { Group, GroupRole, GroupUser } from "../types/domain-types";
import GroupUserList from "../components/group/GroupUserList";
import { groupMemberName } from "../utils/groupMember";
import { NewsFeed } from "../components/news/NewsFeed";
import { GroupDetailsAdmin } from "../components/group/GroupDetailsAdmin";
import { GroupPersonalDetailsAdmin } from "../components/group/GroupPersonalDetailsAdmin";
import { GroupDetails } from "../components/group/GroupDetails";
import { GroupPersonalDetails } from "../components/group/GroupPersonalDetails";
import GroupInviteMembersDialog from "../components/group/GroupInviteMembersDialog";
import ConfirmDialog from "../components/dialogs/ConfirmDialog";
import { GroupAPI } from "../api/groupApi";
import "../assets/css/workspace-pages.css";

const Groups = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const { user } = useUserContext();
  const { data: group, isLoading, mutate } = useGroupDetails<Group>(groupId);
  const groupInvite = useGroupInvite();
  const [inviteOpen, setInviteOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<GroupUser | null>(null);
  const [removingMember, setRemovingMember] = useState(false);
  const [memberRemovalError, setMemberRemovalError] = useState("");

  if (isLoading || !user) {
    return (
      <Box className="workspace-loading">
        <CircularProgress size={26} />
        <Typography>Loading the group workspace…</Typography>
      </Box>
    );
  }

  if (!group) {
    return (
      <Box className="workspace-page">
        <Alert severity="info">This group could not be found.</Alert>
      </Box>
    );
  }

  const membership = group.groupUser.find((member) => member.userId === user.id);
  const role = membership?.role;
  const isAdmin = role === "ADMIN" || role === "OWNER";
  const canRemoveMember = (member: GroupUser) =>
    isAdmin && member.userId !== user.id && member.role !== "OWNER";

  const confirmMemberRemoval = async () => {
    if (!memberToRemove) return;

    setRemovingMember(true);
    setMemberRemovalError("");
    try {
      await GroupAPI.removeMember(group.id, memberToRemove.id);
      await mutate();
      setMemberToRemove(null);
    } catch (error) {
      setMemberRemovalError(
        error instanceof Error ? error.message : "Could not remove this member"
      );
    } finally {
      setRemovingMember(false);
    }
  };

  const sendExistingInvite = async (input: {
    userId: string;
    role: GroupRole;
  }) => {
    await groupInvite.sendInvite(input.userId, input.role, "USERID");
  };

  const sendEmailInvite = async (input: { email: string; role: GroupRole }) => {
    await groupInvite.sendInvite(input.email, input.role, "EMAIL");
  };

  return (
    <Box className="workspace-page groups-workspace">
      <Box className="workspace-page-header">
        <Box>
          <Typography className="workspace-eyebrow">Group workspace</Typography>
          <Typography component="h1">{group.name}</Typography>
          <Typography className="workspace-page-lede">
            {group.description ||
              "A shared home for readings, manuscripts, announcements, and critique partners."}
          </Typography>
        </Box>
        <Box className="workspace-header-actions">
          <Button
            variant="outlined"
            startIcon={<MenuBookRoundedIcon />}
            onClick={() => navigate(`/groups/${group.id}/readings`)}
          >
            View readings
          </Button>
          {isAdmin && (
            <Button
              variant="contained"
              startIcon={<GroupAddRoundedIcon />}
              onClick={() => setInviteOpen(true)}
            >
              Invite members
            </Button>
          )}
        </Box>
      </Box>

      <Box className="workspace-summary-strip">
        <Chip
          icon={<GroupsRoundedIcon />}
          label={`${group.groupUser.length} ${group.groupUser.length === 1 ? "member" : "members"}`}
        />
        <Chip label={group.groupType === "WRITING" ? "Writing group" : "Personal group"} />
        {role && <Chip icon={<ShieldRoundedIcon />} label={`Your role: ${role.toLowerCase()}`} />}
      </Box>

      <Box className="group-workspace-grid">
        <Box component="section" className="workspace-surface group-details-zone">
          {isAdmin ? (
            group.groupType === "WRITING" ? (
              <GroupDetailsAdmin group={group} />
            ) : (
              <GroupPersonalDetailsAdmin group={group} />
            )
          ) : group.groupType === "WRITING" ? (
            <GroupDetails group={group} />
          ) : (
            <GroupPersonalDetails group={group} />
          )}
        </Box>

        <Box component="section" className="workspace-surface group-news-zone">
          <NewsFeed groupId={group.id} isAdmin={isAdmin} />
        </Box>

        <Box component="section" className="workspace-surface group-members-zone">
          <Box className="group-members-header">
            <Box>
              <Typography component="h2">Members</Typography>
              <Typography variant="body2" color="text.secondary">
                {isAdmin
                  ? "Select a member to remove them from this group."
                  : "People who can participate in this group’s readings."}
              </Typography>
            </Box>
            <NewspaperRoundedIcon sx={{ color: "#738078" }} />
          </Box>
          <Box className="group-members-body">
            {memberRemovalError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {memberRemovalError}
              </Alert>
            )}
            <GroupUserList
              groupUsers={group.groupUser}
              canRemoveMember={canRemoveMember}
              onRemoveMember={(member) => {
                setMemberRemovalError("");
                setMemberToRemove(member);
              }}
            />
          </Box>
        </Box>
      </Box>

      <GroupInviteMembersDialog
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        onSendExistingInvite={sendExistingInvite}
        onSendEmailInvite={sendEmailInvite}
        memberOptions={[]}
        loadingMembers
        groupId={groupId}
      />
      <ConfirmDialog
        open={Boolean(memberToRemove)}
        title={
          memberToRemove
            ? `Remove ${groupMemberName(memberToRemove)} from ${group.name}?`
            : "Remove member?"
        }
        message="This person will lose access to the group. Their existing manuscript submissions and feedback will remain in the reading history."
        confirmLabel={removingMember ? "Removing…" : "Remove member"}
        confirmDisabled={removingMember}
        onConfirm={confirmMemberRemoval}
        onClose={() => {
          if (!removingMember) setMemberToRemove(null);
        }}
      />
    </Box>
  );
};

export default Groups;
