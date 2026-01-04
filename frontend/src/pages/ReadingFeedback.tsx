"use client";

import { useState, useEffect } from "react";
import { useReadings } from "../hooks/reading/useReadings";
import { useReadingData } from "../hooks/reading/useReadingsData";
import { UploadFileFormProperties } from "../types/FileTypes";
import { AppFile, AppFileMeta, Reading, ReadingParticipant, ReadingSubmission } from "../types/domain-types";
import { useParams } from "react-router-dom";
import { generateRandomString } from "../util/Math";
import UploadFileDataFeedback from "../components/file/data/UploadFileDataFeedback";
import FileIcon from "../components/controls/FileIcon";
import {
  Paper,
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
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
  const { readingId } = useParams<{ readingId: string }>();
  const { readings, isLoading: isReadingLoading } = useReadings();
  const reading = readings.find(r => r.id === readingId);
  const { isParticipant, myFiles } = useReadingData(reading, user);

  const [editFile, setEditFile] = useState<AppFile | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [reload, setReload] = useState("");
    
  const eventFeedbackUrl = `${import.meta.env.VITE_API_HOST}/api/readings/${readingId}/feedback`;
  
//   // Fetch uploaded files
//   useEffect(() => {
//     (async () => {
//       const res = await fetch(readingUrl, 
//       { 
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: "include"
//       });
      
//       if (res.ok) {
//         const data: Reading = await res.json();
//         setEventTitle(data.name);
//         if(data.readingParticipant && data.readingParticipant.length > 0){
//           setReading(data);
//           const files: AppFile[] = [];
//           data.readingParticipant.forEach((a: any) => {
//             if(a.authorAppFile){
//                 files.push(a.authorAppFile.appFile);
//             }
//             setFiles(files);
//           });
//         }
//       }
//     })();
//   }, [reload]);

  const reloadFromUploadForm = async(file: AppFile, readingId?: string) => {
    const result = await fetch(eventFeedbackUrl, 
        { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ readingId: readingId, userId: user.id, appFileId: file.id }),
          credentials: "include"
        });
    if(result.ok){
      setReload(generateRandomString(8));
    }    
  }

  const userHasSubmittedFeedback = (rs: ReadingSubmission, userId: string) => {
    /*
      if a user has submitted feedback:
      readingAuthor.readingFeedback.AppFile.userid = current user id
    */
    if(rs.readingFeedback.length === 0) return false;
    let findIndex = -1;
    for(let i = 0; i < rs.readingFeedback.length; i++){
      findIndex = rs.readingFeedback.findIndex(item => item.reviewerParticipantId === userId);
    }
    return findIndex !== -1;

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
        Reading Date: {new Date(reading!.readingDate || "").toLocaleDateString()}
      </Typography>
      {reading && reading.readingParticipant.findIndex(rp => rp.readingSubmission?.appFile.appFileMeta !== null) === -1 ? (
        <Typography variant="body1" color="text.secondary">
          No files uploaded yet.
        </Typography>
      ) : (
        
        <Stack direction="column" alignItems="left" gap={1} my={1}>
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
                <Paper className={userHasSubmittedFeedback(rs, user.id) || rs.participantId === user.id ? "disabled" : ""}
                    // to disable CardsF
                    elevation={0}
                >
                  {rs.appFile ? (
                    <>
                    <Typography variant="h5" sx={{mt: 4, mb: 2}}>
                        {uploadFormProperties.subtitle}
                    </Typography>
                    <UploadFileDataFeedback onSendData={reloadFromUploadForm} readingAuthorId={rs.participantId} />
                    {userHasSubmittedFeedback(rs, user.id) ? (
                        <Typography 
                            sx={{color: "green", fontWeight: "bold", mt: 2}}>
                                You have submitted feedback for this story
                        </Typography>
                    ) : (
                        <span>&nbsp;</span>
                    )}
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