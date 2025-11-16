"use client";

import { useState, useEffect } from "react";
import { AppFile, UploadFileFormProperties } from "../types/FileTypes";
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
    buttonUploadText: "UPLOAD"
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

  const handleReload = (data: AppFile[]) => {
    setFiles(data);
    setReload(generateRandomString(8)); //change the reload variable to something unique. This will rerun useEffect
  };

  const reloadFromUploadForm = (data: string) => {
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
          <FileList files={files} onSendData={handleReload}/>
      )}

    </Box>
  );
}

export default FileManager;