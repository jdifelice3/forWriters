"use client";

import { useState, useEffect } from "react";
import { useGroupContext } from "../context/GroupContextProvider";
import { useFileDomain } from "../hooks/file/useFileDomain";
import { useReadings } from "../hooks/reading/useReadings";
import { useReadingDomain } from "../hooks/reading/useReadingDomain";
import { UploadFileFormProperties } from "../types/FileTypes";
import { AppFile, Reading, ReadingSubmission } from "../types/domain-types";
import { useParams } from "react-router-dom";
import FileIcon from "../components/controls/FileIcon";
import {
  Paper,
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
  TextField,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from '@mui/icons-material/Download';
import { useUserContext } from "../context/UserContext";
import CancelIcon from '@mui/icons-material/Cancel';
import { FileDomainCommands } from "../types/FileTypes";
import { CommentDTO } from "../types/FeedbackTypes";
import { ManuscriptReview } from "../components/review/ManuscriptReview";
import { getUtilityComponentName } from "node_modules/mui-tiptap/dist/cjs/styles";

const uploadFormProperties: UploadFileFormProperties =
  {
    title: "",
    subtitle: "Upload the author's Word Doc with your inline comments",
    buttonChooseFileText: "CHOOSE FILE",
    buttonUploadText: "UPLOAD",
    titleVariant: "body1",
    showUploadIcon: false
  }

const FileFeedback = () => {
    const { user } = useUserContext();
    const { 
        saveMetadata, 
        deleteFile, 
        uploadVersion, 
        uploadManuscript,
        setActiveVersion, 
        getFileFeedback,
        getComments
      } = useFileDomain();

    const { activeGroup } = useGroupContext();
    const { readingId } = useParams<{ readingId: string }>();
    const { readings, isLoading: isReadingLoading, refresh } = useReadings();
    const reading: Reading | undefined = readings.find(r => r.id === readingId);
    const { canReview, getManuscriptHtml } = useReadingDomain(activeGroup?.id, user, refresh);
    const [editFile, setEditFile] = useState<AppFile | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [eventTitle, setEventTitle] = useState("");
    const [manuscriptHtmlBySubmission, setManuscriptHtmlBySubmission] = useState<Record<string, string>>({});
    const [fileFeedbackIds, setFileFeedbackIds] = useState<Record<string, string>>({});
    const [initialComments, setInititalComments] = useState<Record<string, CommentDTO[]>>({});
    
    //getFileFeedback()
    useEffect(() => {
        if (!reading) return;
        
        let cancelled = false;

        async function loadMissing() {
            const updates: Record<string, string> = {};
            const ids = await getFileFeedback(reading ?? null);

            const initComments: Record<string, CommentDTO[]> = {};
            const entries = Object.entries(ids);

            for (let i = 0; i < entries.length; i++) {
                let [key, value] = entries[i];
                initComments[key] = await getComments(value);
            }
            setFileFeedbackIds(ids);
            setInititalComments(initComments);
            for (const rs of reading!.readingSubmission) {
                if (!rs.appFile) continue;

                // guard: already loaded
                if (manuscriptHtmlBySubmission[rs.id]) continue;

                const html = await getManuscriptHtml(reading!.id, rs.id);
                if (html) {
                    updates[rs.id] = html;
                }
            }

            if (!cancelled && Object.keys(updates).length > 0) {
                setManuscriptHtmlBySubmission(prev => ({
                    ...prev,
                    ...updates,
                }));
            }
        }

        loadMissing();

        return () => {
            cancelled = true;
        };
    }, [
        reading?.id,                       
        reading?.readingSubmission.length, 
        manuscriptHtmlBySubmission,        
    ]);

    if ( !activeGroup || !reading ) {
        return (
            <Box display="flex" justifyContent="center" p={6}>
                <CircularProgress size={24} />
            </Box>
    )};
    
    const domain: FileDomainCommands = {
        saveMetadata:saveMetadata,
        deleteFile: deleteFile,
        uploadVersion: uploadVersion,
        uploadManuscript: uploadManuscript,
        setActiveVersion: setActiveVersion,
        getFileFeedback: getFileFeedback,
        getComments: getComments
    }

  return (
    <Box 
        sx={{ 
            maxWidth: 900, 
            mx: "auto", 
            p: 0,
            marginLeft: "55px",
            
        }}>
        <Typography variant="h4" mb={3} textAlign="left">
            {eventTitle}
        </Typography>
        <Typography variant="h4" mb={2}>
            Manuscripts to Review
        </Typography>
        <Typography variant="h6">
            Reading: {reading?.name}
        </Typography>
        <Typography variant="h6">
            Date: {new Date(reading!.readingDate || "").toLocaleDateString()}
        </Typography>
            {reading && reading.readingParticipant.findIndex(rp => rp.readingSubmission?.appFile.appFileMeta !== null) === -1 ? (
                <Card>
                    <CardContent>
                        <Typography variant="body1" color="text.secondary">
                            No files uploaded yet.
                        </Typography>
                    </CardContent>
                </Card>
            ) : (
                reading.readingSubmission.map((rs: ReadingSubmission) => (
                    <Card>
                        <CardContent>
                            <Grid container>
                                <Grid size={{xs:12, md:9}} key={rs.id}>
                                    <Typography variant="h4" fontWeight="bold">
                                        {rs.appFile.appFileMeta.title}
                                    </Typography>
                                    <Typography
                                            align="justify"
                                            variant="body1"
                                            color="text.secondary"
                                            sx={{ mb: 2, mt: 2, mr:-4}}
                                    >
                                        {rs.appFile.appFileMeta.description}
                                    </Typography>
                                            {manuscriptHtmlBySubmission[rs.id] ? (
                                            <ManuscriptReview
                                                html={manuscriptHtmlBySubmission[rs.id]}
                                                initialComments={initialComments[rs.id]}
                                                fileFeedbackId={fileFeedbackIds[rs.id]}
                                                reviewerUserId={user.id}
                                            />
                                            ) : (
                                                <CircularProgress size={20} />
                                            )}
                                    </Grid>
                                </Grid>
                        </CardContent>
                    </Card>
                )
            ))}
      
      {/* Edit dialog */}
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
      </Dialog>
    </Box>
  );
}

export default FileFeedback;