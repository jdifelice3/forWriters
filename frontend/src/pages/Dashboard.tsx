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
                        groupType: group.groupType
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
