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
            console.log('in useEffect')
            console.log('userProfile', userProfile)
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
    const onSubmit = async(data: ProfileFormInputs) => {
        const firstName: string = data.firstName;
        const lastName: string = data.lastName;
        const results: Response = await updateUserProfile(user.id, firstName, lastName);
        const userProfile = await results.json();
        if(results.status !== 500){
            alert("Profile saved successfully!");
        } else if (results.status === 500){
            alert("The profile was not saved due to an error");
        }
    }

    if ( !data?.group && userProfile.firstName === "") {
        // onboarding / no-group state
        return (
        <>
        <Box sx={{ maxWidth: 750, mx: "auto", p: 4}}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
        >    
            <Box>
                <Typography variant="h5" sx={{ mb: 1, fontWeight: 700 }}>
                    Welcome for forWriters!
                </Typography>
                <Typography sx={{ mb: 2 }}>
                    Please enter your first and last name.
                </Typography>
                <Stack spacing={2}>
                    
                    {/* Basic info */}
                    <Controller
                        name="firstName"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                label="First Name"
                                required
                                {...field}
                                value={field.value ?? ""}
                                error={!!errors.firstName}
                                helperText={errors.firstName?.message}
                                fullWidth
                            />
                        )}
                    />
                    <Controller
                        name="lastName"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                label="Last Name"
                                required
                                {...field}
                                value={field.value ?? ""}
                                error={!!errors.lastName}
                                helperText={errors.lastName?.message}
                                fullWidth
                            />
                        )}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{ mt: 2, alignSelf: "flex-end" }}
                    >
                        Save Changes
                    </Button>
                </Stack>
            </Box>
        </Box>
        </>
        );
    } else if (!data?.group && userProfile){
        return (
            <Box sx={{mt: 4, ml: 6, width:"45%"}}>

                <Typography variant="h5" sx={{ mb: 1, fontWeight: 700 }}>
                    One more thing...
                </Typography>
                <Card sx={{mb: 3}}>
                    <CardContent>
                        <Typography >
                            Find a writing group to join or create your own. This will allow you to review the 
                        </Typography>
                        <Typography>
                            work of other writers and to have your work reviewed.
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{mb: 3}}>
                    <CardContent>
                        <Typography sx={{ mb: 0 }}>
                            When you find a group you like, a request will be sent to the group owner who must
                        </Typography>
                        <Typography sx={{ mb: 0 }}>
                            approve it. While you wait, upload manuscripts by clicking on the "Files"
                        </Typography>
                        <Typography>
                            link on the left-hand-side.
                        </Typography>
                    </CardContent>
                </Card>
                <Box sx={{ display: "flex", gap: 1 }}>
                    <Button variant="contained" onClick={() => navigate("/groupsearch")}>
                        Find a group
                    </Button>
                    <Button variant="outlined" onClick={() => navigate("/creategroup")}>
                        Start a group
                    </Button>   
                </Box>
            </Box>
        )
    } else {
        return (
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
        );
    }
} 