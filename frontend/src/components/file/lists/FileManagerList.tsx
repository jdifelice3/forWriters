"use client";

import { useState } from "react";
import { FileListProperties } from '../../../types/FileTypes';
import { AppFileMeta } from "../../../types/domain-types";
import { FileCommands } from "../../../types/FileTypes";
import FileListForm from "../forms/FileListDetailsForm";
import FileVersionList from "./FileVersionList";
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
    Grid
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

interface FileListProps {
  files: (AppFileMeta | undefined)[];
  commands: FileCommands;
  fileListProperties: FileListProperties;
}

interface LocalCommands {
    edit(file: AppFileMeta): void;
    delete(file: AppFileMeta): void;
    save(file: AppFileMeta): void;
}

const FileManagerList: React.FC<FileListProps> = ({files, commands, fileListProperties}) => {
    if(!files) return <Typography>You have not uploaded any files to readings</Typography>
    const [editFile, setEditFile] = useState<AppFileMeta | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    
    const onEdit = (file: AppFileMeta) => {
        setEditTitle(file.title);
        setEditDescription(file.description || "");
        setEditFile(file);
    }

    const onDelete = (file: AppFileMeta) => {
        setEditFile(null);
    }

    const onSave = async(file:AppFileMeta) => {
        setEditFile(null);
        await commands.save({
            ...file,
            title: editTitle,
            description: editDescription,
        });
    }

    const localCommands: LocalCommands = {
        edit: onEdit,
        delete: onDelete,
        save: onSave,
    }

  return (
        <>
        {files.length === 0 ? (
        <Box>
            <Typography variant="body1" color="text.secondary">
                There are no uploaded files.
            </Typography>
        </Box>
        ) : (
        <Box>
            {files.map((f, index) => (
            <Card key={index} className="filesCardManuscripts">
                <CardContent>
                    <Grid container spacing={4}>
                        <Grid size={fileListProperties.showVersionHistory ? 6 : 12}>
                            <FileListForm
                                fileMeta={f!} 
                                commands={commands}
                                localCommands={localCommands}
                                fileListProperties={fileListProperties} 
                            />
                        </Grid>
                        
                        {fileListProperties.showVersionHistory ? (
                        <Grid size={6}>
                            
                                <>
                                <Grid container>
                                    <Grid size={4}>
                                        <Typography fontWeight={"bold"}
                                            sx={{fontSize: 16, verticalAlign:"middle"}}
                                    >
                                            File Versions
                                        </Typography>
                                    </Grid>
                                    <Grid size={8}>
                                        <Button 
                                            component="a" 
                                            size="small" 
                                            sx={{fontSize: 12, verticalAlign:"top"}}
                                            onClick={(event) => commands.onVersionUpload(event, f!)}
                                        >
                                        Upload New Version
                                    </Button>
                            </Grid>
                            <Grid>
                                <Typography>
                                    Select default version
                                </Typography>
                            </Grid>
                            </Grid>
                                <FileVersionList 
                                    fileMeta={f!} 
                                    currentVersion={f?.currentVersionId!}
                                    handleVersionChange={commands.onVersionChange} />
                                    </>
                                                            </Grid>
                                
                            ) : (
                                <span></span>
                            )}

                    </Grid>
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
export default FileManagerList;