"use client";

import { useState, useEffect } from "react";
import { useUserContext } from "../../context/UserContext";
import { FileListProperties } from '../../types/FileTypes';
import { AppFileMeta } from "../../types/domain-types";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
  MenuItem, FormControl
} from "@mui/material";

interface FileSelectProps {
  onSendData: (readingAuthorId: string, appfileMetaId: string) => void;
  readingAuthorId: string;
  selectedValueId?: string;
  fileListProperties: FileListProperties;
} 

type SelectValue = string;

const FileSelect: React.FC<FileSelectProps> = ({onSendData, readingAuthorId, selectedValueId, fileListProperties}) => {
    const { user } = useUserContext();

    const [files, setFiles] = useState<AppFileMeta[]>([]);
    const [selectedValue, setSelectedValue] = useState("");
    const filesUrl = `${import.meta.env.VITE_API_HOST}/api/fileApis/type`;

    const handleChange = (event: SelectChangeEvent<SelectValue>) => {
        setSelectedValue(event.target.value as string);
        onSendData(readingAuthorId, event.target.value as string);
    };

    useEffect(() => {
    if (!user) return;
      (async () => {
        const res = await fetch(`${filesUrl}/${fileListProperties.fileType}`, 
        { 
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: "include"
        });
        
        if (res.ok) {
            const data = await res.json();
            setFiles(data);
            (selectedValueId && selectedValueId !== "" ? setSelectedValue(selectedValueId) : "");
          //setIsLoading(false);
        }
      })();
    }, [user, fileListProperties.fileType, filesUrl, selectedValueId]);
  
     return (
        <FormControl sx={{ width: 360 }}>
            <Select 
                labelId="select-manuscript"
                value={selectedValue}
                onChange={handleChange}
                displayEmpty
            >
                {files.map((f) => (
                    <MenuItem value={f.id}>{f.title}</MenuItem>
                ))};
            </Select>
        </FormControl>
    );
}
export default FileSelect; 