import { useState } from "react";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useGroupDetails } from "../hooks/useGroup";
import { useParams } from "react-router";
import { Group } from "../types/domain-types";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Divider,
} from "@mui/material";
import GroupIcon from '@mui/icons-material/Group';
import Grid from "@mui/material/Grid";
import GroupUserList from "../components/group/GroupUserList";
import { NewsFeed } from "../components/news/NewsFeed";
import { GroupDetailsAdmin } from "../components/group/GroupDetailsAdmin";
import { GroupPersonalDetailsAdmin } from "../components/group/GroupPersonalDetailsAdmin";
import { GroupDetails } from "../components/group/GroupDetails";
import { GroupPersonalDetails } from "../components/group/GroupPersonalDetails";
import GroupInviteMembersDialog from "../components/group/GroupInviteMembersDialog";
import { GroupRole } from "../types/domain-types";

const Groups = () => {
    const [open, setOpen] = useState(false);
    const { groupId } = useParams();
    const { user } = useUserContext();
    const { data : group, isLoading } = useGroupDetails<Group>(groupId);

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" p={6} >
                <CircularProgress />
            </Box>
        );
    }

    if (!group) {
        return <Typography sx={{mt:3}}>Alas, no group was found.</Typography>;
    }

    const userIndex: number = group.groupUser.findIndex(item => item.userId === user.id);
    const isAdmin = (group.groupUser[userIndex].role === "ADMIN");
    

    const handleCloseInviteDialog = () => {
        setOpen(false);
    }

    const handleOnSendExistingInvite = async(input: { userId: string; role: GroupRole }) => {
        alert(`${input.userId}, ${input.role}`);
    }

    const handleOnSendEmailInvite = async(input: { email: string; role: GroupRole }) => {
        alert(`${input.email}, ${input.role}`);
    }
  
    const handleInviteToGroup = (e: any) => {
        setOpen(true);
        return true;
    }
  return (
    <Card elevation={0} className="mainComponentPanel">
        <CardContent>
            <Typography variant="h4" mb={3}>
                <GroupIcon 
                    sx={{ 
                        fontSize: '48px',
                        verticalAlign: "bottom", 
                    }}
                    />&nbsp;
                    {group.name}
            </Typography>

            <Grid container spacing={3} className="groupSubPanel" sx={{mb: 2}}>
                <Grid size={12}>
                {isAdmin ? (
                    group.groupType === "WRITING" ? <GroupDetailsAdmin group={group} /> : <GroupPersonalDetailsAdmin group={group} />
                ) : (
                    group.groupType === "WRITING" ? <GroupDetails group={group} /> : <GroupPersonalDetails group={group} />
                )}
                </Grid>
                <Grid size={3} >
                    <Card>
                        <CardContent>
                            <Button onClick={handleInviteToGroup} variant="contained">
                                Invite to Group
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid>
                    <GroupInviteMembersDialog
                        open={open}
                        onClose = {handleCloseInviteDialog}
                        onSendExistingInvite = {handleOnSendExistingInvite}
                        onSendEmailInvite = {handleOnSendEmailInvite}
                        memberOptions = {[]}
                        loadingMembers = {true}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={3} className="groupSubPanel" sx={{mb: 2}}>
                <Grid size={12}>
                <NewsFeed groupId={group.id} isAdmin={isAdmin} />
                </Grid>
            </Grid>

            <Grid container spacing={3} className="groupSubPanel">
                <Grid size={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" mb={2}>
                                Members
                            </Typography>
                            <GroupUserList groupUsers={group.groupUser} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
  );
}

export default Groups;