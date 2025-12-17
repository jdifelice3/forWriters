"use client";

import { useState } from "react";
import { FileListProperties } from '../../types/File';
import { AppFile } from "../../types/domain-types";
import { FileCommands } from "../../types/File";
import FileListForm from "./FileListForm";
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

interface FileListProps {
  files: AppFile[];
  commands: FileCommands;
  fileListProperties: FileListProperties;
}

interface LocalCommands {
    edit(file: AppFile): void;
    delete(file: AppFile): void;
    save(file: AppFile): void;
}

const FileList: React.FC<FileListProps> = ({files, commands, fileListProperties}) => {
    const [editFile, setEditFile] = useState<AppFile | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    
    const onEdit = (file: AppFile) => {
        setEditTitle(file.title);
        setEditDescription(file.description || "");
        setEditFile(file);
    }

    const onDelete = (file: AppFile) => {
        setEditFile(null);
    }

    const onSave = (file:AppFile) => {
        file.title = editTitle || "";
        file.description = editDescription   || "";
        console.log('file.description', file.description);
        setEditFile(null);
        commands.save(file);
    }

    const localCommands: LocalCommands = {
        edit: onEdit,
        delete: onDelete,
        save: onSave
    }
  return (
        <>
        {files.length === 0 ? (
        <Box>
            <Typography variant="body1" color="text.secondary">
                No files uploaded yet.
            </Typography>
        </Box>
        ) : (
        <Box>
            {files.map((f) => (
            <Card sx={{mb:4, mr: 2}}>
                <CardContent>
                <FileListForm
                    file={f} 
                    commands={commands}
                    localCommands={localCommands}
                    fileListProperties={fileListProperties} 
                />
            </CardContent>
            </Card>
            ))}
        </Box>
        )}
    <Dialog open={!!editFile} onClose={() => setEditFile(null)} fullWidth maxWidth="sm">
        <DialogTitle>
            Edit File Metadata
            <IconButton
                onClick={() => setEditFile(null)}
                sx={{ position: "absolute", right: 8, top: 8 }}
            >
            <CloseIcon />
            </IconButton>
        </DialogTitle>
        <DialogContent>
            <TextField
                label="Title"
                fullWidth
                sx={{ mt: 1 }}
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
            />
            <TextField
                label="Description"
                fullWidth
                sx={{ mt: 2 }}
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                multiline
                rows={3}
            />
        </DialogContent>
        <DialogActions>
            <Button startIcon={<SaveIcon />} onClick={(e) => localCommands.save(editFile!)}>
            Save
            </Button>
        </DialogActions>
    </Dialog>
</>
  )
}
export default FileList;