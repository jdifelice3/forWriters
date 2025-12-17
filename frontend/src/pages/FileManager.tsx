"use client";
import { useState } from "react";
import { AppFile } from "../types/domain-types";
import { FileCommands } from "../types/File";
import { DocType } from "../util/Enum";
import { FileListProperties, UploadFileFormProperties } from "../types/File";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Divider,
} from "@mui/material";
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import ManuscriptUpload from "../components/file/ManuscriptUpload";
import { useFilesGet } from "../hooks/useFile";
import FileList from "../components/file/FileList";

const uploadFormProperties: UploadFileFormProperties =
  {
    title: "",
    subtitle: "Upload a new manuscript",
    buttonChooseFileText: "CHOOSE FILE",
    buttonUploadText: "UPLOAD",
    titleVariant: "h4",
    showUploadIcon: true
  }

const fileListProperties: FileListProperties =
  {
    showPreviewButton: true,
    buttonDownloadText: "DOWNLOAD",
    showDeleteButton: true,
    showEditButton: true 
  }

const styles     = {
    marginLeft: '75px' // or a responsive value
};

interface FileManagerProps {
  documentType?: string;
}

const FileManager: React.FC<FileManagerProps> = ({documentType}) => {
    const [editFile, setEditFile] = useState<AppFile | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");

    const filesUrl = `${import.meta.env.VITE_API_HOST}/api/fileApi`;

    const pageTitle = documentType === DocType.MANUSCRIPT ? "Manuscripts" : "Feedback Documents";
    const fileListTitle = documentType === DocType.MANUSCRIPT ? "Your manuscripts" : "Your feedback documents";

    let url = "";

    if(documentType){
        fileListProperties.showDeleteButton = !(documentType === DocType.FEEDBACK);
        fileListProperties.showEditButton = !(documentType === DocType.FEEDBACK);

        switch(documentType.toString()) {
            case DocType.MANUSCRIPT:
                uploadFormProperties.subtitle = "Upload a new manuscript";
                url = `${filesUrl}/type/${documentType}`;
                break;
            case DocType.FEEDBACK:
                uploadFormProperties.subtitle = "Upload a feedback file (DOCX)";
                break;
        }
    }

    const { files, isLoading, error, refresh } = useFilesGet(url);

    const uploadOnSendData = (file: AppFile) => {

    }

    const handleEdit = async(file: AppFile) => {
        alert('in handleEdit');
        await refresh();
        setEditFile(null);
        setEditTitle(file.title);
        setEditDescription(file.description || "");
    };

    const handleSaveEdit = async (file:AppFile) => {
        console.log('file', file);
        if (!file) return;
        try {
            console.log('handleSaveEdit url', filesUrl)
            console.log('editFile', file)
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

    const handleDelete = async (file: AppFile) => {
        if (!confirm("Are you sure you want to delete this file?")) return;
        try {
        const res = await fetch(`${url}?id=${file.id}`, {
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

    const commands: FileCommands = {
        edit: handleEdit,
        save: handleSaveEdit,
        delete: handleDelete
    }

    return (
        <Box 
            style={styles} 
            sx={{ 
            maxWidth: 1000, 
            mx: "auto", 
            p: 4,
        }}>
            <Typography variant="h4" mb={3}>
            <CollectionsBookmarkIcon 
                sx={{ 
                    fontSize: '40px',
                    verticalAlign: "bottom", 
                }}
                />&nbsp;
            {pageTitle}
        </Typography>
        <Card sx={{ mb: 4, p: 2 }}>
                <CardContent>
            <Typography variant="h6" gutterBottom>
                Upload a new manuscript
            </Typography>
                <ManuscriptUpload onSendData={uploadOnSendData}/>
            </CardContent>
            </Card>
        <Divider sx={{ mb: 3 }} />

        {/* File list */}
        <Typography variant="h6" mb={2}>
            {fileListTitle}
        </Typography>
        {isLoading   ? (
                <Box display="flex" justifyContent="center" p={6} ><CircularProgress /></Box>
            ) : (
                <FileList files={files} commands={commands} fileListProperties={fileListProperties}/>
            )}
        </Box>
    );
}

export default FileManager;