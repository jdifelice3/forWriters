"use client";

import { useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import { AppFile, FileType, DocumentType } from "../../../backend/src/domain-types";
import { FileListProperties, UploadFileFormProperties } from "../types/File";
import { generateRandomString } from "../util/Math";
import FileList from "../components/FileList";
import UploadFileForm from "../components/UploadFileForm";
import {
  Box,
  Typography,
  CircularProgress,
  Divider,
} from "@mui/material";
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';

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
  documentType?: DocumentType;
}

const FileManager: React.FC<FileManagerProps> = ({documentType}) => {
    const { user, isLoading } = useUserContext();
    const [ pageTitle, setPageTitle ] = useState("");
    const [ fileListTitle, setFileListTitle] = useState("");
    const [files, setFiles] = useState<AppFile[]>([]);
    //const [documentTypeLocal, setDocumentTypeLocal] = useState(DocumentType.MANUSCRIPT);
    //const [isLoading, setIsLoading] = useState(true);
    const [reload, setReload] = useState("");

    let filesUrl = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/files`;
    if(documentType){
        fileListProperties.showDeleteButton = !(documentType === DocumentType.FEEDBACK);
        fileListProperties.showEditButton = !(documentType === DocumentType.FEEDBACK);
    }
    // Fetch uploaded files
    useEffect(() => {
        if (!user || isLoading) return;
        (async () => {
            switch(documentType) {
                case DocumentType.MANUSCRIPT:
                    uploadFormProperties.subtitle = "Upload a new manuscript";
                    filesUrl = `${filesUrl}/type/${documentType}`;
                    setPageTitle("Manuscripts");
                    setFileListTitle("Your manuscripts");
                    break;
                case DocumentType.FEEDBACK:
                    uploadFormProperties.subtitle = "Upload a feedback file (DOCX)";
                    filesUrl = `${filesUrl}/type/${documentType}`;
                    setPageTitle("Feedback Documents");
                    setFileListTitle("Your feedback documents");
                    break;
            }
            const res = await fetch(filesUrl, 
            { 
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: "include"
            });

        if (res.ok) {
            const data = await res.json();
            setFiles(data);
            console.log('From FileManager.tsx: documentType', documentType);
            console.log('data', data);

            
            console.log('filesUrl', filesUrl);
            //setIsLoading(false);
        }
        })();
    }, [reload, user, documentType]);

  const handleReload = (file: AppFile[]) => {
    setFiles(file);
    setReload(generateRandomString(8)); //change the reload variable to something unique. This will rerun useEffect
  };

  const reloadFromUploadForm = (file: AppFile) => {
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
        {documentType === DocumentType.MANUSCRIPT ? (
      <UploadFileForm onSendData={reloadFromUploadForm} formProperties={uploadFormProperties} />
        ) : (
            <div></div>
        )}
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