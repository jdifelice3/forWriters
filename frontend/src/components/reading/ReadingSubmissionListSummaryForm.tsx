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
    createdAt: string | undefined;
}

const ReadingSubmissionListSummaryForm: React.FC<ReadingSubmissionListSummaryFormProps> = ({
    key,
    fileTitle,
    fileVersion,
    fileDescription,
    filename,
    readingName,
    readingDate,
    createdAt
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

        <Typography sx={{ fontSize: 14 }}>
            <b>Version:</b> {fileVersion.toString()}
        </Typography>
        <Typography sx={{ fontSize: 14 }}>
            <b>Filename:</b> {filename}
        </Typography>
        {readingDate !== null ? (
            <Typography sx={{ fontSize: 14 }}>
            <b>Reading Date</b>: {new Date(readingDate!).toLocaleDateString()}
            </Typography>
        ) : (
            <Typography sx={{ fontSize: 14 }}>
            <b>Date Created</b>: {new Date(createdAt!).toLocaleDateString()}
            </Typography>
        )}
        <Typography sx={{ fontSize: 14 }}>
          <b>Reading Name:</b> {readingName}
        </Typography>
      </Stack>
    </Box>
  );
};

export default ReadingSubmissionListSummaryForm;
