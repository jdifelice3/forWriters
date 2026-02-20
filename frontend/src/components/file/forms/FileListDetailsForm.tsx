"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileListProperties } from "../../../types/FileTypes";
import { AppFileMeta } from "../../../types/domain-types";
import { FileDomainCommands } from "../../../types/FileTypes";
import { useBillingUI } from "../../../hooks/billing/useBillingUI";
import {
    Button,
    Box,
    Typography,
    IconButton,
    Stack,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import FileIcon from "../../controls/FileIcon";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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
    const { isPro} = useBillingUI();
    const navigate = useNavigate();
    const currentVersion = fileMeta.appFile.find(
        (f) => f.version === fileMeta.currentVersionId
    );

  return (
    <Box>
      <Grid container spacing={2}>
        <Stack spacing={2} sx={{ width: "500px" }}>
          <Stack direction="row" alignItems="center" gap={1}>
            <FileIcon file={currentVersion} />
            <Typography fontWeight="bold" sx={{ fontSize: 14 }}>
              {fileMeta.title}
            </Typography>
          </Stack>

          <Typography
            variant="body1"
            color="text.secondary"
            align="justify"
          >
            {
                (!fileMeta.description || !fileListProperties.showDescription) ? "No description" : fileMeta.description 
            }
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Uploaded on{" "}
            {new Date(fileMeta.createdAt).toLocaleDateString()}
            <br/>
            Modified on{" "}
            {new Date(fileMeta.updatedAt).toLocaleDateString()}
          </Typography>

          <Box>
            {currentVersion && (
              <Button
                component="a"
                href={currentVersion.url}
                download={currentVersion.filename}
                size="medium"
              >
                {fileListProperties.buttonDownloadText}
              </Button>
            )}

            {fileListProperties.showEditButton && (
              <IconButton onClick={onEdit} size="small">
                <EditIcon fontSize="small" />
              </IconButton>
            )}

            {fileListProperties.showDeleteButton && (
              <IconButton
                onClick={() => domain.deleteFile(fileMeta.id)}
                size="small"
                color="error"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
          {fileListProperties.showDeleteButton && (
            <>
            <Box>
                <Button
                    component="a"
                    href=""
                    onClick={() => navigate(`/filefeedbackdetail/${currentVersion?.id}`)}
                    size="medium"
                  >
                View Feedback
              </Button>
              </Box>
              <Box>
            </Box>
            </>
            )}
        </Stack>
      </Grid>
    </Box>
  );
};

export default FileListDetailsForm;
