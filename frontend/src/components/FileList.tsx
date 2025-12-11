"use client";

import { useState } from "react";
import { FileListProperties } from '../types/File';
import { AppFile } from "../types/domain-types";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
} from "@mui/material";
import FileIcon from './FileIcon';
import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import PreviewIcon from "@mui/icons-material/Preview";

interface FileListProps {
  files: AppFile[];
  onSendData: (data: AppFile[]) => void;
  fileListProperties: FileListProperties;
}

const FileList: React.FC<FileListProps> = ({files, onSendData, fileListProperties}) => {
  
  const [editFile, setEditFile] = useState<AppFile | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [previewFile, setPreviewFile] = useState<AppFile | null>(null);

  const filesUrl = `${import.meta.env.VITE_API_HOST}/api/files`;
  const pdfsUrl = `${import.meta.env.VITE_API_HOST}/api/pdfs`;
  
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
      
      setEditFile(null);
      onSendData(files);
    } catch (err) {
      console.error(err);
      alert("Failed to update file metadata");
    }
  };

  // Delete file
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this file?")) return;
    try {
      const res = await fetch(`${filesUrl}?id=${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete file");
      onSendData(files);
    } catch (err) {
      console.error(err);
      alert("Failed to delete file");
    }
  };

  return (
    <div>
    {files.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No files uploaded yet.
        </Typography>
      ) : (
        <Grid container spacing={2}>
            
          {files.map((f) => (
            <Stack spacing={2} sx={{width:"500px"}}> 
            <Card>
                <CardContent>
                  <Stack direction="row" alignItems="center" gap={1} mb={1}>
                    <FileIcon file={f} />
                    <Typography variant="subtitle1" fontWeight="bold">
                      {f.title}
                    </Typography>
                  </Stack>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {f.description || "No description"}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Uploaded on {new Date(f.uploadedAt).toLocaleDateString()}
                  </Typography>
                </CardContent>
                <CardActions>
                  {fileListProperties.showPreviewButton ? (
                  <Button
                    size="small"
                    startIcon={<PreviewIcon />}
                    onClick={() => setPreviewFile(f)}
                    disabled={f.mimetype === "DOCX"}
                  >
                    Preview
                  </Button>
                  ) : (
                    <div></div>   
                  )}
                  <Button component="a" href={f.url} download={f.filename} size="small">
                    {fileListProperties.buttonDownloadText}
                  </Button>
                  {fileListProperties.showEditButton ? (
                  <IconButton onClick={() => handleEdit(f)} size="small">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  ) : (
                    <div></div>
                  )}
                  {fileListProperties.showDeleteButton ? (
                  <IconButton
                    onClick={() => handleDelete(f.id)}
                    size="small"
                    color="error"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                  ) : (
                    <div></div>
                  )}
                </CardActions>
              </Card>
            </Stack>
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
            ) : previewFile.mimetype.startsWith("application/pdf") || previewFile.mimetype.startsWith("PDF") ? (
              <iframe
                src={`${import.meta.env.VITE_API_HOST}/api/files/${previewFile.id}/download`}
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
    </div>
  )
}

export default FileList; 