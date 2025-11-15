"use client";

import React, { useState, useEffect } from "react";
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
  DialogActions,
  Stack,
  Avatar,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import UploadIcon from "@mui/icons-material/Upload";
import DescriptionIcon from "@mui/icons-material/Description";
//import ImageIcon from "@mui/icons-material/Image";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import PreviewIcon from "@mui/icons-material/Preview";
import pdfIcon from '../assets/icons/icons8-pdf-48.png';
import wordIcon from '../assets/icons/icons8-word-file-48.png';

interface AppFile {
  id: string;
  title: string;
  description?: string;
  filename: string;
  mimetype: string;
  url: string;
  uploadedAt: string;
}

const FileManager = () => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<AppFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [editFile, setEditFile] = useState<AppFile | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [previewFile, setPreviewFile] = useState<AppFile | null>(null);

  const filesUrl = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/files`;
  const pdfsUrl = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/pdfs`;
  // 🧩 Fetch uploaded files
  useEffect(() => {
    (async () => {
      const res = await fetch(filesUrl, 
      { 
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include"
      });
      
      if (res.ok) {
        const data = await res.json();
        setFiles(data);
      }
    })();
  }, []);

  // 🧩 File upload
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
        setFiles((prev) => [newFile, ...prev]);
        setFile(null);
        setTitle("");
        setDescription("");
    } catch (err) {
        console.error(err);
        alert("Failed to upload file");
    } finally {
        setLoading(false);
        alert("Your feedback has been uploaded")
    }
  };

  // 🧩 Edit metadata
  const handleEdit = (file: AppFile) => {
    setEditFile(file);
    setEditTitle(file.title);
    setEditDescription(file.description || "");
  };

  const handleSaveEdit = async () => {
    if (!editFile) return;
    try {
      const res = await fetch(`${filesUrl}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          id: editFile.id,
          title: editTitle,
          description: editDescription,
        }),
      });

      if (!res.ok) throw new Error("Failed to update metadata");
      const updated = await res.json();
      setFiles((prev) =>
        prev.map((f) => (f.id === updated.id ? updated : f))
      );
      setEditFile(null);
    } catch (err) {
      console.error(err);
      alert("Failed to update file metadata");
    }
  };

  // 🧩 Delete file
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this file?")) return;
    try {
      const res = await fetch(`${filesUrl}?id=${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete file");
      setFiles((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete file");
    }
  };

  // 🧠 Choose icon/thumbnail
  const getFileIcon = (f: AppFile) => {
    if (f.mimetype.startsWith("image/")) {
      return <Avatar src={f.url} variant="rounded" sx={{ width: 40, height: 40 }} />;
    }
    //if (f.mimetype === "application/pdf") return <DescriptionIcon color="error" />;
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
      <Typography variant="h4" mb={3} textAlign="center">
        📂 Upload and Manage Your Manuscripts
      </Typography>

      {/* Upload form */}
      <Card sx={{ mb: 4, p: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Upload a new manuscript
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
                  {loading ? <CircularProgress size={24} /> : "Upload"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>

      <Divider sx={{ mb: 3 }} />

      {/* File list */}
      <Typography variant="h6" mb={2}>
        Your uploaded manuscripts
      </Typography>

      {files.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No files uploaded yet.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {files.map((f) => (
            <Grid size={{xs:12, md:6}} key={f.id}>
              <Card>
                <CardContent>
                  <Stack direction="row" alignItems="center" gap={1} mb={1}>
                    {getFileIcon(f)}
                    <Typography variant="subtitle1" fontWeight="bold">
                      {f.title}
                    </Typography>
                  </Stack>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 5 }}
                  >
                    {f.description || "No description"}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Uploaded on {new Date(f.uploadedAt).toLocaleDateString()}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    startIcon={<PreviewIcon />}
                    onClick={() => setPreviewFile(f)}
                  >
                    Preview
                  </Button>
                  <Button href={f.url} download={f.filename} size="small">
                    Download
                  </Button>
                  <IconButton onClick={() => handleEdit(f)} size="small">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(f.id)}
                    size="small"
                    color="error"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
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
        <DialogActions>
          <Button startIcon={<SaveIcon />} onClick={handleSaveEdit}>
            Save
          </Button>
        </DialogActions>
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

export default FileManager;