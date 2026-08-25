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
import { Group, GroupRole } from "../types/domain-types";
import GroupUserList from "../components/group/GroupUserList";
import { NewsFeed } from "../components/news/NewsFeed";
import { GroupDetailsAdmin } from "../components/group/GroupDetailsAdmin";
import { GroupPersonalDetailsAdmin } from "../components/group/GroupPersonalDetailsAdmin";
import { GroupDetails } from "../components/group/GroupDetails";
import { GroupPersonalDetails } from "../components/group/GroupPersonalDetails";
import GroupInviteMembersDialog from "../components/group/GroupInviteMembersDialog";
import "../assets/css/workspace-pages.css";

const Groups = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const { user } = useUserContext();
  const { data: group, isLoading } = useGroupDetails<Group>(groupId);
  const groupInvite = useGroupInvite();
  const [inviteOpen, setInviteOpen] = useState(false);

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
                People who can participate in this group’s readings.
              </Typography>
            </Box>
            <NewspaperRoundedIcon sx={{ color: "#738078" }} />
          </Box>
          <Box className="group-members-body">
            <GroupUserList groupUsers={group.groupUser} />
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
    </Box>
  );
};

export default Groups;
