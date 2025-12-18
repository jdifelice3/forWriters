import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useGroupDetails } from "../hooks/useGroup";
import { Group } from "../types/domain-types";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Divider,
} from "@mui/material";
import GroupIcon from '@mui/icons-material/Group';
import Grid from "@mui/material/Grid";
import { useGroupContext } from "../context/GroupContextProvider";
import GroupUserList from "../components/group/GroupUserList";
import { NewsFeed } from "../components/news/NewsFeed";
import { GroupDetailsAdmin } from "../components/group/GroupDetailsAdmin";
import { GroupDetails } from "../components/group/GroupDetails";


const styles = {
    marginLeft: '75px'
};

const Groups = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const { activeGroup } = useGroupContext();
  const { data : group, isLoading } = useGroupDetails<Group>();
  
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={6} >
        <CircularProgress />
      </Box>
    );
  }

  if (!group) {
    return <Typography>Alas, no group was found.</Typography>;
  }

  const userIndex: number = group.groupUser.findIndex(item => item.userId === user.id);
  const isAdmin = (group.groupUser[userIndex].isAdmin);

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

      <Grid container spacing={3} className="groupSubPanel">
        <Grid size={12}>
           {isAdmin ? (
              <GroupDetailsAdmin group={group} />
           ) : (<GroupDetails group={group}/>
           )}
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }}  className="groupSubPanel"/>

      <Grid container spacing={3} className="groupSubPanel">
        <Grid size={12}>
          <NewsFeed groupId={group.id} isAdmin={isAdmin} />
        </Grid>
      </Grid>
      <Divider sx={{ my: 4 }}  className="groupSubPanel"/>
      <Grid container spacing={3} className="groupSubPanel">
        <Grid size={12}>
            <Card>
                <CardContent>
                    <Typography variant="h6" mb={2}>
                        Group Members
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

//✍️ 