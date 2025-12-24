"use client";

import { useState, useEffect } from "react";
//import { GroupDescriptionType } from "../../types/domain-types";
import { AppFileMeta } from "../../../types/domain-types";
import {
  Typography,
} from "@mui/material";

interface FileDescriptionProps {
  appFileId: string;
}

const FileDescription: React.FC<FileDescriptionProps> = ({appFileId: appFileId}) => {
    console.log('appFileId', appFileId)
  const [fileDesc, setFileDesc] = useState<AppFileMeta | null>(null);
  const fileDescriptionUrl = `${import.meta.env.VITE_API_HOST}/api/filesApi/${appFileId}/description`;
  
  useEffect(() => {
        (async () => {
          const res = await fetch(fileDescriptionUrl, 
          { 
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
          
          if (res.ok) {
              const data: AppFileMeta = await res.json();
              setFileDesc(data);
          }
        })();
      }, [appFileId, fileDescriptionUrl]);

  return (
    <div>
        <Typography sx={{mb:1}} fontWeight={"bold"}>
            Title
        </Typography>
        <Typography sx={{mb:2}}>
            {fileDesc?.title}
        </Typography>
        <Typography sx={{mb:1}} fontWeight={"bold"}>
            Description
        </Typography>
        <Typography sx={{mb:2}}>
            {fileDesc?.description}
        </Typography>
    </div>
  )
}

export default FileDescription; 