"use client";

import { AppFile, AppFileMeta } from "../../../types/domain-types";
import {
  List,
  ListItem,
  ListItemText,
  Radio,
  Stack,
} from "@mui/material";

interface FileVersionListProps {
  fileMeta: AppFileMeta;
  versions: AppFile[];
  currentVersionId: number;
  onVersionChange(versionId: number): void;
}

const FileVersionList: React.FC<FileVersionListProps> = ({
  versions,
  currentVersionId,
  onVersionChange,
}) => {
  return (
    <List dense>
      {versions.map((version) => (
        <ListItem
          key={version.id}
          secondaryAction={
            <Radio
              checked={version.version === currentVersionId}
              onChange={() => onVersionChange(version.version)}
            />
          }
        >
        <ListItemText
            primary={`v${version.version} — ${version.filename}`}
            secondary={
                [
                version.versionComment,
                new Date(version.uploadedAt).toLocaleDateString(),
                ]
                .filter(Boolean)
                .join(" • ")
            }
        />

        </ListItem>
      ))}
    </List>
  );
};

export default FileVersionList;
