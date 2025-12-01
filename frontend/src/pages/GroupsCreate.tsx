"use client";

import * as React from "react";
import { GroupCreate } from "../../../backend/src/domain-types";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import Grid from "@mui/material/Grid"; // legacy grid (item/container)
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import type { Resolver } from "react-hook-form";
import KeyIcon from '@mui/icons-material/Key';

// -------------------------
// Zod schema (client-side)
// -------------------------
const addressSchema = z.object({
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(2, "State is required").max(2, "Use 2-letter code"),
  zip: z.string().min(5, "ZIP is required").max(10, "Invalid ZIP"),
});

const createGroupSchema = z.object({
  name: z.string().min(2, "Group name is required"),
  description: z.string().optional(),
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  groupType: z.string(),
  address: addressSchema,
  // Optional policy defaults the app might use for reading events
  defaultMinDaysBetweenReads: z.coerce.number().int().min(0).default(20),
  defaultMaxConsecutiveReads: z.coerce.number().int().min(1).default(1),
  // Optional: comma-separated list of emails to invite as members/admins
  inviteEmailsCsv: z.string().optional(),
});

type CreateGroupInput = z.infer<typeof createGroupSchema>;

const groupsUrl = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/groups`;

const styles = {
    marginLeft: '75px' // or a responsive value
};

const GroupsCreate = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateGroupInput>({
    resolver: zodResolver(createGroupSchema) as Resolver<CreateGroupInput>,
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
      groupType: "WRITING",
      address: { street: "", city: "", state: "", zip: "" },
      defaultMinDaysBetweenReads: 20,
      defaultMaxConsecutiveReads: 1,
      inviteEmailsCsv: "",
    },
  });

  const onSubmit = async (values: CreateGroupInput) => {
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch(groupsUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to create group");
      }

      const group: GroupCreate = await res.json();
      setSuccess("Group created successfully.");
      // Navigate to the new group's page (adjust route as needed)
      setTimeout(() => navigate(`/groups/${group.id}`), 600);
    } catch (e: any) {
      setError(e?.message ?? "Failed to create group");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
        style={styles}  
        sx={{ 
        maxWidth: 900, 
        mx: "auto", 
        p: 4,
      }}>
      <Typography variant="h4" mb={3}>
        <KeyIcon 
              sx={{ 
                fontSize: '48px',
                verticalAlign: "bottom", 
              }}
            />&nbsp;
        Start a Group
      </Typography>

      <Card>
        <CardHeader title="Group Details" />
        <CardContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid container spacing={2}>
              <Grid size={12}>
                <TextField
                  label="Group Name"
                  fullWidth
                  required
                  {...register("name")}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={3}
                  {...register("description")}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  label="Image URL (optional)"
                  fullWidth
                  placeholder="https://..."
                  {...register("imageUrl")}
                  error={!!errors.imageUrl}
                  helperText={errors.imageUrl?.message}
                />
              </Grid>

              <Grid size={12}>
                <Typography variant="h6" sx={{ mt: 1 }}>
                  Address
                </Typography>
              </Grid>

              <Grid size={12}>
                <TextField
                  label="Street"
                  fullWidth
                  required
                  {...register("address.street")}
                  error={!!errors.address?.street}
                  helperText={errors.address?.street?.message}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  label="City"
                  fullWidth
                  required
                  {...register("address.city")}
                  error={!!errors.address?.city}
                  helperText={errors.address?.city?.message}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  label="State"
                  fullWidth
                  required
                  inputProps={{ maxLength: 2 }}
                  {...register("address.state")}
                  error={!!errors.address?.state}
                  helperText={errors.address?.state?.message}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  label="ZIP"
                  fullWidth
                  required
                  {...register("address.zip")}
                  error={!!errors.address?.zip}
                  helperText={errors.address?.zip?.message}
                />
              </Grid>

              <Grid size={12}>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Reading Policy Defaults (optional)
                </Typography>
              </Grid>

              <Grid size={12}>
                <TextField
                  type="number"
                  label="Min number of days a member must wait before signing up for another reading"
                  fullWidth
                  {...register("defaultMinDaysBetweenReads")}
                  error={!!errors.defaultMinDaysBetweenReads}
                  helperText={errors.defaultMinDaysBetweenReads?.message}
                />
              </Grid>
              {/* <Grid size={12}>
                <TextField
                  type="number"
                  label="Max number of contiguous readings for a member"
                  fullWidth
                  {...register("defaultMaxConsecutiveReads")}
                  error={!!errors.defaultMaxConsecutiveReads}
                  helperText={errors.defaultMaxConsecutiveReads?.message}
                />
              </Grid> */}

              {/* <Grid size={12}>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Initial Invites (optional)
                </Typography>
                <TextField
                  label="Member Emails (comma-separated)"
                  placeholder="alice@example.com, bob@example.com"
                  fullWidth
                  {...register("inviteEmailsCsv")}
                  error={!!errors.inviteEmailsCsv}
                  helperText={errors.inviteEmailsCsv?.message}
                />
              </Grid> */}

              <Grid size={12}>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<AddIcon />}
                  disabled={submitting}
                >
                  {submitting ? <CircularProgress size={22} /> : "Create Group"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default GroupsCreate;