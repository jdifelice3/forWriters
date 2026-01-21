"use client";
import { mutate } from "swr";
import * as React from "react";

import { Group, GroupRole } from "../types/domain-types";
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
  Popover
} from "@mui/material";
import Grid from "@mui/material/Grid"; // legacy grid (item/container)
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import type { Resolver } from "react-hook-form";
import KeyIcon from '@mui/icons-material/Key';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import InfoIcon from '@mui/icons-material/Info';
import { useGroupContext } from "../context/GroupContextProvider";
import { GroupSummary } from "../types/ContextTypes";


// -------------------------
// Zod schema (client-side)
// -------------------------
const addressSchema = z.object({
  street: z.string().min(1, "Street is required").optional().or(z.literal("")),
  city: z.string().min(1, "City is required").optional().or(z.literal("")),
  state: z.string().min(2, "State is required").max(2, "Use 2-letter code").optional().or(z.literal("")),
  zip: z.string().min(5, "ZIP is required").max(10, "Invalid ZIP").optional().or(z.literal("")),
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

const groupsUrl = `${import.meta.env.VITE_API_HOST}/api/groups`;

const styles = {
    marginLeft: '75px' // or a responsive value
};

const GroupsCreate = () => {
  const navigate = useNavigate();
  const { setActiveGroup } = useGroupContext();
  const [groupType, setGroupType] = React.useState("WRITING");
  const [anchorEl, setAnchorEl] = React.useState(null);
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

    const handleRadioButtons = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGroupType(event.target.value);
    };

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget); // Set anchor to the clicked button
    };

    const handleClose = () => {
        setAnchorEl(null); // Close the popover
    };
  
  const onSubmit = async (values: CreateGroupInput) => {
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch(groupsUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ 
            name: values.name,
            groupType: groupType,
            description: values.description,
            imageUrl: values.imageUrl,
            address: values.address,
            defaultMinDaysBetweenReads: values.defaultMinDaysBetweenReads,
            defaultMaxConsecutiveReads: values.defaultMaxConsecutiveReads,
            inviteEmailsCsv: values.inviteEmailsCsv
        }),
      });

    if (!res.ok) {
        const text = await res.text();
        console.log(text)
        let message = JSON.parse(text);
        console.log(message)
        setError(message.error);
        return;
    }

        const group: Group = await res.json();
        setSuccess("Group created successfully.");
        const g: GroupSummary = getGroupSummary(group);
        const admin: GroupRole = "ADMIN";
        mutate(
            `/me/groups`,
            (prev: GroupSummary[] | undefined) =>
                prev
                ? [...prev, { id: group.id, name: group.name, groupType: group.groupType, role: admin }]
                : [{ id: group.id, name: group.name, groupType: group.groupType, role: admin }],
            false // 👈 do NOT revalidate yet
        );
        navigate(`/groups/${group.id}`);
    } catch (e: any) {
      setError(e?.message ?? "Failed to create group");
    } finally {
      setSubmitting(false);
    }
  };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

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
        <CardHeader title="Group Details" sx={{mb:-2}}/>
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

            <Box 
                component="form" 
                onSubmit={handleSubmit(onSubmit)} 
                noValidate
                
            >
            <Grid container spacing={2}>
              <Grid size={12}>
                <Typography variant="h6" sx={{ mt: 1 }}>
                  Group Type<InfoIcon style={{ cursor: 'pointer' }} onClick={handleClick}/>
                </Typography>
                <RadioGroup
                    name="groupType" 
                    value={groupType} 
                    onChange={handleRadioButtons} 
                >
                    <FormControlLabel value="WRITING" control={<Radio />} label="Writing Group"/>
                    <FormControlLabel value="PERSONAL" control={<Radio />} label="Personal" />
                </RadioGroup>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    >
                    <Typography sx={{ p: 2 }}>
                        <div style={{fontWeight: "bold", fontSize: "14pt"}}>GroupTypes</div>
                        <div>&nbsp;</div>
                        <span style={{fontWeight: "bold"}}>Writing Group</span>
                        <ul>
                            <li>The group has multiple authors as members.</li>
                            <li>Multiple authors can submit manuscripts to one or more readings for feedback.</li>
                            <li>The group has an administrator who creates scheduled readings as well as group news posts.</li>
                            <li>The group is visible to a group search.</li>
                            
                        </ul>
                        <span style={{fontWeight: "bold"}}>Personal Group</span>
                        <ul>
                            <li>The group has one author. This author is the group administator.</li>
                            <li>The author is the only one who can submit manscripts to a reading.</li>
                            <li>The group is not visible to a group search.</li>
                        </ul>
                        <span style={{fontWeight: "bold"}}>Both</span>
                        <ul>
                            <li>The group administrator can invite members and non-members to join the group.</li>
                            <li>The administator must approve requests to join the group.</li>
                        </ul>
                        <Button onClick={handleClose}>Close</Button>
                    </Typography>                
                </Popover>
              
              </Grid>
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
            <Grid container 
                sx={{ display: groupType === "WRITING" ? 'block' : 'none', width: "100%" }}
            >
              <Grid size={12}>
                <Typography variant="h6" sx={{ mt: 1 }}>
                  Address
                </Typography>
              </Grid>

              <Grid size={12}>
                <TextField
                    label="Street"
                    fullWidth
                    {...register("address.street")}
                    error={!!errors.address?.street}
                    helperText={errors.address?.street?.message}
                    sx={{mt:2}}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  label="City"
                  fullWidth
                  {...register("address.city")}
                  error={!!errors.address?.city}
                  helperText={errors.address?.city?.message}
                  sx={{mt:2}}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  label="State"
                  fullWidth
                  inputProps={{ maxLength: 2 }}
                  {...register("address.state")}
                  error={!!errors.address?.state}
                  helperText={errors.address?.state?.message}
                  sx={{mt:2, width: "25%"}}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  label="ZIP"
                  fullWidth
                  {...register("address.zip")}
                  error={!!errors.address?.zip}
                  helperText={errors.address?.zip?.message}
                  sx={{mt:2, width: "50%"}}
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
                  sx={{mt:2}}
                />
              </Grid>
              </Grid>
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

const getGroupSummary = (group: Group): GroupSummary => {
    return {
        id: group.id,
        name: group.name,
        role: "ADMIN",
        groupType: group.groupType
    }
}

export default GroupsCreate;