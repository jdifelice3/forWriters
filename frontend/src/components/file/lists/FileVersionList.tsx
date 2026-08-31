"use client";

import { AppFile, AppFileMeta } from "../../../types/domain-types";
import {
  List,
  ListItem,
  ListItemText,
  Radio,
  Box,
  Chip,
  Tooltip,
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
          className={version.version === currentVersionId ? "manuscript-version-row active" : "manuscript-version-row"}
        >
          <Box className="manuscript-version-number">v{version.version}</Box>
          <ListItemText
            primary={version.filename.replace(/^\d+-/, '')}
            secondary={
              [
                version.versionComment,
                new Date(version.uploadedAt).toLocaleDateString(),
              ]
                .filter(Boolean)
                .join(" • ")
            }
          />
          <Box className="manuscript-version-controls">
              {version.version === currentVersionId && (
                <Chip size="small" label="Active" />
              )}
              <Tooltip title={version.version === currentVersionId ? "Active version" : "Make this the active version"}>
                <Radio
                  inputProps={{ "aria-label": `Make version ${version.version} active` }}
                  checked={version.version === currentVersionId}
                  onChange={() => onVersionChange(version.version)}
                />
              </Tooltip>
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default FileVersionList;
