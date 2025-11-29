"use client";

import React, { useState } from "react";
import { useUserContext } from "../context/UserContext";
import { UploadFileFormProperties } from "../types/File";
import { AppFile } from "../../../backend/src/domain-types";
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
  onSendData: (data: AppFile, readingId?: string) => void;
  formProperties: UploadFileFormProperties;
  readingId?: string;
  isUserDisabled?: boolean;
  hasUserSubmitted?: boolean;
  readingAuthorId?: string;
}

const UploadFileForm: React.FC<UploadFileProps> = ({
    onSendData, 
    formProperties, 
    readingId, 
    isUserDisabled=false, 
    hasUserSubmitted=false,
    readingAuthorId,
  }) => {
  const { user } = useUserContext();

  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [additionalFeedback, setAdditionalFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  let filesUrl = "";
  if(!readingAuthorId) {
    filesUrl = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/files`;
  } else {
    filesUrl = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/files/ra/${readingAuthorId}`;
  }
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
      formData.append("additionalFeedback", additionalFeedback.replace(/\r\n/g,"\n"));
  
      try {
        const res = await fetch(filesUrl, {
          method: "POST",
          body: formData,
          credentials: "include",
        });
  
        if (!res.ok) throw new Error("Upload failed");
          const file: AppFile = await res.json();
          setFile(null);
          setTitle("");
          setDescription("");
          if(readingId){
            onSendData(file, readingId);
          } else {
            onSendData(file);
          }
      } catch (err) {
          console.error(err);
          alert("Failed to upload file");
      } finally {
          setLoading(false);
          alert("Your file has been uploaded")
      }
    };

  return (
    <div>
        <Typography variant={formProperties.titleVariant} mb={1} textAlign="center">
            {(() => {
                if (formProperties.title.length > 0) {
                    return formProperties.title;
                }
            })()}
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
                        {readingAuthorId ? (
                            <Grid size={12}>
                                <TextField
                                    label="Additional Feedback"
                                    value={additionalFeedback}
                                    sx={{width: "740px"}}
                                    multiline
                                    rows={6} // Sets the initial number of visible rows
                                    placeholder="Additional feedback (optional)"
                                    fullWidth
                                />
                            </Grid>
                        ) : (
                            <div></div>
                        )}

                        <Grid size={3}>
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
                        <Grid size={9}>
                            {hasUserSubmitted ? (
                                <Typography sx={{color: "green", fontWeight: "bold"}}>You have submitted feedback for this story</Typography>
                            ) : (
                                <div></div>
                            )}
                        </Grid>
                    </Grid>
                </Box>
            </CardContent>
    </Card>
    </div>
    )
}

export default UploadFileForm;