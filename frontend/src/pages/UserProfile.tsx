import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { mutate as mutateCache } from "swr";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import FileUploadField from "./FileUploadField";
import { useUserContext } from "../context/UserContext";
import { updateUserProfile, uploadUserAvatar } from "../services/srvUserProfiles";
import { ProfileFormInputs } from "../types/UserTypes";

import "../assets/css/workspace-pages.css";

const formValues = (
  email = "",
  firstName = "",
  lastName = "",
  bio = ""
): ProfileFormInputs => ({
  firstName,
  lastName,
  email,
  bio,
  title: "",
  description: "",
  avatar: undefined,
});

const UserProfile = () => {
  const { user, isLoading, error: userError, refreshUser } = useUserContext();
  const [avatarUrl, setAvatarUrl] = useState<string>();
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saved, setSaved] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormInputs>({
    defaultValues: formValues(),
  });

  useEffect(() => {
    if (!user) return;
    const profile = user.userProfile;
    reset(formValues(user.email, profile?.firstName, profile?.lastName, profile?.bio));
    setAvatarUrl(profile?.avatarUrl);
  }, [reset, user]);

  if (isLoading) {
    return (
      <Box className="workspace-loading">
        <CircularProgress size={24} />
        <Typography>Loading your profile…</Typography>
      </Box>
    );
  }

  if (userError || !user) {
    return (
      <Box className="workspace-empty-state">
        <Typography>We could not load your profile. Please refresh and try again.</Typography>
      </Box>
    );
  }

  const displayName = [user.userProfile?.firstName, user.userProfile?.lastName]
    .filter(Boolean)
    .join(" ");
  const initials = displayName
    ? displayName
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase()
    : user.email.slice(0, 1).toUpperCase();

  const refreshGroupDetails = async () => {
    const groupPrefix = `${import.meta.env.VITE_API_HOST}/api/groups/`;
    await mutateCache(
      (key) =>
        typeof key === "string" &&
        key.startsWith(groupPrefix) &&
        !key.slice(groupPrefix.length).includes("/"),
      undefined,
      { revalidate: true }
    );
  };

  const onSubmit = async (data: ProfileFormInputs) => {
    setSaving(true);
    setSaveError("");
    setSaved(false);

    try {
      const profile = await updateUserProfile(
        data.firstName,
        data.lastName,
        data.bio ?? ""
      );
      let savedAvatarUrl = profile.avatarUrl ?? avatarUrl;

      if (data.avatar) {
        const avatarResult = await uploadUserAvatar(data.avatar);
        savedAvatarUrl = avatarResult.avatarUrl;
        setAvatarUrl(savedAvatarUrl);
      }

      await refreshUser();
      await refreshGroupDetails();
      reset(formValues(user.email, profile.firstName, profile.lastName, profile.bio));
      setAvatarUrl(savedAvatarUrl);
      setSaved(true);
    } catch (profileError) {
      setSaveError(
        profileError instanceof Error
          ? profileError.message
          : "We could not save your profile. Please try again."
      );
    } finally {
      setSaving(false);
    }
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
          {saveError && <Alert severity="error">{saveError}</Alert>}
          {saved && <Alert severity="success">Your profile has been saved.</Alert>}
          <Controller
            name="avatar"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FileUploadField
                value={value}
                currentImageUrl={avatarUrl}
                initials={initials}
                disabled={saving}
                onChange={(file) => {
                  setSaved(false);
                  onChange(file);
                }}
                onError={setSaveError}
              />
            )}
          />
          <Divider />
          <Controller
            name="firstName"
            control={control}
            rules={{ required: "Enter your first name." }}
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
            rules={{ required: "Enter your last name." }}
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
              <TextField label="Email" {...field} value={field.value ?? ""} fullWidth disabled />
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
                fullWidth
                multiline
                rows={7}
              />
            )}
          />
          <Button
            variant="contained"
            type="submit"
            className="workspace-primary-action"
            disabled={saving}
            startIcon={saving ? <CircularProgress size={16} color="inherit" /> : undefined}
            sx={{ mt: 2, alignSelf: "flex-end" }}
          >
            {saving ? "Saving…" : "Save changes"}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default UserProfile;
