import {
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import { AppFileMeta } from "../../../types/domain-types";
import { FileDomainCommands, FileListProperties } from "../../../types/FileTypes";
import FileListForm from "../forms/FileListDetailsForm";
import FileListSummaryForm from "../forms/FileListSummaryForm";
import FileVersionList from "./FileVersionList";

interface FileListItemProps {
  fileMeta: AppFileMeta;
  variant: "FILES" | "READINGS";
  fileListProperties: FileListProperties;
  onEdit(file: AppFileMeta): void;
  domain?: FileDomainCommands;
}

const FileListItem: React.FC<FileListItemProps> = ({
  fileMeta,
  variant,
  domain,
  fileListProperties,
  onEdit,
}) => {
  // Enforce invariant early
  if (variant === "FILES" && !domain) {
    throw new Error("FileListItem in FILES mode requires FileDomainCommands");
  }

  return (
    <Card className="filesCardManuscripts">
      <CardContent>
        <Grid container spacing={4}>
          <Grid size={fileListProperties.showVersionHistory ? 6 : 12}>
            {variant === "FILES" && domain ? (
              <FileListForm
                fileListProperties={fileListProperties}
                domain={domain}
                fileMeta={fileMeta}
                onEdit={() => onEdit(fileMeta)}
              />
            ) : (
              <FileListSummaryForm
                fileMeta={fileMeta}
                fileListProperties={fileListProperties}
              />
            )}
          </Grid>

          {variant === "FILES" &&
            domain &&
            fileListProperties.showVersionHistory && (
              <Grid size={6}>
                <Typography fontWeight="bold" sx={{ mb: 1 }}>
                  File Versions
                </Typography>

                {/* Upload control (correct pattern) */}
                <Button
                  size="small"
                  component="label"
                >
                  Upload New Version
                  <input
                    type="file"
                    hidden
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      domain.uploadVersion(fileMeta.id, file);
                    }}
                  />
                </Button>

                <FileVersionList
                  fileMeta={fileMeta}
                  versions={fileMeta.appFile}
                  currentVersionId={fileMeta.currentVersionId}
                  onVersionChange={(versionId) =>
                    domain.setActiveVersion(fileMeta.id, versionId)
                  }
                />
              </Grid>
            )}
        </Grid>
      </CardContent>
    </Card>
  );
};


export default FileListItem;
