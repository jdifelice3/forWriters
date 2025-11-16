import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";

import { NewsFeed } from "../components/NewsFeed";
import { useUserContext } from "../context/UserContext";
import AddIcon from "@mui/icons-material/Add";
import { GroupDetailsAdmin } from "../components/GroupDetailsAdmin";
import { GroupDetails } from "../components/GroupDetails";
import { EventsCalendar } from "../components/EventsCalendar";

const styles = {
    marginLeft: '100px' // or a responsive value
};

const Groups = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const { isLoading } = useUserContext();
  const [group, setGroup] = useState<any | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const navigate = useNavigate();

  const groupsUrl = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/groups`;

  useEffect(() => {
    if (!groupId) return;

    (async () => {
      const res = await fetch(`${groupsUrl}/${groupId}`, {
        credentials: "include",
      }); 
      if (res.ok) {
        const data = await res.json();
        
        setGroup(data);
        console.log(data);

        //setIsAdmin(data.isAdmin);
        setIsAdmin(false);
      }
      setLoadingData(false);
    })();
  }, [groupId]);

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
        ✍️ {group.name}
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
      {isAdmin ? (
        <EventsCalendar groupId={group.id} isAdmin={isAdmin} />
      ) : (
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

            <Divider sx={{ mb: 3 }} />
            
            <Typography variant="h6" mb={2}>
              Review Manuscripts for the Current Reading
            </Typography>
          </CardContent>
        </Card>
      )}
      

      <Divider sx={{ my: 4 }} />

      <Grid container spacing={3}>
        <Grid size={12}>
          <NewsFeed groupId={group.id} isAdmin={isAdmin} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Groups;