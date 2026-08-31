"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import CollectionsBookmarkRoundedIcon from "@mui/icons-material/CollectionsBookmarkRounded";
import CloudDoneRoundedIcon from "@mui/icons-material/CloudDoneRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import { FileDomainCommands, FileListProperties } from "../types/FileTypes";
import FileManagerList from "../components/file/lists/FileManagerList";
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
import { useGroupContext } from "../context/GroupContextProvider";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../assets/css/workspace-pages.css";

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
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { activeGroup } = useGroupContext();
    const { user } = useUserContext();
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
        getHTML,
        exportFeedbackReport
    } = useFileDomain();
    const ui = useFileUI();
    const { files, isLoading, mutate } = useFiles();
    const { myManuscripts } = useFilesData(files);
    const { readings } = useReadings();
    const { myFiles, myReadings } = useReadingsData(readings, user);
    const requestedReturnTo = searchParams.get("returnTo");
    const returnToWorkflow =
        requestedReturnTo?.startsWith("/groups/") &&
        requestedReturnTo.includes("/workflow")
            ? requestedReturnTo
            : null;
    
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
        getHTML: getHTML,
        exportFeedbackReport: exportFeedbackReport
    }
  
  return (
    <Box className="workspace-page manuscripts-workspace">
        <ConfirmDialog
            open={open}
            title="Are you sure you want to delete this manuscript?"
            message={deletionDialogMessage}
            onConfirm={() => onConfirmDelete(appFileMetaIdToDelete)}
            onClose={() => setOpen(false)            
        }
      />
      <Box className="workspace-page-header">
        <Box>
          <Typography className="workspace-eyebrow">
            {activeGroup?.name ?? "Your writing workspace"}
          </Typography>
          <Typography component="h1">Manuscripts</Typography>
          <Typography className="workspace-page-lede">
            Keep every draft and version together and choose the active manuscript.
            {activeGroup?.groupType === "WRITING"
              ? " Select an exact version from a scheduled reading’s critique workflow."
              : " Send an exact version into an ad-hoc critique when you are ready."}
          </Typography>
        </Box>
        <Box className="workspace-header-actions">
          {returnToWorkflow && (
            <Button
              variant="outlined"
              startIcon={<ArrowBackRoundedIcon />}
              onClick={() => navigate(returnToWorkflow)}
            >
              Back to critique workflow
            </Button>
          )}
          <Button
            variant="contained"
            startIcon={<UploadIcon />}
            onClick={() => ui.setUploadDialogOpen(true)}
          >
            Upload manuscript
          </Button>
        </Box>
      </Box>

      <Box className="workspace-summary-strip">
        <Chip
          icon={<CollectionsBookmarkRoundedIcon />}
          label={`${myManuscripts.length} ${myManuscripts.length === 1 ? "manuscript" : "manuscripts"}`}
        />
        <Chip
          icon={<HistoryRoundedIcon />}
          label={`${myManuscripts.reduce((total, manuscript) => total + manuscript.appFile.length, 0)} saved versions`}
        />
        <Chip icon={<CloudDoneRoundedIcon />} label="Stored in Amazon S3" />
      </Box>

      <Box className="workspace-surface manuscript-library-panel">
        <Tabs
          className="manuscript-library-tabs"
          value={tab}
          onChange={(_, value) => setTab(value)}
        >
          <Tab label="Manuscripts" />
          <Tab label="Reading submissions" />
        </Tabs>

        <Box className="manuscript-library-content">
          {tab === 0 && (
            isLoading ? (
              <Box className="workspace-loading" sx={{ minHeight: 280 }}>
                <CircularProgress size={25} />
                <Typography>Loading manuscripts…</Typography>
              </Box>
            ) : (
              <FileManagerList
                files={myManuscripts}
                domain={domain}
                variant="FILES"
                fileListProperties={manuscriptListProperties}
                onUploadVersion={onBeginUploadVersion}
              />
            )
          )}

          {tab === 1 && (
            isLoading ? (
              <Box className="workspace-loading" sx={{ minHeight: 280 }}>
                <CircularProgress size={25} />
                <Typography>Loading reading submissions…</Typography>
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
            )
          )}
        </Box>
      </Box>

{/* DIALOGS */}
      {/* Edit File Metadata dialog */}
        <Dialog className="workspace-dialog" open={ui.editDialogOpen} fullWidth maxWidth="sm" onClose={ui.closeDialogs}>
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
                <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave}>
                Save
                </Button>
            </DialogActions>
        </Dialog>

      {/* Upload manuscript dialog */}
      <Dialog className="workspace-dialog" open={ui.uploadDialogOpen} onClose={() => ui.closeDialogs()} fullWidth maxWidth="sm">
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
      <Dialog className="workspace-dialog" open={ui.versionDialogOpen} onClose={() => ui.closeDialogs()} fullWidth maxWidth="sm">
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
      <Dialog className="workspace-dialog" open={ui.deleteDialogOpen} onClose={() => ui.closeDialogs()}>
        <DialogContent sx={{ textAlign: "center", p: 4 }}>
          <Typography mb={2}>
            Are you sure you want to delete this file?
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={() => domain.deleteFile(ui.targetFileMetaId!)}
            sx={{ mr: 2 }}
          >
            Delete
          </Button>
          <Button variant="outlined" onClick={ui.closeDialogs}>Cancel</Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default FileManager;
