import { Box, Grid, Typography, Alert, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDashboard } from "../hooks/useDashboard";
import { useGroupContext } from "../context/GroupContextProvider";
import AttentionCard from "../components/dashboard/AttentionCard";
import UpcomingCard from "../components/dashboard/UpcomingCard";
import ResumeCard from "../components/dashboard/ResumeCard";

export default function Dashboard() {
  const navigate = useNavigate();
  const { activeGroup } = useGroupContext(); // { id, name, role } | null
  const { data, isError, isLoading, mutate } = useDashboard(activeGroup?.id ?? null);

  console.log('data', data)
  if (isLoading) {
    return (
      <Box sx={{ p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!data.group) {
    return <Typography sx={{mt:3}}>Alas, no group was found.</Typography>;
  }


  if (isError) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert
          severity="error"
          action={<Button onClick={() => mutate()}>Retry</Button>}
        >
          Dashboard failed to load.
        </Alert>
      </Box>
    );
  }

  if (!data?.group) {
    // onboarding / no-group state
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 1, fontWeight: 700 }}>
          Welcome
        </Typography>
        <Typography sx={{ mb: 2 }}>
          Select a group (top nav) to see what needs your attention, what’s coming up, and where you left off.
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="contained" onClick={() => navigate("/groups")}>
            Find a group
          </Button>
          <Button variant="outlined" onClick={() => navigate("/groups?tab=create")}>
            Start a group
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }} className="mainComponentPanel">
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
        Dashboard — {data.group.name}
      </Typography>

      <Grid container spacing={2}>
        <Grid size={12}>
          <AttentionCard items={data.attention} />
        </Grid>

        <Grid size={12}>
          <UpcomingCard items={data.upcoming} />
        </Grid>

        <Grid size={12}>
          <ResumeCard items={data.resume} />
        </Grid>
      </Grid>
    </Box>
  );
}