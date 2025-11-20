"use client";

import { useState, useEffect } from "react";
import { AppFile } from "../../../backend/src/domain-types";
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

const uploadFormProperties: UploadFileFormProperties =
  {
    title: "Upload and Manage Your Manuscripts",
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

const FileManager = () => {
  const [files, setFiles] = useState<AppFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState("");

  const filesUrl = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/files`;
  // Fetch uploaded files
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
        setIsLoading(false);
      }
    })();
  }, [reload]);

  const handleReload = (file: AppFile[]) => {
    setFiles(file);
    setReload(generateRandomString(8)); //change the reload variable to something unique. This will rerun useEffect
  };

  const reloadFromUploadForm = (file: AppFile) => {
    setReload(generateRandomString(8));
  }

  return (
    <Box sx={{ 
        maxWidth: 900, 
        mx: "auto", 
        p: 4,
        marginLeft: "100px",
      }}>
      <UploadFileForm onSendData={reloadFromUploadForm} formProperties={uploadFormProperties} />
      
      <Divider sx={{ mb: 3 }} />

      {/* File list */}
      <Typography variant="h6" mb={2}>
        Your uploaded manuscripts
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