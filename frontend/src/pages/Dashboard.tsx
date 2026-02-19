import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { 
    Box, 
    Divider,
    Grid, 
    Typography, 
    TextField,
    Button, 
    CircularProgress,
    Stack,
    Card,
    CardContent
} from "@mui/material";
import { UserProfile } from "../types/domain-types";
import { useNavigate } from "react-router-dom";
import { useDashboard } from "../hooks/useDashboard";
import { useGroupContext } from "../context/GroupContextProvider";
import AttentionCard from "../components/dashboard/AttentionCard";
import UpcomingCard from "../components/dashboard/UpcomingCard";
import ResumeCard from "../components/dashboard/ResumeCard";
import { ProfileFormInputs } from "../types/UserTypes";
import { useUserContext } from "../context/UserContext";
import { useUserDomain } from "../hooks/useUserDomain";

type UserProfileInput = {
    firstName: string;
    lastName: string
}

export default function Dashboard() {
    const { user, isLoading: isUserLoading } = useUserContext();
    const { getUserProfile, updateUserProfile } = useUserDomain(user);
    const { activeGroup } = useGroupContext(); // { id, name, role } | null
    const { data, isLoading } = useDashboard(activeGroup?.id ?? null);
    const [userProfile, setUserProfile] = useState<UserProfileInput>({firstName: "", lastName: ""})
    const {
        control,
        handleSubmit,
        formState: { errors }, 
        reset
    } = useForm<ProfileFormInputs>({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            bio: "",
            title: "",
            description: "",
            avatar: undefined,
        },
    });
    
    useEffect(() => {
        const load = async() => {
            const result = await getUserProfile();
            if(userProfile){
                setUserProfile(result);
            }
            
        }
        
        load();
      }, []);

    if (!activeGroup) {
        return <DashboardEmptyState />;
    }

    if (isLoading || !data) {
        return (
            <Box sx={{ p: 3 }}>
            <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }} className="mainComponentPanel">
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
            Dashboard — {activeGroup.name}
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

const DashboardEmptyState = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ mt: 4, ml: 6, width: "75%" }}>
      <Card>
        <CardContent>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Welcome to forWriters ✍️
          </Typography>

          <Typography sx={{ mb: 2 }}>
            To get started, join an existing writing group or create your own.
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              onClick={() => navigate("/groupsearch")}
            >
              Join a group
            </Button>

            <Button
              variant="outlined"
              onClick={() => navigate("/creategroup")}
            >
              Start a group
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
