"use client";

import React, { useState } from "react";
import { UploadFileFormProperties } from "../types/FileTypes";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import UploadIcon from "@mui/icons-material/Upload";

interface UploadFileProps {
  onSendData: (data: string) => void;
  formProperties: UploadFileFormProperties;
}

const UploadFileForm: React.FC<UploadFileProps> = ({onSendData, formProperties}) => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const filesUrl = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/files`;

    // File upload
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selected = e.target.files?.[0];
      if (selected) {
        setFile(selected);
      }
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      if (!file || !title) return alert("Please choose a file and add a title.");
  
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);
      formData.append("description", description);
  
      try {
        const res = await fetch(filesUrl, {
          method: "POST",
          body: formData,
          credentials: "include",
        });
  
        if (!res.ok) throw new Error("Upload failed");
          const newFile = await res.json();
          setFile(null);
          setTitle("");
          setDescription("");
          onSendData("reload");
      } catch (err) {
          console.error(err);
          alert("Failed to upload file");
      } finally {
          setLoading(false);
          //alert("Your feedback has been uploaded")
      }
    };

  return (
    <div>
    <Typography variant="h4" mb={3} textAlign="center">
            📂 {formProperties.title}
    </Typography>
    <Card sx={{ mb: 4, p: 2 }}>
        <CardContent>
            <Typography variant="h6" gutterBottom>
            {formProperties.subtitle}
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid size={12}>
                <Button
                    variant="outlined"
                    component="label"
                    startIcon={<UploadIcon />}
                >
                    {file ? file.name : formProperties.buttonChooseFileText}
                    <input type="file" hidden onChange={handleFileChange} />
                </Button>
                </Grid>
                <Grid size={5}>
                <TextField
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    required
                />
                </Grid>
                <Grid size={7}>
                <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                />
                </Grid>
                <Grid size={12}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    startIcon={<UploadIcon />}
                >
                    {loading ? <CircularProgress size={24} /> : formProperties.buttonUploadText}
                </Button>
                </Grid>
            </Grid>
            </Box>
        </CardContent>
    </Card>
    </div>
    )
}

export default UploadFileForm;