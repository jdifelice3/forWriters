"use client";

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

  if (!files || files.length === 0) {
    return (
      <Box className="workspace-empty-state">
        <Typography variant="h5">
          {fileListProperties.noFilesMessage}
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Box className="reading-submissions-panel">
        {myReadings.map(r => r.readingSubmission.map(rs =>
            <ReadingSubmissionListSummaryForm
                key={rs.appFile.appFileMetaId}
                fileTitle={rs.appFile.appFileMeta.title}
                fileDescription={rs.appFile.appFileMeta.description}
                readingName={r.name}
                readingDate={r.readingDate}
                fileVersion={rs.appFile.version}
                filename={`${rs.appFile.filename.replace(/^\d+-/, '')}`}
                createdAt={r.createdAt}
            />
        ))}         
      </Box>

    </>
  );
};

export default ReadingSubmissionList;
