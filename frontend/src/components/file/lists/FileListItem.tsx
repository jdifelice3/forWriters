import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import UploadRoundedIcon from "@mui/icons-material/UploadRounded";
import { AppFile, AppFileMeta } from "../../../types/domain-types";
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
  onUploadVersion(fileMetaId: string): void;
  onAssignReviewers?(version: AppFile): void;
  assigningVersionId?: string;
}

const FileListItem: React.FC<FileListItemProps> = ({
  fileMeta,
  variant,
  domain,
  fileListProperties,
  onEdit,
  onUploadVersion,
  onAssignReviewers,
  assigningVersionId,
}) => {
  // Enforce invariant early
  if (variant === "FILES" && !domain) {
    throw new Error("FileListItem in FILES mode requires FileDomainCommands");
  }

  return (
    <Card className="filesCardManuscripts">
      <CardContent className="manuscript-card-content">
        <Box
          className={`manuscript-card-layout ${
            fileListProperties.showVersionHistory ? "" : "manuscript-card-layout-summary"
          }`}
        >
          <Box className="manuscript-overview-pane">
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
          </Box>

          {variant === "FILES" &&
            domain &&
            fileListProperties.showVersionHistory && (
              <Box className="manuscript-versions-pane">
                <Box className="manuscript-versions-heading">
                  <Box>
                    <Typography className="workspace-eyebrow">Draft history</Typography>
                    <Typography component="h3">
                      <HistoryRoundedIcon />
                      Versions
                    </Typography>
                  </Box>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<UploadRoundedIcon />}
                    onClick={() => onUploadVersion(fileMeta.id)}
                  >
                    Upload version
                  </Button>
                </Box>

                <Typography className="manuscript-active-version-help">
                  Select the version used for future reading submissions. Reviewer assignments
                  remain attached to the exact version chosen.
                </Typography>
                <Typography className="manuscript-version-label">
                  Active draft
                </Typography>
                <FileVersionList
                  fileMeta={fileMeta}
                  versions={fileMeta.appFile}
                  currentVersionId={fileMeta.currentVersionId}
                  onVersionChange={(versionId) =>
                    domain.setActiveVersion(fileMeta.id, versionId)
                  }
                  onAssignReviewers={onAssignReviewers}
                  assigningVersionId={assigningVersionId}
                />
              </Box>
            )}
        </Box>
      </CardContent>
    </Card>
  );
};


export default FileListItem;
