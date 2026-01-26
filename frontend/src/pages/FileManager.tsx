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
import { useFiles } from "../hooks/file/useFiles";
import { useFilesData } from "../hooks/file/useFilesData";
import { useFileUI } from "../hooks/file/useFileUI";
import { useFileDomain } from "../hooks/file/useFileDomain";
import { useReadings } from "../hooks/reading/useReadings";
import { useReadingsData } from "../hooks/reading/useReadingsData";
import { useUserContext } from "../context/UserContext";
import UploadFileForm from "../components/file/forms/UploadFileForm";
import ConfirmDialog from "../components/dialogs/ConfirmDialog";
import ReadingSubmissionList from "../components/reading/ReadingSubmissionList";

const manuscriptListProperties: FileListProperties = {
    noFilesMessage: "You have not uploaded manuscripts",
    showPreviewButton: true,
    buttonDownloadText: "DOWNLOAD",
    showDeleteButton: true,
    showEditButton: true,
    showVersionHistory: true,
    showDescription: true
};

const mySubmissionsListProperties: FileListProperties = {
    noFilesMessage: "You have not submitted manuscripts to any readings",
    showPreviewButton: false,
    buttonDownloadText: "DOWNLOAD",
    showDeleteButton: false,
    showEditButton: false,
    showVersionHistory: false,
    showDescription: false
}

const FileManager = () => {
    const { user, isLoading: isUserLoading } = useUserContext();
    const [open, setOpen] = useState(false);
    const [appFileMetaIdToDelete, setAppFileMetaIdToDelete] = useState("");
    const [deletionDialogMessage, setDeletionDialogMessage] = useState("");
    const { 
        saveMetadata, 
        deleteFile, 
        uploadVersion, 
        uploadManuscript,
        setActiveVersion,
        getFileFeedback,
        getFileFeedbackUnique,
        getComments,
        getDeletionIds,
        getHTML
    } = useFileDomain();
    const ui = useFileUI();
    const { files, isLoading, mutate } = useFiles();
    const { myManuscripts } = useFilesData(files);
    const { readings } = useReadings();
    const { myFiles, myReadings } = useReadingsData(readings, user);
    
    const [tab, setTab] = useState(0);
    
    const onBeginUploadVersion = (fileMetaId: string) => {
        ui.beginUploadNewVersion(fileMetaId);
    }

    const onUploadManuscript = async(formData: FormData) => {
        await uploadManuscript(formData);
        ui.closeDialogs();
        mutate();
    }

    const onUploadVersion = async(fileMetaId: string, formData: FormData) => {
        await uploadVersion(ui.targetFileMetaId ?? "", formData);
        ui.closeDialogs();
    }

    const handleSave = async() => {
        const fileMetaId: string = ui.targetFileMetaId!;
        const title: string = ui.title;
        const description: string = ui.description;
        await saveMetadata({fileMetaId, title, description});
        ui.closeDialogs();
        mutate();
    }
    
    const onDeleteFile = async(appFileMetaId: string) => {
        const deletionIds = await getDeletionIds(appFileMetaId);
        
        const fileLine: string = deletionIds.appFileIds.length > 0 ? `${deletionIds.appFileIds.length} file versions\n` : "";
        const submissionLine: string = deletionIds.readingSubmissionIds.length > 0 ? `${deletionIds.readingSubmissionIds.length} reading submissions\n` : "";
        const commentLine: string = deletionIds.fileFeedbackCommentIds.length > 0 ? `${deletionIds.fileFeedbackCommentIds.length}  reviewer comments` : "";

        setDeletionDialogMessage(`
            Deleting it will cause the deletion of:\n
            ${fileLine}
            ${submissionLine}
            ${commentLine}`
        );
        setAppFileMetaIdToDelete(appFileMetaId);
        setOpen(true);
       
    }

    const onConfirmDelete = async(appFileMetaId: string) => {
        setOpen(false);
        await deleteFile(appFileMetaId)
    }

    const domain: FileDomainCommands = {
        saveMetadata: saveMetadata,
        deleteFile: onDeleteFile,
        uploadVersion: onUploadVersion,
        uploadManuscript: onUploadManuscript,
        setActiveVersion: setActiveVersion,
        getFileFeedback: getFileFeedback,
        getFileFeedbackUnique: getFileFeedbackUnique,
        getComments: getComments,
        getDeletionIds: getDeletionIds,
        getHTML: getHTML
    }
  
  return (
    <Box>
        <ConfirmDialog
            open={open}
            title="Are you sure you want to delete this manuscript?"
            message={deletionDialogMessage}
            onConfirm={() => onConfirmDelete(appFileMetaIdToDelete)}
            onClose={() => setOpen(false)            
        }
      />
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
          <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{mb: 2}}>
            <Tab label="Manuscripts" />
            {/* <Tab label="Feedback Sent" /> */}
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
                  onUploadVersion={onBeginUploadVersion}
                />
              )}
            </>
          )}

          {/* My Reading Submissions */}
          {tab == 1 && (
            <Card className="readingCardSignup">
                <CardContent>
              {isLoading ? (
                <Box display="flex" justifyContent="center" p={6}>
                  <CircularProgress />
                </Box>
              ) : (
                <ReadingSubmissionList 
                    files={myFiles}
                    myReadings={myReadings}
                    domain={domain}
                    variant="READINGS"
                    fileListProperties={mySubmissionsListProperties}
                    onUploadVersion={onBeginUploadVersion}
                />
              )}
            
            </CardContent>
            </Card>
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
            <UploadFileForm
                domain={domain}
            />
          {/* <UploadFileDataManuscript
            domain={domain}
          /> */}
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
              domain={domain}
              appFileMetaId={ui.targetFileMetaId}
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
