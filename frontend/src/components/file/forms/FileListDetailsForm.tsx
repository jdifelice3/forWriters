"use client";
import { useNavigate } from "react-router-dom";
import { FileListProperties } from "../../../types/FileTypes";
import { AppFileMeta } from "../../../types/domain-types";
import { FileDomainCommands } from "../../../types/FileTypes";
import {
    Button,
    Box,
    Chip,
    Typography,
    IconButton,
    Tooltip,
} from "@mui/material";
import FileIcon from "../../controls/FileIcon";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from '@mui/icons-material/Download';
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import UpdateRoundedIcon from "@mui/icons-material/UpdateRounded";

interface FileListDetailsFormProps {
  fileMeta: AppFileMeta;
  domain: FileDomainCommands;
  onEdit(): void;
  fileListProperties: FileListProperties;
}

const FileListDetailsForm: React.FC<FileListDetailsFormProps> = ({
  fileMeta,
  domain,
  onEdit,
  fileListProperties,
}) => {
    const navigate = useNavigate();
    const currentVersion = fileMeta.appFile.find(
        (f) => f.version === fileMeta.currentVersionId
    );

  return (
    <Box className="manuscript-details">
      <Box className="manuscript-card-heading">
        <Box className="manuscript-file-symbol">
            <FileIcon file={currentVersion} />
        </Box>
        <Box className="manuscript-title-copy">
          <Typography className="workspace-eyebrow">Manuscript</Typography>
          <Typography component="h2">{fileMeta.title}</Typography>
          {currentVersion && (
            <Chip size="small" label={`Active version ${currentVersion.version}`} />
          )}
        </Box>

        <Box className="manuscript-icon-actions">
          {currentVersion && (
            <Tooltip title="Download active version">
              <IconButton
                aria-label="Download active version"
                href={currentVersion.url}
                download={currentVersion.filename}
              >
                <DownloadIcon />
              </IconButton>
            </Tooltip>
          )}

          {fileListProperties.showEditButton && (
            <Tooltip title="Edit manuscript details">
              <IconButton aria-label="Edit manuscript details" onClick={onEdit}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          )}

          {fileListProperties.showDeleteButton && (
            <Tooltip title="Delete manuscript">
              <IconButton
                aria-label="Delete manuscript"
                onClick={() => domain.deleteFile(fileMeta.id)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>

      <Typography className="manuscript-description">
        {!fileMeta.description || !fileListProperties.showDescription
          ? "No description has been added yet."
          : fileMeta.description}
      </Typography>

      <Box className="manuscript-date-grid">
        <Box>
          <CalendarTodayRoundedIcon />
          <span>
            <Typography component="small">Uploaded</Typography>
            <Typography component="strong">
              {new Date(fileMeta.createdAt).toLocaleDateString()}
            </Typography>
          </span>
        </Box>
        <Box>
          <UpdateRoundedIcon />
          <span>
            <Typography component="small">Last modified</Typography>
            <Typography component="strong">
              {new Date(fileMeta.updatedAt).toLocaleDateString()}
            </Typography>
          </span>
        </Box>
      </Box>

      {fileListProperties.showDeleteButton && (
        <Box className="manuscript-secondary-actions">
          <Button
            variant="outlined"
            disabled={!currentVersion}
            onClick={() => navigate(`/filefeedbackdetail/${currentVersion?.id}`)}
          >
            View feedback
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate(`/versioncompare/${fileMeta.id}`)}
          >
            View revision trends
          </Button>
          </Box>
      )}
    </Box>
  );
};

export default FileListDetailsForm;
