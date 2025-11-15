"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
  Typography,
  CircularProgress,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import UploadIcon from "@mui/icons-material/Upload";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CloseIcon from "@mui/icons-material/Close";
import pdfIcon from '../assets/icons/icons8-pdf-48.png';
import wordIcon from '../assets/icons/icons8-word-file-48.png';
import DownloadIcon from '@mui/icons-material/Download';

// interface File {
//   appFileId: string;
//   appFiles: AppFile;
//   eventId: string;
//   id: string;
//   signedAt: string;
//   userId: string;
// }

interface User {
  id: string;
  superTokensId: string ;
  email: string;
  role: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  userProfiles: UserProfiles;
}

interface UserProfiles {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
  bio: string;
}

interface AppFile {
  id: string;
  userId: string;
  title: string;
  description?: string;
  filename: string;
  mimetype: string;
  url: string;
  uploadedAt: string;
  users: User
}

interface Events {
  id: string;
  groupId: string;
  eventType: string;
  eventDate: Date;
  submissionDeadline: string;
  minDaysBetweenReads: string;
  maxConsecutiveReads: string;
  createdAt: Date;
  signups: Signups[]; 
}

interface Signups {
  id: string;
  eventId: string;
  userId: string;
  appFileId: string;
  signedAt: string;
  appFiles: AppFile;

}

const ReadingFeedback = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [file, setFile] = useState<any | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<AppFile[]>([]);
  const [events, setEvents] = useState<Events>();
  const [loading, setLoading] = useState(false);
  const [editFile, setEditFile] = useState<AppFile | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [previewFile, setPreviewFile] = useState<AppFile | null>(null);
  const [eventTitle, setEventTitle] = useState("");
    
  const eventSignupsUrl = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/events/${eventId}/signups`;
  const pdfsUrl = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/pdfs`;
  const filesUrl = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/files`;
  const fileUploadsUrl = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/uploads`;
  
  // Fetch uploaded files
  useEffect(() => {

    (async () => {
      console.log('before the fetch');
      const res = await fetch(eventSignupsUrl, 
      { 
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include"
      });
      
      if (res.ok) {
        const data: Events = await res.json();
        const _eventDate = new Date(data.eventDate).toLocaleDateString('en-US');

        let t = `Current Reading - ${_eventDate}`;
        console.log('title:', t);
        setEventTitle(data.signups.length > 0 ? t : 'Reading')
        if(data.signups.length)
        setEvents(data);
        console.log('event',data)
      }
    })();
  }, []);

  // File upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //if (!file || !title) return alert("Please choose a file and add a title.");

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
        setFiles((prev) => [newFile, ...prev]);
        setFile(null);
        setTitle("");
        setDescription("");
    } catch (err) {
        console.error(err);
        alert("Failed to upload file");
    } finally {
        setLoading(false);
    }
  };

  // 🧠 Choose icon/thumbnail
  const getFileIcon = (f: AppFile) => {
    if (f.mimetype === "PDF") return <img src={pdfIcon} className='icon' alt="PDF" />;
    if (f.mimetype === "DOCX") return <img src={wordIcon} className='icon' alt="DOCX" />;
    if (f.mimetype.startsWith("text/")) return <InsertDriveFileIcon color="primary" />;
    return <InsertDriveFileIcon color="action" />;
  };

  return (
    <Box sx={{ 
        maxWidth: 900, 
        mx: "auto", 
        p: 4,
        marginLeft: "100px",
      }}>
      <Typography variant="h4" mb={3} textAlign="left">
        {eventTitle}
      </Typography>

      {/* Upload form */}

      {/* File list */}
      <Typography variant="h6" mb={2}>
        Manuscripts to Review
      </Typography>

      {!events ? (
        <Typography variant="body1" color="text.secondary">
          No files uploaded yet.
        </Typography>
      ) : (
        <Stack direction="column" alignItems="left" gap={1} my={1}>
          {events.signups.map((f:Signups) => (
            <Grid size={{xs:12, md:6}} key={f.id}>
              <Card>
                <CardContent>
                  <Stack direction="column" alignItems="left" gap={1} my={1}>         
                      <Stack direction="row" alignItems="center" gap={1} mb={1}>
                        {getFileIcon(f.appFiles)}
                        <Typography variant="subtitle1" fontWeight="bold">
                          {f.appFiles.title}
                        </Typography>
                      </Stack>
                    <Typography sx={{verticalAlign: "top"}} variant="body2">
                      by {f.appFiles.users.userProfiles.firstName} {f.appFiles.users.userProfiles.lastName}
                    </Typography>
                  </Stack>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {f.appFiles.description || "No description"}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Uploaded on {new Date(f.appFiles.uploadedAt).toLocaleDateString()}
                  </Typography>
                <CardActions>
                  <Button 
                      href={`${fileUploadsUrl}/${f.appFiles.filename}` } download={f.appFiles.filename} 
                      size="small"
                      sx={{borderColor: "primary.main"}}
                      startIcon={<DownloadIcon />}
                  >
                    Download Manuscript
                  </Button>
                  
                </CardActions>

                  <Divider sx={{ mb: 3 }} />
                  <Typography variant="h6" gutterBottom>
                    Upload the Word Doc for <span className="boldText">{f.appFiles.title}</span> with inline comments
                  </Typography>
                  <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid size={12}>
                        <Button
                          variant="outlined"
                          component="label"
                          startIcon={<UploadIcon />}
                        >
                          {file ? file.name : "Choose File"}
                          <input type="file" hidden onChange={handleFileChange} />
                        </Button>
                      </Grid>
                      <Grid size={12} columns={5}>
                        <TextField
                          label="Additional Comments (Optional)"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
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
                          {loading ? <CircularProgress size={24} /> : "Upload"}
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
      </Card>

            </Grid>
          ))}
        </Stack>
      )}

      {/* Edit dialog */}
      <Dialog open={!!editFile} onClose={() => setEditFile(null)} fullWidth maxWidth="sm">
        <DialogTitle>
          Edit File Metadata
          <IconButton
            onClick={() => setEditFile(null)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            sx={{ mt: 1 }}
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <TextField
            label="Description"
            fullWidth
            sx={{ mt: 2 }}
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            multiline
            rows={3}
          />
        </DialogContent>
      </Dialog>

      {/* Preview dialog */}
      <Dialog
        open={!!previewFile}
        onClose={() => setPreviewFile(null)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {previewFile?.title}
          <IconButton
            onClick={() => setPreviewFile(null)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          {previewFile &&
            (previewFile.mimetype.startsWith("image/") ? (
              <img
                src={previewFile.url}
                alt={previewFile.title}
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            ) : previewFile.mimetype === "application/pdf" || "PDF" ? (
              <iframe
                src={`${pdfsUrl}?url=${previewFile.url}`}
                title="PDF Preview"
                width="100%"
                height="100%"
                style={{ border: "none" }}
              />
            ) : (
              <Typography variant="body1" color="text.secondary">
                Preview not available for this file type.
              </Typography>
            ))}
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default ReadingFeedback;