"use client";

import { useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import { AppFile } from "../types/domain-types";
import { DocType } from "../util/Enum";

import { FileListProperties, UploadFileFormProperties } from "../types/File";
import { generateRandomString } from "../util/Math";
import FileList from "../components/FileList";
import UploadFileForm from "../components/UploadFileForm_old";
import {
  Box,
  Card,
CardContent,

  Typography,
  CircularProgress,
  Divider,
} from "@mui/material";
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import ManuscriptUploadSection from "../components/ManuscriptUploadSection";

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

const styles = {
    marginLeft: '75px' // or a responsive value
};

interface FileManagerProps {
  documentType?: string;
}

const FileManager: React.FC<FileManagerProps> = ({documentType}) => {
    const { user, isLoading } = useUserContext();
    const [ pageTitle, setPageTitle ] = useState("");
    const [ fileListTitle, setFileListTitle] = useState("");
    const [files, setFiles] = useState<AppFile[]>([]);
    const [reload, setReload] = useState("");

    const filesUrl = `${import.meta.env.VITE_API_HOST}/api/fileApi`;
    // Fetch uploaded files
    useEffect(() => {
        if (!user || isLoading) return;
        if(documentType){
            fileListProperties.showDeleteButton = !(documentType === DocType.FEEDBACK);
            fileListProperties.showEditButton = !(documentType === DocType.FEEDBACK);
        }

        (async () => {
            let url = "";
            if(documentType){
                switch(documentType.toString()) {
                    case DocType.MANUSCRIPT:
                        uploadFormProperties.subtitle = "Upload a new manuscript";
                        url = `${filesUrl}/type/${documentType}`;
                        setPageTitle("Manuscripts");
                        setFileListTitle("Your manuscripts");
                        break;
                    case DocType.FEEDBACK:
                        uploadFormProperties.subtitle = "Upload a feedback file (DOCX)";
                        url = `${filesUrl}/type/${documentType}`;
                        setPageTitle("Feedback Documents");
                        setFileListTitle("Your feedback documents");
                        break;
                }
                const res = await fetch(url, 
                { 
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: "include"
                });
            

            if (res.ok) {
                const data = await res.json();
                setFiles(data);
            }
        }
        })();
    }, [reload, user, documentType]);

  const handleReload = (file: AppFile[]) => {
    setFiles(file);
    setReload(generateRandomString(8)); //change the reload variable to something unique. This will rerun useEffect
  };

  //const reloadFromUploadForm = (file: AppFile) => {
  const reloadFromUploadForm = () => {
    setReload(generateRandomString(8));
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
            <ManuscriptUploadSection onSendData={reloadFromUploadForm}/>
        </CardContent>
        </Card>
      <Divider sx={{ mb: 3 }} />

      {/* File list */}
      <Typography variant="h6" mb={2}>
        {fileListTitle}
      </Typography>
      {isLoading ? (
          <Box display="flex" justifyContent="center" p={6} ><CircularProgress /></Box>
        ) : (
              <FileList files={files} onSendData={handleReload} fileListProperties={fileListProperties}/>
      )}
    </Box>
  );
}

export default FileManager;