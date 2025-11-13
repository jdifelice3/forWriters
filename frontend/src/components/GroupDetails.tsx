import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Avatar,
  Link,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

interface GroupDetailsProps {
  group: any;
  isAdmin: boolean;
}

export const GroupDetails: React.FC<GroupDetailsProps> = ({ group, isAdmin }) => {
  
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: group.name || "",
    imageUrl: group.imageUrl || "",
    street: group.groupsAddresses[0].street || "",
    city: group.groupsAddresses[0].city || "",
    state: group.groupsAddresses[0].state || "",
    zip: group.groupsAddresses[0].zip || "",
  });


  const [saving, setSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/groups/${group.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to save");
      setEditing(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save group details");
    } finally {
      setSaving(false);
    }
  };

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${form.street}, ${form.city}, ${form.state} ${form.zip}`
  )}`;

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h6" mb={2}>
          Group Details
        </Typography>

        {isAdmin && !editing && (
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => setEditing(true)}
            sx={{ mb: 2 }}
          >
            Edit
          </Button>
        )}

        <Grid container spacing={2}>
          <Grid size={12}>
            <Avatar
              src={form.imageUrl}
              alt={form.name}
              sx={{ width: 120, height: 120 }}
            />
          </Grid>

          <Grid size={12}>
            <TextField
              label="Group Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              disabled={!isAdmin || !editing}
              sx={{ mb: 2 }}
            />

            {["street","city", "state", "zip"].map((field) => (
              <TextField
                key={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                name={field}
                value={(form as any)[field]}
                onChange={handleChange}
                fullWidth
                disabled={!isAdmin || !editing}
                sx={{ mb: 2 }}
              />
            ))}

            {isAdmin && editing && (
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? <CircularProgress size={20} /> : "Save"}
              </Button>
            )}
          </Grid>
        </Grid>

        {!isAdmin && (
          <Box mt={2}>
            <Link href={mapUrl} target="_blank" rel="noopener">
              View on Google Maps
            </Link>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
