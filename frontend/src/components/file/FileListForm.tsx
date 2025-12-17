"use client";

import { FileListProperties } from '../../types/File';
import { AppFile } from "../../types/domain-types";
import { FileCommands, FileListFormCommands } from '../../types/File';
import {
  Button,
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import FileIcon from './FileIcon';
import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface LocalCommands {
    edit(file: AppFile): void;
    delete(file: AppFile): void;
}

interface FileListFormProps {
    file: AppFile;
    commands: FileCommands;
    localCommands: LocalCommands;
    fileListProperties: FileListProperties
}

const FileFormList: React.FC<FileListFormProps> = (
    {file, commands, localCommands, fileListProperties}) => {
  
    return (
        <Box>
            <Grid container spacing={2}>
                <Stack spacing={2} sx={{width:"500px"}}> 
                    <Stack direction="row" alignItems="center" gap={1} mb={1}>
                        <FileIcon file={file} />
                        <Typography variant="subtitle1" fontWeight="bold">
                            {file.title}
                        </Typography>
                    </Stack>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                    >
                        {file.description || "No description"}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Uploaded on {new Date(file.uploadedAt).toLocaleDateString()}
                    </Typography>
                    <Box>
                        <Button component="a" href={file.url} download={file.filename} size="small">
                            {fileListProperties.buttonDownloadText}
                        </Button>
                        {fileListProperties.showEditButton ? (
                        <IconButton onClick={() => localCommands.edit(file)} size="small">
                            <EditIcon fontSize="small" />
                        </IconButton>
                        ) : (
                            <div></div>
                        )}
                        {fileListProperties.showDeleteButton ? (
                        <IconButton
                            onClick={() => localCommands.delete(file)}
                            size="small"
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

export default FileFormList; 