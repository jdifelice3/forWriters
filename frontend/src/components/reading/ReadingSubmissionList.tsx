"use client";

import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { AppFileMeta, Reading } from "../../types/domain-types";
import { FileDomainCommands, FileListProperties } from "../../types/FileTypes";
import ReadingSubmissionListSummaryForm from "../../components/reading/ReadingSubmissionListSummaryForm";

interface ReadingSubmissionListProps {
  files: AppFileMeta[];
  myReadings: Reading[];
  variant: "FILES" | "READINGS";
  fileListProperties: FileListProperties;
  domain?: FileDomainCommands;
  onUploadVersion(fileMetaId: string): void;
}

const ReadingSubmissionList: React.FC<ReadingSubmissionListProps> = ({
  files,
  myReadings,
  domain,
  fileListProperties,
  variant,
  onUploadVersion
}) => {

    if (variant === "FILES" && !domain) {
        throw new Error("ReadingSubmissionList in FILES mode requires a domain");
    }

    const [editingFile, setEditingFile] = useState<AppFileMeta | null>(null);

  if (!files || files.length === 0) {
    return (
      <Box>
        <Typography color="textPrimary">
          {fileListProperties.noFilesMessage}
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Box>
        {myReadings.map(r => r.readingSubmission.map(rs =>
            <ReadingSubmissionListSummaryForm
                key={rs.appFile.appFileMetaId}
                fileTitle={rs.appFile.appFileMeta.title}
                fileDescription={rs.appFile.appFileMeta.description}
                readingName={r.name}
                readingDate={r.readingDate}
                fileVersion={rs.appFile.version}
                filename={rs.appFile.filename}
            />
        ))}         
      </Box>

    </>
  );
};

export default ReadingSubmissionList;
