"use client";

import { useState, useEffect } from "react";
import { useGroupContext } from "../context/GroupContextProvider";
import { useFileDomain } from "../hooks/file/useFileDomain";
import { useReadings } from "../hooks/reading/useReadings";
import { useReadingDomain } from "../hooks/reading/useReadingDomain";
import { UploadFileFormProperties } from "../types/FileTypes";
import { AppFile, ReadingSubmission } from "../types/domain-types";
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
import { UploadFileFormFeedback } from "../components/file/forms/UploadFileFormFeedback";
//import Editor from "../components/richTextEditor/Editor";
import useExtensions from "../components/richTextEditor/useExtensions";
import { RichTextReadOnly } from "mui-tiptap";
import { Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ManuscriptReview } from "../components/review/ManuscriptReview";
import { ReviewHTML } from "../types/ReviewTypes";

const uploadFormProperties: UploadFileFormProperties =
  {
    title: "",
    subtitle: "Upload the author's Word Doc with your inline comments",
    buttonChooseFileText: "CHOOSE FILE",
    buttonUploadText: "UPLOAD",
    titleVariant: "body1",
    showUploadIcon: false
  }

const ReadingFeedback = () => {
    const { user } = useUserContext();
    const { 
        saveMetadata, 
        deleteFile, 
        uploadVersion, 
        uploadManuscript,
        uploadFeedback, 
        setActiveVersion 
      } = useFileDomain();

    const { activeGroup } = useGroupContext();
    const { readingId } = useParams<{ readingId: string }>();
    const { readings, isLoading: isReadingLoading, refresh } = useReadings();
    const reading = readings.find(r => r.id === readingId);
    const { canReview, getManuscriptHtml } = useReadingDomain(activeGroup?.id, user, refresh);
    const extensions = useExtensions({placeholder: ""});
    const [editFile, setEditFile] = useState<AppFile | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [eventTitle, setEventTitle] = useState("");
    const [manuscriptHtmlBySubmission, setManuscriptHtmlBySubmission] = useState<Record<string, string>>({});
    
    useEffect(() => {
  if (!reading) return;

  let cancelled = false;

  async function loadMissing() {
    const updates: Record<string, string> = {};

    for (const rs of reading!.readingSubmission) {
      if (!rs.appFile) continue;

      // 🔒 guard: already loaded
      if (manuscriptHtmlBySubmission[rs.id]) continue;

      const html = await getManuscriptHtml(reading!.id, rs.id);
      if (html) {
        updates[rs.id] = html;
      }
    }

    // 🔒 only update state if we actually added something
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
    
    const onUploadFeedback = async(formData: FormData) => {
        const appFile = await uploadFeedback(formData);
        const submissionId = formData.get("submissionId")?.toString();
        if(!reading || !submissionId) return;
    }

    const domain: FileDomainCommands = {
        saveMetadata:saveMetadata,
        deleteFile: deleteFile,
        uploadVersion: uploadVersion,
        uploadManuscript: uploadManuscript,
        uploadFeedback: onUploadFeedback,
        setActiveVersion: setActiveVersion,
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
                                    {/* <Typography sx={{verticalAlign: "top"}} variant="body2">
                                        by {rs.appFile.appFileMeta.user.userProfile?.firstName} {rs.appFile.appFileMeta.user.userProfile?.lastName}
                                    </Typography> */}
                                    <Typography
                                            variant="body1"
                                            color="text.secondary"
                                            sx={{ mb: 2, mt: 2, }}
                                    >
                                        {rs.appFile.appFileMeta.description}
                                    </Typography>
                                            {manuscriptHtmlBySubmission[rs.id] ? (
                                            <ManuscriptReview
                                                html={manuscriptHtmlBySubmission[rs.id]}
                                                initialComments={[]}
                                            />
                                            ) : (
                                                <CircularProgress size={20} />
                                            )}

                                        {/* {rs.appFile && rs.appFile.user.userProfile ? (
                                            <Typography sx={{verticalAlign: "top"}} variant="body2">
                                                by {rs.appFile.user.userProfile.firstName} {rs.appFile.user.userProfile.lastName}
                                            </Typography>
                                        ) : (
                                            <div></div>
                                        )} */}
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

export default ReadingFeedback;