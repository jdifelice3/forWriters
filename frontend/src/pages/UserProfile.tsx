"use client";

import { useState } from "react";
import { User } from "../types/User";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import FileUploadField from "./FileUploadField";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updateUserProfile, getUserProfile } from "../services/srvUserProfiles";
import { useEffect } from 'react';
import Session from "supertokens-auth-react/recipe/session";
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const styles = {
    marginLeft: '75px' // or a responsive value
};

// ----------------------
// 🔒 Zod Schema
// ----------------------
const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  bio: z.string().max(500, "Bio must be under 500 characters").optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  avatar: z
    .instanceof(File)
    .or(z.null())
    .optional(),
});

type ProfileFormInputs = z.infer<typeof profileSchema>;

const UserProfile = () => {
  const [userId, setUserId] = useState<string>("");
  const [preview, setPreview] = useState<string | null>(null);

    const {
    control,
    handleSubmit,
    formState: { errors }, reset,
        } = useForm<ProfileFormInputs>({
            resolver: zodResolver(profileSchema),
            defaultValues: {
                firstName: "",
                lastName: "",
                email: "",
                bio: "",
                title: "",
                description: "",
                avatar: null,
            },
  });

  useEffect(() => {
    const fetchUserId = async() => {
      const authId = await Session.getUserId();
      const user: User = await getUserProfile(authId);
      setUserId(user.id);
      reset({ 
        firstName: user.userProfile.firstName, 
        lastName: user.userProfile.lastName,
        email: user.email,
        bio: user.userProfile.bio
      });
    }
    fetchUserId();
  }, []);


  const onSubmit = async(data: ProfileFormInputs) => {
    //const userId: string = userId;
    const firstName: string = data.firstName;
    const lastName: string = data.lastName;
    const bio: string = data.bio ? data.bio : '';
    const results: Response = await updateUserProfile(userId, firstName, lastName, bio);
    if(results.status === 200){
      alert("Profile saved successfully!");
    } else if (results.status === 500){
      alert(results.json);
    }
  };

  return (
    <Box style={styles} sx={{ maxWidth: 750, mx: "auto", p: 4}}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h4" mb={3}>
        <AccountBoxIcon 
              sx={{ 
                fontSize: '40px',
                verticalAlign: "bottom", 
              }}
            />&nbsp;
            Profile
      </Typography>

      <Stack spacing={2}>
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
              error={!!errors.bio}
              helperText={errors.bio?.message}
              fullWidth
              multiline
              rows={7}
            />
          )}
        />

        <Divider />

        {/* Metadata section */}
        <Typography variant="h6" mt={1}>
          Additional Info
        </Typography>

        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField label="Profile Title" {...field} fullWidth />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              label="Profile Description"
              {...field}
              fullWidth
              multiline
              rows={2}
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
  );
}

export default UserProfile;