"use client";

import { useState } from "react";
import { User } from "../types/UserTypes";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  Divider,
  CircularProgress,
} from "@mui/material";
import FileUploadField from "./FileUploadField";
import { useForm, Controller } from "react-hook-form";
import { updateUserProfile, getUserProfile } from "../services/srvUserProfiles";
import { useEffect } from 'react';
import Session from "supertokens-auth-react/recipe/session";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { ProfileFormInputs } from "../types/UserTypes";

import "../assets/css/workspace-pages.css";

const UserProfile = () => {
    const [userId, setUserId] = useState<string>("");
    const [loading, setLoading] = useState(true);

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
        const fetchUserId = async() => {
        const exists = await Session.doesSessionExist();

        if (!exists) {
            console.log('session does not exist');
            setUserId("");
            setLoading(false);
            return;
        }

        const authId = await Session.getUserId();
        const user: User = await getUserProfile(authId);
        setUserId(user.id);
        reset({ 
            firstName: user.userProfile.firstName, 
            lastName: user.userProfile.lastName,
            email: user.email,
            bio: user.userProfile.bio
        });
        setLoading(false);
    }
    fetchUserId();
  }, [reset]);

  if (loading) {
    return (
      <Box className="workspace-loading">
        <CircularProgress size={24} />
        <Typography>Loading your profile…</Typography>
      </Box>
    );
  }

  if (!userId) {
    return <Box className="workspace-empty-state"><Typography>No active session.</Typography></Box>;
  }


  const onSubmit = async(data: ProfileFormInputs) => {
    //const userId: string = userId;
    const firstName: string = data.firstName;
    const lastName: string = data.lastName;
    const bio: string = data.bio ? data.bio : '';
    const results: Response = await updateUserProfile(userId, firstName, lastName, bio);

    if(results.status !== 500){
      alert("Profile saved successfully!");
    } else if (results.status === 500){
      alert("The profile was not saved due to an error");
    }
    // reset({
    //     firstName: "",
    //     lastName: "",
    //     email: "",
    //     bio: "",
    //     title: "",
    //     description: "",
    //     avatar: undefined,
    // });
  };

  return (
    <Box className="workspace-page profile-workspace">
      <Box className="workspace-page-header">
        <Box>
          <Typography className="workspace-eyebrow">Account</Typography>
          <Typography component="h1">Your profile</Typography>
          <Typography className="workspace-page-lede">
            Keep your name, photo, and writer bio current for the groups you join.
          </Typography>
        </Box>
      </Box>
      <Box
        className="workspace-surface profile-form-panel"
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box className="workspace-section-heading">
          <Box>
            <Typography component="h2">Profile details</Typography>
            <Typography>This information helps other writers recognize you.</Typography>
          </Box>
          <AccountCircleRoundedIcon />
        </Box>
        <Stack spacing={2.25}>
        {/* Avatar upload */}
        <Controller
            name="avatar"
            control={control}
            render={({ field: { onChange } }) => (
                <FileUploadField onChange={onChange} />
            )}
        />
        <Divider />
        {/* Basic info */}
        <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
                <TextField
                    label="First Name"
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
              {...field}
              value={field.value ?? ""}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              fullWidth
            />
          )}
        />

        <Controller
            name="email"
            control={control}
            render={({ field }) => (
                <TextField
                    label="Email"
                    {...field}
                    value={field.value ?? ""}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    fullWidth
                    disabled
                />
            )}
        />

        <Controller
            name="bio"
            control={control}
            render={({ field }) => (
                <TextField
                label="Bio"
                {...field}
                value={field.value ?? ""}
                error={!!errors.bio}
                helperText={errors.bio?.message}
                fullWidth
                multiline
                rows={7}
                />
            )}
        />

        <Button
            variant="contained"
            color="primary"
            type="submit"
            className="workspace-primary-action"
            sx={{ mt: 2, alignSelf: "flex-end" }}
        >
            Save Changes
        </Button>
      </Stack>
      </Box>
    </Box>
  );
}

export default UserProfile;
