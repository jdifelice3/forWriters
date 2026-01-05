"use client";

import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { AppFileMeta } from "../../../types/domain-types";
import { FileDomainCommands, FileListProperties } from "../../../types/FileTypes";
import FileListItem from "./FileListItem";
import EditFileDialog from "./EditFileDialog";

interface FileManagerListProps {
  files: AppFileMeta[];
  variant: "FILES" | "READINGS";
  fileListProperties: FileListProperties;
  domain?: FileDomainCommands;
  onUploadVersion(fileMetaId: string): void;
}

const FileManagerList: React.FC<FileManagerListProps> = ({
  files,
  domain,
  fileListProperties,
  variant,
  onUploadVersion
}) => {

    if (variant === "FILES" && !domain) {
        throw new Error("FileManagerList in FILES mode requires a domain");
    }

    const [editingFile, setEditingFile] = useState<AppFileMeta | null>(null);

  if (!files || files.length === 0) {
    return (
      <Box>
        <Typography color="text.secondary">
          There are no uploaded files.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Box>
        {files.map((fileMeta) => (
          <FileListItem
                key={fileMeta.id}
                fileMeta={fileMeta}
                variant={variant}
                domain={domain}
                fileListProperties={fileListProperties}
                onEdit={setEditingFile}
                onUploadVersion={onUploadVersion}
          />
        ))}
      </Box>

      {variant === "FILES" && domain && (
        <EditFileDialog
            file={editingFile}
            onClose={() => setEditingFile(null)}
            onSave={domain.saveMetadata}
        />
)}

    </>
  );
};

export default FileManagerList;
