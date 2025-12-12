import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { GroupBasic } from "../types/domain-types";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  Link
} from "@mui/material";
import Grid from "@mui/material/Grid";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useParams } from "react-router-dom";

import { NewsFeed } from "../components/NewsFeed";

import AddIcon from "@mui/icons-material/Add";
import ReviewsIcon from '@mui/icons-material/Reviews';
import { GroupDetailsAdmin } from "../components/GroupDetailsAdmin";
import { GroupDetails } from "../components/GroupDetails";
import { EventsCalendar } from "../components/EventsCalendar";
import ReadingSchedule from "../components/ReadingSchedule";
import GroupIcon from '@mui/icons-material/Group';
import GroupUserList from "../components/GroupUserList";

const styles = {
    marginLeft: '75px' // or a responsive value
};

const Groups = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const { user, isLoading } = useUserContext();
  const [group, setGroup] = useState<GroupBasic | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const groupsUrl = `${import.meta.env.VITE_API_HOST}/api/groups`;

  useEffect(() => {
    if (!groupId) return;
    if (!user) return;

    (async () => {
      const res = await fetch(`${groupsUrl}/${groupId}`, {
        credentials: "include",
      }); 
      if (res.ok) {
        const data: GroupBasic = await res.json();
        
        if(data){
          setGroup(data);
          const userIndex: number = data.groupUser.findIndex(item => item.userId === user.id);
          setIsAdmin(data.groupUser[userIndex].isAdmin);
        } else {
          setIsAdmin(false);
        }
      }
      setLoadingData(false);
    })();
  }, [groupId, user]);

  if (isLoading || loadingData) {
    return (
      <Box display="flex" justifyContent="center" p={6} >
        <CircularProgress />
      </Box>
    );
  }

  if (!group) {
    return <Typography>No group found.</Typography>;
  }

  return (
    <Box style={styles} sx={{ maxWidth: 1000, mx: "auto", p: 4}}>
      <Typography variant="h4" mb={3}>
        <GroupIcon 
              sx={{ 
                fontSize: '48px',
                verticalAlign: "bottom", 
              }}
            />&nbsp;
            {group.name}
      </Typography>

      <Grid container spacing={3}>
        <Grid size={12}>
           {isAdmin ? (
              <GroupDetailsAdmin group={group} />
           ) : (<GroupDetails group={group}/>
           )}
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />
      {/* {isAdmin ? (
        <EventsCalendar groupId={group.id} isAdmin={isAdmin} />
      ) : ( */}
          <Card>
            <CardContent>
              <Typography variant="h6" mb={2}>
                Sign Up For a Reading
              </Typography>
              <Typography >
                Want to have your manuscript read and critiqued by other writers?
              </Typography>
              <Typography >
                It's a great way to get valuable feedback on your manuscript.👍
              </Typography>
              <Typography>&nbsp;</Typography>
              <Button
                  startIcon={<AddIcon />}
                  variant="outlined"
                  sx={{ mb: 2 }}
                  onClick={() => navigate(`/readingsignup/${groupId}`)}
              >
                  SignUp!
              </Button>
              <Dialog open={open} onClose={() => setOpen(false)}>
                  <DialogTitle>
                    Review Manuscripts
                    <IconButton
                      edge="end"
                      color="inherit"
                      onClick={() => setOpen(false)}
                      aria-label="close"
                      style={{ position: 'absolute', right: 12, top: 8 }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </DialogTitle>
                  <DialogContent>
                    <Grid alignItems="center" justifyContent="center">
                      <ReadingSchedule groupId={groupId}/>
                    </Grid>
                  </DialogContent>
              </Dialog>

              <Divider sx={{ mb: 3 }} />

              <Typography variant="h6" mb={2}>
                  Review Manuscripts for the Next Reading
              </Typography>

              {group && group.reading.length > 0 ? (            
              <Button 
                  startIcon={<ReviewsIcon />}
                  variant="outlined"
                  sx={{ mb: 2 }}
                  onClick={() => navigate(`/readingfeedback/${group.reading[0].id}`)}
              >
                Review              
              </Button>
              ) : (
              <div>
              <Typography variant="body1" mb={2}>
                  It is not yet time to review manuscripts for this reading.
              </Typography>
              
              </div>
              )}
              <Typography variant="h6" mb={2}>
                  OR
              </Typography>
              <Typography>
                <Link
                  component="button"
                  variant="body1"
                  onClick={() => {
                    setOpen(true);
                  }}
                  style={{fontWeight: "bold"}}
                >
                  Review All Available Manuscripts
                </Link>
                <div>&nbsp;</div>
              </Typography>
              
            </CardContent>
          </Card>
      {/* ) */}
      {/* } */}

      <Divider sx={{ my: 4 }} />

      <Grid container spacing={3}>
        <Grid size={12}>
          <NewsFeed groupId={group.id} isAdmin={isAdmin} />
        </Grid>
      </Grid>
      <Divider sx={{ my: 4 }} />
      <Grid container spacing={3}>
        <Grid size={12}>
                <GroupUserList groupId={groupId || ""} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Groups;

//✍️ 