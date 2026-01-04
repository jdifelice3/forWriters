"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import CloseIcon from "@mui/icons-material/Close";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";

import { AppFileMeta } from "../types/domain-types";
import { FileDomainCommands, FileListProperties } from "../types/FileTypes";
import FileManagerList from "../components/file/lists/FileManagerList";
import UploadFileDataManuscript from "../components/file/data/UploadFileDataManuscript";
import UploadFileDataVersion from "../components/file/data/UploadFileDataVersion";
import { useFiles, useFilesData } from "../hooks/useFile";
import { FilesAPI } from "../api/filesApi";

const filesUrl = `${import.meta.env.VITE_API_HOST}/api/filesApi`;

const manuscriptListProperties: FileListProperties = {
  showPreviewButton: true,
  buttonDownloadText: "DOWNLOAD",
  showDeleteButton: true,
  showEditButton: true,
  showVersionHistory: true,
};

const feedbackListProperties: FileListProperties = {
  showPreviewButton: true,
  buttonDownloadText: "DOWNLOAD",
  showDeleteButton: false,
  showEditButton: false,
  showVersionHistory: false,
};

const FileManager = () => {
  const [tab, setTab] = useState(0);

  // dialog state
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [versionDialogOpen, setVersionDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [targetFileMetaId, setTargetFileMetaId] = useState<string | null>(null);

  const { files, isLoading, mutate } = useFiles(filesUrl);
  const { myManuscripts, myFeedbackDocuments } = useFilesData(files);

  /**
   * ============================
   * DOMAIN COMMAND IMPLEMENTATION
   * ============================
   */
  const domain: FileDomainCommands = {
    async saveMetadata({ fileMetaId, title, description }) {
      const res = await fetch(filesUrl, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: fileMetaId, title, description }),
      });

      if (!res.ok) throw new Error("Failed to update metadata");
      await mutate();
    },

    async deleteFile(fileMetaId: string) {
      const res = await fetch(`${filesUrl}?id=${fileMetaId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to delete file");
      await mutate();
    },

    async uploadVersion(fileMetaId: string, file: File) {
        setTargetFileMetaId(fileMetaId);
        setVersionDialogOpen(true);
    //   await FilesAPI.uploadVersion(fileMetaId, file);
    //   await mutate();
    },

    async setActiveVersion(fileMetaId: string, version: number) {
      await FilesAPI.updateVersion(fileMetaId, version);
      await mutate();
    },
  };

  /**
   * ============================
   * UI ADAPTERS (EVENT-BASED)
   * ============================
   */

  const beginUploadNewVersion = (fileMetaId: string) => {
    setTargetFileMetaId(fileMetaId);
    setVersionDialogOpen(true);
  };

  const confirmDelete = (fileMetaId: string) => {
    setTargetFileMetaId(fileMetaId);
    setDeleteDialogOpen(true);
  };

  const executeDelete = async () => {
    if (!targetFileMetaId) return;
    await domain.deleteFile(targetFileMetaId);
    setDeleteDialogOpen(false);
    setTargetFileMetaId(null);
  };

  return (
    <Box>
      <Card elevation={0} className="filesComponentPanel">
        <CardContent>
          {/* Header */}
          <Grid container alignItems="center">
            <Grid size={6}>
              <Typography variant="h4" mb={3}>
                <CollectionsBookmarkIcon sx={{ fontSize: 24 }} /> Files
              </Typography>
            </Grid>
            <Grid size={6} textAlign="right">
              <Button
                variant="outlined"
                startIcon={<UploadIcon />}
                onClick={() => setUploadDialogOpen(true)}
              >
                Upload New Manuscript
              </Button>
            </Grid>
          </Grid>

          {/* Tabs */}
          <Tabs value={tab} onChange={(_, v) => setTab(v)}>
            <Tab label="Manuscripts" />
            <Tab label="Feedback Submissions" />
          </Tabs>

          {/* Manuscripts */}
          {tab === 0 && (
            <>
              {isLoading ? (
                <Box display="flex" justifyContent="center" p={6}>
                  <CircularProgress />
                </Box>
              ) : (
                <FileManagerList
                  files={myManuscripts}
                  domain={domain}
                  variant="FILES"
                  fileListProperties={manuscriptListProperties}
                />
              )}
            </>
          )}

          {/* Feedback */}
          {tab === 1 && (
            <>
              {isLoading ? (
                <Box display="flex" justifyContent="center" p={6}>
                  <CircularProgress />
                </Box>
              ) : (
                <FileManagerList
                  files={myFeedbackDocuments}
                  domain={domain}
                  variant="READINGS"
                  fileListProperties={feedbackListProperties}
                />
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Upload manuscript dialog */}
      <Dialog open={uploadDialogOpen} onClose={() => setUploadDialogOpen(false)}>
        <DialogTitle>
          Upload manuscript
          <IconButton
            onClick={() => setUploadDialogOpen(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <UploadFileDataManuscript
            onSendData={() => setUploadDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Upload version dialog */}
      <Dialog open={versionDialogOpen} onClose={() => setVersionDialogOpen(false)}>
        <DialogTitle>
          Upload new version
          <IconButton
            onClick={() => setVersionDialogOpen(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {targetFileMetaId && (
            <UploadFileDataVersion
              appFileMetaId={targetFileMetaId}
              onSendData={() => setVersionDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogContent sx={{ textAlign: "center", p: 4 }}>
          <Typography mb={2}>
            Are you sure you want to delete this file?
          </Typography>
          <Button onClick={executeDelete} sx={{ mr: 2 }}>
            OK
          </Button>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default FileManager;
