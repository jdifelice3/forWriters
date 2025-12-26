"use client";

import { FileListProperties } from '../../../types/FileTypes';
import { AppFileMeta } from "../../../types/domain-types";
import { FileCommands, FileListFormCommands } from '../../../types/FileTypes';
import {
  Button,
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import FileIcon from '../../controls/FileIcon';
import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface LocalCommands {
    edit(file: AppFileMeta): void;
    delete(file: AppFileMeta): void;
}

interface FileListFormProps {
    fileMeta: AppFileMeta;
    commands: FileCommands;
    localCommands: LocalCommands;
    fileListProperties: FileListProperties
}

const FileListDetailsForm: React.FC<FileListFormProps> = (
    {fileMeta, commands, localCommands, fileListProperties}) => {
        const fileVersion = fileMeta.appFile.find(f => fileMeta.currentVersionId === f.version);

    return (
        <Box>
            <Grid container spacing={2}>
                <Stack spacing={2} sx={{width:"500px"}}> 
                    <Stack direction="row" alignItems="center" gap={1} mb={1}>
                        <FileIcon file={fileVersion} />
                        <Typography fontWeight="bold"
                            sx={{fontSize: 14}}
                        >
                            {fileMeta.title}
                        </Typography>
                    </Stack>

                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                        align="justify"
                    >
                        {fileMeta.description || "No description"}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Uploaded on {new Date(fileMeta.updatedAt).toLocaleDateString()}
                    </Typography>
                    <Box>
                        <Button component="a" href={fileVersion?.url} download={fileVersion?.filename} size="small" 
                            sx={{fontSize: 14}}
                        >
                            {fileListProperties.buttonDownloadText}
                        </Button>
                        {fileListProperties.showEditButton ? (
                        <IconButton onClick={() => localCommands.edit(fileMeta)} size="small">
                            <EditIcon fontSize="small" />
                        </IconButton>
                        ) : (
                            <div></div>
                        )}
                        {fileListProperties.showDeleteButton ? (
                        <IconButton
                            onClick={() => commands.delete(fileMeta)}
                            size="medium"
                            color="error"
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                        ) : (
                            <div></div>
                        )}
                    </Box>
                </Stack>
            </Grid>
        </Box>
    )
}

export default FileListDetailsForm; 