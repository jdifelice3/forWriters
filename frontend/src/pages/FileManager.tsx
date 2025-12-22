"use client";
import { useState } from "react";
import { AppFile, AppFileMeta } from "../types/domain-types";
import { FileCommands } from "../types/FileTypes";
import { DocType } from "../util/Enum";
import { FileListProperties, UploadFileFormProperties } from "../types/FileTypes";
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
    Typography
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import CloseIcon from "@mui/icons-material/Close";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import UploadFileDataManuscript from "../components/file/data/UploadFileDataManuscript";
import { useFiles, useFilesData } from "../hooks/useFile";
import FileManagerList from "../components/file/lists/FileManagerList";
import { useFileUpload } from "../hooks/useFile";
import UploadFileDataVersion from "../components/file/data/UploadFileDataVersion";
import { FilesAPI } from "../api/filesApi"

const uploadFormProperties: UploadFileFormProperties =
  {
    title: "",
    subtitle: "Upload a new manuscript",
    buttonChooseFileText: "CHOOSE FILE",
    buttonUploadText: "UPLOAD",
    titleVariant: "h4",
    showUploadIcon: true
  }

const manuscriptListProperties: FileListProperties =
  {
    showPreviewButton: true,
    buttonDownloadText: "DOWNLOAD",
    showDeleteButton: true,
    showEditButton: true,
    showVersionHistory: true
  }

  const feedbackListProperties: FileListProperties =
  {
    showPreviewButton: true,
    buttonDownloadText: "DOWNLOAD",
    showDeleteButton: true,
    showEditButton: true,
    showVersionHistory: false
  }

const filesUrl = `${import.meta.env.VITE_API_HOST}/api/filesApi`;

const FileManager = () => {
    const [appFileVersion, setAppFileVersion] = useState(1); 
    const [appFileMetaId, setAppFileMetaId] = useState("");
    const [appFileId, setAppFileId] = useState("");
    const [version, setVersion] = useState(0);
    const [editFile, setEditFile] = useState<AppFileMeta | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [versionDialogOpen, setVersionDialogOpen] = useState(false);
    const [closeDialogOpen, setCloseDialogOpen] = useState(false);

    const pageTitle = "Files";
    
    const { files, isLoading, error, refresh } = useFiles(filesUrl);
    const { myManuscripts, myFeedbackDocuments } = useFilesData(files);

    const uploadOnSendData = (file: AppFile) => {
        setVersionDialogOpen(false);
        setAppFileId(file.id);
    }

    const handleEdit = async(file: AppFileMeta) => {
        alert('in handleEdit');
        await refresh();
        setEditFile(null);
        setEditTitle(file.title);
        setEditDescription(file.description || "");
    };

    const handleSaveEdit = async (file:AppFileMeta) => {
        if (!file) return;
        try {
            const res = await fetch(`${filesUrl}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    id: file.id,
                    title: file.title,
                    description: file.description,
            }),
        });

        if (!res.ok) throw new Error("Failed to update metadata");
            await refresh();        
        } catch (err) {
            console.error(err);
        alert("Failed to update file metadata");
        }
    };

    const handleDelete = (file: AppFileMeta) => {
        setCloseDialogOpen(true);
    }

    const handleDeleteFile = async (file: AppFileMeta) => {
        try {
        const res = await fetch(`${filesUrl}?id=${file.id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to delete file");
            await refresh();
            setEditFile(null);
        } catch (err) {
        console.error(err);
        alert("Failed to delete file");
        }
    };

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setAppFileId(newValue);
    };

    const onVersionChange = async(event: React.SyntheticEvent, fileAppMeta: AppFileMeta, version: string) => {
        const appFileMeta: AppFileMeta = await FilesAPI.updateVersion(fileAppMeta.id, version);
        setVersion(appFileMeta.currentVersionId)
        await refresh();
    }

    const onVersionUpload = async(event: React.SyntheticEvent, appFileMeta: AppFileMeta) => {
        setAppFileMetaId(appFileMeta.id);
        setVersionDialogOpen(true);
    }

    const commands: FileCommands = {
        edit: handleEdit,   
        save: handleSaveEdit,
        delete: handleDelete,
        onVersionChange: onVersionChange,
        onVersionUpload: onVersionUpload
    }

    return (
        <Box>
        <Card elevation={0} className="filesComponentPanel">
            <CardContent>
                <Grid container >
{/* Page Title */}
                    <Grid size={2} >
                        <Typography variant="h4" mb={3}>
                        <CollectionsBookmarkIcon 
                            sx={{ 
                                fontSize: '40px',
                                verticalAlign: "bottom", 
                            }}
                        />&nbsp;
                            {pageTitle}
                        </Typography>
                    </Grid>

{/* Upload New Manuscript Button */}
                    <Grid size={10} sx={{verticalAlign:"middle"}}>
                        <Button 
                            variant="outlined"
                            component="label"
                            startIcon={<UploadIcon />}
                            onClick={(e) => setDialogOpen(true)}
                        >
                            Upload New Manuscript
                        </Button>
                    </Grid>
                </Grid>

{/* Tab Control */}
                <TabContext value={appFileVersion} >
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} >
                        <Tab label="Manuscripts" value={1} sx={{fontSize: 14}}/>
                        <Tab label="Feedback Documents" value={2} sx={{fontSize: 14}}/>
                    </TabList>
                </Box>
                <TabPanel value={1} >
                    <Typography variant="h5" mb={2}>
                        Your manuscripts
                    </Typography>
                    {isLoading   ? (
                        <Box display="flex" justifyContent="center" p={6} ><CircularProgress /></Box>
                    ) : (
                        <FileManagerList 
                            files={myManuscripts} 
                            commands={commands} 
                            fileListProperties={manuscriptListProperties}
                        />
                    )}
                </TabPanel>

                <TabPanel value={2}>
                    <Typography variant="h5" mb={2}>
                        Your Feedback Submissions
                    </Typography>
                    {isLoading   ? (
                        <Box display="flex" justifyContent="center" p={6} ><CircularProgress /></Box>
                    ) : (
                        <FileManagerList 
                            files={myFeedbackDocuments} 
                            commands={commands} 
                            fileListProperties={feedbackListProperties}
                        />
                    )}
                </TabPanel>
            </TabContext>

            </CardContent>
        </Card>
        
    <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>
            <IconButton
                onClick={() => setEditFile(null)}
                sx={{ position: "absolute", right: 8, top: 8 }}
            >
            <CloseIcon onClick={(e) => setDialogOpen(false)}/>
            </IconButton>
        </DialogTitle>
        <DialogContent>
            <Card sx={{ mb: 4, p: 2 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Upload a new manuscript
                        </Typography>
                        <UploadFileDataManuscript onSendData={uploadOnSendData}/>
                    </CardContent>
                </Card>
        </DialogContent>
    </Dialog>
    
    <Dialog open={versionDialogOpen} onClose={() => setVersionDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>
            <IconButton
                onClick={() => setEditFile(null)}
                sx={{ position: "absolute", right: 8, top: 8 }}
            >
            <CloseIcon onClick={(e) => setVersionDialogOpen(false)}/>
            </IconButton>
        </DialogTitle>
        <DialogContent>
            <Card sx={{ mb: 4, p: 2 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Upload a new version
                        </Typography>
                        <UploadFileDataVersion onSendData={uploadOnSendData} appFileMetaId={appFileMetaId}/>
                    </CardContent>
                </Card>
        </DialogContent>
    </Dialog>
    
    <Dialog 
            open={closeDialogOpen} 
            onClose={() => setCloseDialogOpen(false)} 
            fullWidth 
            maxWidth="xs">
        <DialogTitle>
            <IconButton
                onClick={() => setEditFile(null)}
                sx={{ position: "absolute", right: 8, top: 8 }}
            >
            <CloseIcon onClick={(e) => setCloseDialogOpen(false)}/>
            </IconButton>
        </DialogTitle>
        <DialogContent>
            <Card sx={{ mb: 4, p: 2 , textAlign: "center"}}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Are you sure you want to delete this file?
                        </Typography>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{mr: 2 }}
                >
                    OK 
                </Button>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={(e) => setCloseDialogOpen(false)}
                >
                    Cancel                
                </Button>
                    </CardContent>
                </Card>
        </DialogContent>
    </Dialog>

    </Box>   
    );
}

export default FileManager;