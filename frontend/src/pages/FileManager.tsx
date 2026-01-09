"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Grid,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";

import { AppFileMeta, AppFile } from "../types/domain-types";
import { FileDomainCommands, FileListProperties } from "../types/FileTypes";
import FileManagerList from "../components/file/lists/FileManagerList";
import UploadFileDataManuscript from "../components/file/data/UploadFileDataManuscript";
import UploadFileDataVersion from "../components/file/data/UploadFileDataVersion";
import { useFiles, useFilesData } from "../hooks/file/useFile";
import { useFileUI } from "../hooks/file/useFileUI";
import { useFileDomain } from "../hooks/file/useFileDomain";

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
    const { saveMetadata, deleteFile, uploadVersion, setActiveVersion } = useFileDomain();
    const ui = useFileUI();
    const { files, isLoading, mutate } = useFiles();

    const domain: FileDomainCommands = {
        saveMetadata: saveMetadata,
        deleteFile: deleteFile,
        uploadVersion: uploadVersion,
        setActiveVersion: setActiveVersion
    }
    
    const [tab, setTab] = useState(0);

    // dialog state
    const { myManuscripts, myFeedbackDocuments } = useFilesData(files);

    const onUploadVersion = (fileMetaId: string) => {
        ui.beginUploadNewVersion(fileMetaId);
    }

    const onSendData = (data: AppFile) => {
        ui.closeDialogs();
        mutate();
    }

    const handleSave = async() => {
        console.log('ui.targetMetaDataId', ui.targetFileMetaId)
        const fileMetaId: string = ui.targetFileMetaId!;
        const title: string = ui.title;
        const description: string = ui.description;
        saveMetadata({fileMetaId, title, description});
        ui.closeDialogs();
        mutate();
    }
  
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
                onClick={() => ui.setUploadDialogOpen(true)}
              >
                Upload New Manuscript
              </Button>
            </Grid>
          </Grid>

          {/* Tabs */}
          <Tabs value={tab} onChange={(_, v) => setTab(v)}>
            <Tab label="Manuscripts" />
            <Tab label="Feedback Sent" />
            <Tab label="My Reading Submissions" />
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
                  onUploadVersion={onUploadVersion}
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
                  onUploadVersion={onUploadVersion}
                />
              )}
            </>
          )}
        </CardContent>
      </Card>

{/* DIALOGS */}
      {/* Edit File Metadata dialog */}
        <Dialog open={ui.editDialogOpen} fullWidth maxWidth="sm" onClose={ui.closeDialogs}>
            <DialogTitle>
                Edit File Metadata
                <IconButton
                onClick={ui.closeDialogs}
                sx={{ position: "absolute", right: 8, top: 8 }}
                >
                <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <TextField
                label="Title"
                fullWidth
                margin="dense"
                value={ui.title}
                onChange={(e) => ui.setTitle(e.target.value)}
                />
                <TextField
                label="Description"
                fullWidth
                multiline
                rows={3}
                margin="dense"
                value={ui.description}
                onChange={(e) => ui.setDescription(e.target.value)}
                />
            </DialogContent>

            <DialogActions>
                <Button startIcon={<SaveIcon />} onClick={handleSave}>
                Save
                </Button>
            </DialogActions>
        </Dialog>

      {/* Upload manuscript dialog */}
      <Dialog open={ui.uploadDialogOpen} onClose={() => ui.closeDialogs()}>
        <DialogTitle>
          Upload manuscript
          <IconButton
            onClick={() => ui.closeDialogs()}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <UploadFileDataManuscript
            onSendData={onSendData}
          />
        </DialogContent>
      </Dialog>

      {/* Upload version dialog */}
      <Dialog open={ui.versionDialogOpen} onClose={() => ui.closeDialogs()}>
        <DialogTitle>
          Upload new version
          <IconButton
            onClick={() => ui.closeDialogs()}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {ui.targetFileMetaId && (
            <UploadFileDataVersion
              appFileMetaId={ui.targetFileMetaId}
              onSendData={onSendData}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <Dialog open={ui.deleteDialogOpen} onClose={() => ui.closeDialogs()}>
        <DialogContent sx={{ textAlign: "center", p: 4 }}>
          <Typography mb={2}>
            Are you sure you want to delete this file?
          </Typography>
          <Button onClick={(event) => domain.deleteFile(ui.targetFileMetaId!)} sx={{ mr: 2 }}>
            OK
          </Button>
          <Button onClick={() => ui.closeDialogs}>Cancel</Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default FileManager;
