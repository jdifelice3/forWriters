"use client";

import { AppFileMeta } from "../../../types/domain-types";
import { FileListProperties } from "../../../types/FileTypes";
import {
  Box,
  Typography,
  Stack,
} from "@mui/material";
import wordIcon from "../../../assets/icons/icons8-word-file-48.png";

interface FileListSummaryFormProps {
  fileMeta: AppFileMeta;
  fileListProperties: FileListProperties;
}

const FileListSummaryForm: React.FC<FileListSummaryFormProps> = ({
  fileMeta,
}) => {
    console.log('in FileListSummaryForm')
  console.log('fileMeta', fileMeta)
//   const currentVersion = fileMeta.appFile.find(
//     (v) => v.version === fileMeta.currentVersionId
//   );
  
  return (
    <Box>
      <Stack spacing={1}>
        <Stack direction="row" alignItems="center" gap={1}>
          {/* <FileIcon file={currentVersion} /> */}
          <img src={wordIcon} className='icon' alt="DOCX" />
          <Typography fontWeight="bold" sx={{ fontSize: 14 }}>
            {fileMeta.title}
          </Typography>
        </Stack>

        <Typography variant="body2" color="text.secondary">
          {fileMeta.description || "No description"}
        </Typography>
      </Stack>
    </Box>
  );
};

export default FileListSummaryForm;
