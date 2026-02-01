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
    const navigate = useNavigate();
    const { user, isLoading: isUserLoading } = useUserContext();
    const { getUserProfile, updateUserProfile } = useUserDomain(user);
    const { activeGroup } = useGroupContext(); // { id, name, role } | null
    const { data, isError, isLoading, mutate } = useDashboard(activeGroup?.id ?? null);
    console.log('data', data)
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
    
    //let userProfile: UserProfile | undefined = undefined;

    useEffect(() => {
        const load = async() => {
            const result = await getUserProfile();
            if(userProfile){
                setUserProfile(result);
            }
        }
        load();
      }, []);

    if (isUserLoading || isLoading) {
    return (
      <Box sx={{ p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }
    // const onSubmit = async(data: ProfileFormInputs) => {
    //     const firstName: string = data.firstName;
    //     const lastName: string = data.lastName;
    //     const results: Response = await updateUserProfile(user.id, firstName, lastName);
    //     const userProfile = await results.json();
    //     if(results.status !== 500){
    //         alert("Profile saved successfully!");
    //     } else if (results.status === 500){
    //         alert("The profile was not saved due to an error");
    //     }
    // }

       
        return(
            <Box>
                {/* {!data ?.group ? ( */}
                {!data ? (
                    <Box sx={{mt: 4, ml: 6, width:"75%"}}>
                        <Box sx={{ p: 3, gap: 1  }}>
                            <Typography variant="h5" sx={{ mb: 1, fontWeight: 700 }}>
                            Welcome
                            </Typography>
                            <Typography sx={{ mb: 2 }}>
                            To get started, join a writing group or create your own. 
                            </Typography>
                            <Button variant="contained" onClick={() => navigate("/groupsearch")}  sx={{mr: 2}}>
                                Join a group
                            </Button>
                            <Button variant="outlined" onClick={() => navigate("/creategroup")}>
                                Start a group
                            </Button> 
                        </Box>
                    </Box>
                    
                ) : (
                <Box sx={{ p: 3 }} className="mainComponentPanel">
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
                    Dashboard — {data.group!.name}
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
                )}
            </Box>
            
        )
} 