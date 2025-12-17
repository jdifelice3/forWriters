import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { ReadingCalendar } from "../components/reading/ReadingCalendar";
import { useUserContext } from "../context/UserContext";

const styles = {
    marginLeft: '75px' // or a responsive value
};

const ReadingSignup = () => {

  const { groupId } = useParams<{ groupId: string }>();
  const { isLoading } = useUserContext();
  const [group, setGroup] = useState<any | null>(null);
  const [loadingData, setLoadingData] = useState(true);

  const groupsUrl = `${import.meta.env.VITE_API_HOST}/api/groups`;

  useEffect(() => {
    if (!groupId) return;

    (async () => {
      const res = await fetch(`${groupsUrl}/${groupId}`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        
        setGroup(data);
        
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
        {group.isAdmin ? ("Create Readings") : ("Sign Up For a Reading")} 
      </Typography>

      <ReadingCalendar groupId={group.id} isAdmin={group.isAdmin}/>

    </Box>
  );
}

export default ReadingSignup;