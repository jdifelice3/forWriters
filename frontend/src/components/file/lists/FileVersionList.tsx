import React, { ChangeEvent, useState, useEffect } from "react";
import { AppFile, AppFileMeta } from "../../../types/domain-types";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

interface FileVersionListProps {
    //key: string;
    currentVersion: number;
    fileMeta: AppFileMeta;
    handleVersionChange: (event: ChangeEvent<HTMLInputElement>, fileAppMeta: AppFileMeta, version: string) => void;
}

// const getCurrentAppFileId = (appFileMeta: AppFileMeta): string => {
//     let foundAppFile = appFileMeta.appFile.find(f => f.version === appFileMeta.currentVersionId);

//     if(foundAppFile === undefined){
//         throw new Error("There are no versions in this file");
//     } else {
//         return foundAppFile.id;
//     }
// }

const FileVersionList:React.FC<FileVersionListProps> =({currentVersion, fileMeta, handleVersionChange}) => {
    const[oldVersion, setOldVersion] = useState(0); //oldVersion is a test
    useEffect(() => {
    }, [oldVersion]);

    const foundAppFile = fileMeta.appFile.find(f => f.version === currentVersion);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>, appFileVersionId: string) => {
        //get version number
        const foundAppFile = fileMeta.appFile.find(f => f.id === appFileVersionId);
        let version = 0;

        if(foundAppFile) {
            version = foundAppFile.version;
        } else {
            throw new Error(`File version not found. AppFileMeta id: ${fileMeta.id}`);
        }
        setOldVersion(version);
        //setVersion(version.toString());
        handleVersionChange(event, fileMeta, version.toString());
    }

    return (
        <FormControl>
        <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={foundAppFile?.id}
            onChange={onChange}
        >
            {fileMeta.appFile.map((f, index) => (
                <FormControlLabel key={index}
                    value={f.id} control={<Radio />} label={`${f.version}-${fileMeta.title}-${ new Date(fileMeta.createdAt).toLocaleDateString()}`} />
            ))}
        </RadioGroup>
        </FormControl>
    )
}
export default FileVersionList;