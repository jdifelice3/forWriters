import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  CircularProgress,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import { GroupDetails } from "../components/GroupDetails";
import { NewsFeed } from "../components/NewsFeed";
import { EventsCalendar } from "../components/EventsCalendar";
import { useUserContext } from "../context/UserContext";

const styles = {
    marginLeft: '100px' // or a responsive value
};

const ReadingSignup = () => {

  const { groupId } = useParams<{ groupId: string }>();
  const { isLoading } = useUserContext();
  const [group, setGroup] = useState<any | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

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
      <Typography variant="h4" mb={3} textAlign="center">
        {group.name}
      </Typography>
      <Typography variant="h5" mb={3} textAlign="center">
        Sign Up For a Reading
      </Typography>

      <EventsCalendar groupId={group.id} isAdmin={isAdmin} />

    </Box>
  );
}

export default ReadingSignup;