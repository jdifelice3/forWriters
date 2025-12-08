import React, { useState } from "react";
import { GroupBasic } from "../types/domain-types";
import {
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Avatar,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import UrlList from "./UrlList";

interface GroupDetailsProps {
  group: GroupBasic;
}

interface FormType {
    name: string;
    imageUrl: string;
    websiteUrl: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    addressId: string;
    description: string;
}

const groupsUrl = `${import.meta.env.VITE_API_HOST}/api/groups`;

export const GroupDetailsAdmin: React.FC<GroupDetailsProps> = ({ group }) => {
  
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: group.name || "",
    imageUrl: group.imageUrl || "",
    websiteUrl: group.websiteUrl || "",
    street: group.groupAddress[0].street || "",
    city: group.groupAddress[0].city || "",
    state: group.groupAddress[0].state || "",
    zip: group.groupAddress[0].zip || "",
    addressId: group.groupAddress[0].id,
    description: group.description || ""
  });


  const [saving, setSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${groupsUrl}/${group.id}`, {
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


  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h6" mb={2}>
          Group Details
        </Typography>

        {!editing && (
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
              disabled={!editing}
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
                disabled={!editing}
                sx={{ mb: 2 }}
              />
            ))}
              <TextField
                label="Description"
                name={"description"}
                value={form.description}
                onChange={handleChange}
                fullWidth
                disabled={!editing}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Website"
                name={"websiteUrl"}
                value={form.websiteUrl}
                onChange={handleChange}
                fullWidth
                disabled={!editing}
                sx={{ mb: 2 }}
              />
              <UrlList isDisabled={!editing}/>
            {editing && (
              <div>
              <div>&nbsp;</div>

              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? <CircularProgress size={20} /> : "Save"}
              </Button>
              &nbsp;&nbsp;
              <Button
                variant="contained"
                startIcon={<CancelIcon />}
                onClick={() => setEditing(false)}
              >
                Cancel
              </Button>
              </div>
            )}
          </Grid>
        </Grid>

      </CardContent>
    </Card>
  );
};
