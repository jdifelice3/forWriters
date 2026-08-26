import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { mutate } from "swr";
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
import { UserProfile, Group } from "../types/domain-types";
import { useNavigate } from "react-router-dom";
import { useDashboard } from "../hooks/useDashboard";
import { useGroupContext } from "../context/GroupContextProvider";
import AttentionCard from "../components/dashboard/AttentionCard";
import UpcomingCard from "../components/dashboard/UpcomingCard";
import ResumeCard from "../components/dashboard/ResumeCard";
import { ProfileFormInputs } from "../types/UserTypes";
import { useUserContext } from "../context/UserContext";
import { useUserDomain } from "../hooks/useUserDomain";
import { useGroupInvite } from "../hooks/useGroup";
import { GroupSummary } from '../types/ContextTypes';
import { useGroupDetails } from "../hooks/useGroup";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";


type UserProfileInput = {
    firstName: string;
    lastName: string
}

export default function Dashboard() {
    const [userProfile, setUserProfile] = useState<UserProfileInput>({firstName: "", lastName: ""});

    const groupInvite = useGroupInvite(); 
    const navigate = useNavigate();
    const { setActiveGroup } = useGroupContext();
    const { user, isLoading: isUserLoading } = useUserContext();
    const { getUserProfile, updateUserProfile } = useUserDomain(user);
    const { activeGroup } = useGroupContext(); // { id, name, role } | null
    const { data, isLoading } = useDashboard(activeGroup?.id ?? null);

    const readingNotificationReadingId = sessionStorage.getItem("readingNotificationReadingId");
    const readingNotificationGroupId = sessionStorage.getItem("readingNotificationGroupId");
    console.log('readingNotificationReadingId', readingNotificationReadingId);
    console.log('readingNotificationGroupId', readingNotificationGroupId);
    const groupId: string | undefined = readingNotificationGroupId === null ? undefined : readingNotificationGroupId;

    const { data : group, isLoading: isGroupLoading } = useGroupDetails<Group>(groupId);
    
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
        const groupInviteGroupId = sessionStorage.getItem("groupInviteGroupId");
        
        const load = async() => {
            if(groupInviteGroupId){
                const completeResponse = await groupInvite.completeInvite();
                mutate(
                    key => typeof key === "string" && key.includes("/api/groups/"),
                    undefined,
                    { revalidate: false }
                );

                const groupSummary: GroupSummary = {  
                    id: completeResponse.groupId,
                    name: completeResponse.name,
                    role: completeResponse.role,
                    groupType: completeResponse.groupType
                }
                setActiveGroup(groupSummary);
                sessionStorage.removeItem("groupInviteGroupId");
                navigate(`/groups/${groupInviteGroupId}`);
            } else if(readingNotificationReadingId !== null) {
                if (isGroupLoading) return;
                console.log('in dashboard, reading notification');
                mutate(
                    key => typeof key === "string" && key.includes("/api/groups/"),
                    undefined,
                    { revalidate: false }
                );
                console.log('group', group);
                if(group){
                    const groupSummary: GroupSummary = {  
                        id: group.id,
                        name: group.name,
                        role: group.groupUser[0].role,
                        groupType: group.groupType,
                        creatorUserId: group.creatorUserId
                    }
                    setActiveGroup(groupSummary);
                    sessionStorage.removeItem("readingNotificationReadingId");
                    sessionStorage.removeItem("readingNotificationGroupId");
                    navigate(`/filefeedback/${readingNotificationReadingId}`)
                }
            } else {
                const result = await getUserProfile();
                if(userProfile){
                    setUserProfile(result);
                }
            }
        }
        
        load();
      }, [isGroupLoading]);

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
        <>
        <Box sx={{ p: 3 }} className="mainComponentPanel">
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
                Dashboard — {activeGroup.name}
            </Typography>
            <Grid container spacing={2}>
            <Grid size={12}>
                <Card
                  elevation={0}
                  sx={{
                    overflow: "hidden",
                    borderRadius: 3,
                    color: "#f7faf7",
                    background:
                      "radial-gradient(circle at 90% 0%, rgba(146, 186, 157, .32), transparent 32%), linear-gradient(135deg, #17271d, #315b42)",
                  }}
                >
                  <CardContent sx={{ p: { xs: 3, md: 4 }, "&:last-child": { pb: { xs: 3, md: 4 } } }}>
                    <Stack
                      direction={{ xs: "column", md: "row" }}
                      alignItems={{ xs: "flex-start", md: "center" }}
                      justifyContent="space-between"
                      spacing={3}
                    >
                      <Box sx={{ maxWidth: 660 }}>
                        <Typography
                          sx={{
                            color: "#b7d0be",
                            fontSize: 11,
                            fontWeight: 800,
                            letterSpacing: 1.4,
                            textTransform: "uppercase",
                          }}
                        >
                          New working workflow
                        </Typography>
                        <Typography
                          variant="h4"
                          sx={{ mt: 0.75, mb: 1, fontFamily: "Georgia, serif", fontWeight: 700 }}
                        >
                          Enter Critique Studio
                        </Typography>
                        <Typography sx={{ color: "#d7e5db", lineHeight: 1.6 }}>
                          Submit a manuscript, assign reviewers, and explore persisted feedback
                          for {activeGroup.name} in one connected workspace.
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        size="large"
                        startIcon={<AutoStoriesRoundedIcon />}
                        endIcon={<ArrowForwardRoundedIcon />}
                        onClick={() => navigate(`/groups/${activeGroup.id}/critique`)}
                        sx={{
                          flexShrink: 0,
                          borderRadius: 2,
                          bgcolor: "#f4f8f5",
                          color: "#264933",
                          textTransform: "none",
                          boxShadow: "none",
                          "&:hover": { bgcolor: "white", boxShadow: "none" },
                        }}
                      >
                        Open Studio
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
            </Grid>
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
        </>
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
