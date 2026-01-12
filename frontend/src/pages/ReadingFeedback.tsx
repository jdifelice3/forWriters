"use client";

import { useState, useEffect } from "react";
import { useGroupContext } from "../context/GroupContextProvider";
import { useFiles } from "../hooks/file/useFiles";
import { useFileDomain } from "../hooks/file/useFileDomain";
import { useFilesData } from "../hooks/file/useFilesData";
import { useFileUI } from "../hooks/file/useFileUI";
import { useReadings } from "../hooks/reading/useReadings";
import { useReadingDomain } from "../hooks/reading/useReadingDomain";
import { useReadingData } from "../hooks/reading/useReadingsData";
import { UploadFileFormProperties } from "../types/FileTypes";
import { AppFile, AppFileMeta, Reading, ReadingParticipant, ReadingSubmission } from "../types/domain-types";
import { useParams } from "react-router-dom";
import { generateRandomString } from "../util/Math";
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
    const { canReview, loadExtractedComments } = useReadingDomain(activeGroup?.id, user, refresh);

    const [editFile, setEditFile] = useState<AppFile | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [eventTitle, setEventTitle] = useState("");
      
    if ( !activeGroup || !reading || isReadingLoading) {
        return (
      <Box display="flex" justifyContent="center" p={6}>
        <CircularProgress size={24} />
      </Box>
    )};
    
    const onUploadFeedback = async(formData: FormData) => {
        const appFile = await uploadFeedback(formData);
        const submissionId = formData.get("submissionId")?.toString();
        if(!reading || !submissionId) return;
        
        loadExtractedComments(reading.id, submissionId);
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
    <Box sx={{ 
        maxWidth: 750, 
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
        <Typography variant="body1" color="text.secondary">
          No files uploaded yet.
        </Typography>
      ) : (
        
        <Stack direction="column" alignItems="left" gap={1} my={1}>
{/* Reading Submissions MAP */}
          {reading && reading.readingSubmission.map((rs: any) => (
            <Grid size={{xs:12, md:6}} key={rs.id}>
              <Card>
                <CardContent>
                  <Stack direction="column" alignItems="left" gap={1} my={1}>         
                      <Stack direction="row" alignItems="center" gap={1} mb={1}>
                        {rs.appFile ? (
                            <FileIcon file={(rs.appFile) ? rs.appFile : undefined} />
                        ) : (
                            <CancelIcon/>
                        )}
                        
                        <Typography variant="subtitle1" fontWeight="bold">
                          {rs.appFile ? rs.appFile.title : ""}
                        </Typography>
                      </Stack>
                    {rs.appFile && rs.authorAppFile?.appFile.user.userProfile ? (
                      <Typography sx={{verticalAlign: "top"}} variant="body2">
                        by {rs.authorAppFile?.appFile.user.userProfile.firstName} {rs.authorAppFile?.appFile.user.userProfile.lastName}
                      </Typography>
                    ) : (
                      <div></div>
                    )}
                  </Stack>
                  {rs.appFile ? (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {rs.appFile.appFileMeta.description}
                  </Typography>

                    ) : (
                        <div></div>
                    )}
                  {rs.appFile ? (
                      <Typography variant="caption" color="text.secondary">
                        Uploaded on {rs.appFile ? new Date(rs.appFile.uploadedAt).toLocaleDateString() : ""}
                      </Typography>
                    ) : (
                      <Typography>
                        The author has not yet uploaded a manuscript
                      </Typography>
                    )}
                  <CardActions>
                  {rs.appFile ? (
                  <Button 
                      href={rs.appFile.url} download={rs.appFile.filename} 
                      size="small"
                      sx={{borderColor: "primary.main"}}
                      startIcon={<DownloadIcon />}
                  >
                    Download Manuscript
                  </Button>
                  ) : (<div></div>)
                }
                </CardActions>
                <Paper className={canReview(reading.id, user.id) ? "" : "disabled"}
                    // to disable CardsF
                    elevation={0}
                >
                  {rs.appFile ? (
                    <>
                    <Typography variant="h5" sx={{mt: 4, mb: 2}}>
                        {uploadFormProperties.subtitle}
                    </Typography>
{/* UploadFileFormFeedback */}
                    <UploadFileFormFeedback
                        domain={domain}
                        submissionId={rs.id}
                    />
                    </>
                  ) : (
                  <div></div>)
                }
                </Paper>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Stack>
        
      )}
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