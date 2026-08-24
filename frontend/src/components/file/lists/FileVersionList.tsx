"use client";

import { AppFile, AppFileMeta } from "../../../types/domain-types";
import {
  List,
  ListItem,
  ListItemText,
  Radio,
  Stack,
  Button,
} from "@mui/material";
import GroupAddRoundedIcon from "@mui/icons-material/GroupAddRounded";

interface FileVersionListProps {
  fileMeta: AppFileMeta;
  versions: AppFile[];
  currentVersionId: number;
  onVersionChange(versionId: number): void;
  onAssignReviewers?(version: AppFile): void;
  assigningVersionId?: string;
}

const FileVersionList: React.FC<FileVersionListProps> = ({
  versions,
  currentVersionId,
  onVersionChange,
  onAssignReviewers,
  assigningVersionId,
}) => {
  return (
    <List dense>
      {versions.map((version) => (
        <ListItem
          key={version.id}
          secondaryAction={
            <Stack direction="row" spacing={1} alignItems="center">
              {onAssignReviewers && (
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<GroupAddRoundedIcon />}
                  disabled={assigningVersionId === version.id}
                  onClick={() => onAssignReviewers(version)}
                  sx={{ textTransform: "none", whiteSpace: "nowrap" }}
                >
                  {assigningVersionId === version.id ? "Opening…" : "Assign reviewers"}
                </Button>
              )}
              <Radio
                checked={version.version === currentVersionId}
                onChange={() => onVersionChange(version.version)}
              />
            </Stack>
          }
        >
        <ListItemText
            primary={`v${version.version} — ${version.filename.replace(/^\d+-/, '')}`}
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
