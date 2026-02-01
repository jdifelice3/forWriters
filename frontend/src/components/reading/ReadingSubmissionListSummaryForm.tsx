"use client";

import { AppFileMeta } from "../../types/domain-types";
import { FileListProperties } from "../../types/FileTypes";
import {
  Box,
  Typography,
  Stack,
} from "@mui/material";
import wordIcon from "../../assets/icons/icons8-word-file-48.png";

interface ReadingSubmissionListSummaryFormProps {
    key: string;
    fileTitle: string;
    fileVersion: number;
    filename: string;
    fileDescription: string | undefined;
    readingName: string;
    readingDate: string | undefined;
}

const ReadingSubmissionListSummaryForm: React.FC<ReadingSubmissionListSummaryFormProps> = ({
    key,
    fileTitle,
    fileVersion,
    fileDescription,
    filename,
    readingName,
    readingDate
}) => {
    
  return (
    <Box key={key}>
      <Stack spacing={1}>
        <Stack direction="row" alignItems="center" gap={1}>
          {/* <FileIcon file={currentVersion} /> */}
          <img src={wordIcon} className='icon' alt="DOCX" />
          <Typography fontWeight="bold" sx={{ fontSize: 14 }}>
            {fileTitle}
          </Typography>
          
        </Stack>

        {/* <Typography variant="body1" color="text.secondary">
          {fileDescription || "No description"}
        </Typography> */}
        <Typography sx={{ fontSize: 14 }}>
            Version: <b>{fileVersion.toString()}</b>
        </Typography>
        <Typography sx={{ fontSize: 14 }}>
            Filename: <b>{filename}</b>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Reading:</b> {readingName}
        </Typography>
        {readingDate !== null && (
            <Typography variant="body2" color="text.secondary">
            <b>Reading Date</b>: {new Date(readingDate!).toLocaleDateString()}
            </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default ReadingSubmissionListSummaryForm;
