"use client";

import { useState, useEffect } from "react";
import { AppFile, UploadFileFormProperties } from "../types/FileTypes";
import { EventType, Submission } from "../types/EventTypes";
import { Variant } from "../types/StyleTypes";
import { useParams } from "react-router-dom";
import { generateRandomString } from "../util/Math";
import UploadFileForm from "../components/UploadFileForm";
import FileIcon from "../components/FileIcon";
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

const uploadFormProperties: UploadFileFormProperties =
  {
    title: "",
    subtitle: "Upload the author's Word Doc with your comments",
    buttonChooseFileText: "CHOOSE FILE",
    buttonUploadText: "UPLOAD",
    titleVariant: "body1",
    showUploadIcon: false
  }

const ReadingFeedback = () => {
  const { user } = useUserContext();
  const { eventId } = useParams<{ eventId: string }>();
  const [feedbackEventId, setFeedbackEventId] = useState("");
  const [files, setFiles] = useState<AppFile[]>([]);
  const [events, setEvents] = useState<EventType>();
  const [editFile, setEditFile] = useState<AppFile | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [previewFile, setPreviewFile] = useState<AppFile | null>(null);
  const [eventTitle, setEventTitle] = useState("");
    
  const eventSubmissionUrl = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/events/${eventId}/submissions`;
  const eventFeedbackUrl = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/events/${eventId}/feedback`;
  
  const pdfsUrl = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/pdfs`;
  
  const fileUploadsUrl = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/uploads`;
  const [reload, setReload] = useState("");
  console.log(eventSubmissionUrl);
  // Fetch uploaded files
  useEffect(() => {
    (async () => {
      const res = await fetch(eventSubmissionUrl, 
      { 
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include"
      });
      
      if (res.ok) {
        const data: EventType = await res.json();
        const _eventDate = new Date(data.eventDate).toLocaleDateString('en-US');
        let t = `Current Reading - ${_eventDate}`;
        setEventTitle(data.eventSubmission.length > 0 ? t : 'Reading')
        if(data.eventSubmission && data.eventSubmission.length > 0){
          setEvents(data);
          let files: AppFile[] = [];
          data.eventSubmission.forEach((s: Submission) => {
            files.push(s.appFiles); // Correctly accessing 'files' array
            setFiles(files);
          });
        }
      }
    })();
  }, [reload]);

  const reloadFromUploadForm = async(file: AppFile, eventId?: string) => {
    //setFeedbackEventId(eventId);
    const result = await fetch(eventFeedbackUrl, 
        { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ eventId: eventId, userId: user.id, appFileId: file.id }),
          credentials: "include"
        });
    if(result.ok){
      setReload(generateRandomString(8));
    }    
  }

  const userHasSubmitted = (events: EventType, signUpId: string, userId: string) => {
      let result = false;
      events.eventSubmission.forEach((s, index) => {
        if (signUpId === s.id && s.userId === userId) {
          result = true;
        }
      });

      return result;  
  }

  return (
    <Box sx={{ 
        maxWidth: 900, 
        mx: "auto", 
        p: 4,
        marginLeft: "100px",
      }}>
      <Typography variant="h4" mb={3} textAlign="left">
        {eventTitle}
      </Typography>
      <Typography variant="h6" mb={2}>
        Manuscripts to Review
      </Typography>

      {!events ? (
        <Typography variant="body1" color="text.secondary">
          No files uploaded yet.
        </Typography>
      ) : (
        <div>
        <Stack direction="column" alignItems="left" gap={1} my={1}>
          {events.eventSubmission.map((s:Submission) => (
            <Grid size={{xs:12, md:6}} key={s.id}>
              <Card>
                <CardContent>
                  <Stack direction="column" alignItems="left" gap={1} my={1}>         
                      <Stack direction="row" alignItems="center" gap={1} mb={1}>
                        <FileIcon file={s.appFiles} />
                        <Typography variant="subtitle1" fontWeight="bold">
                          {s.appFiles ? s.appFiles.title : ""}
                        </Typography>
                      </Stack>
                    <Typography sx={{verticalAlign: "top"}} variant="body2">
                      by {s.appFiles.users.userProfiles.firstName} {s.appFiles.users.userProfiles.lastName}
                    </Typography>
                  </Stack>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {s.appFiles ? s.appFiles.description : "No description"}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Uploaded on {s.appFiles ? new Date(s.appFiles.uploadedAt).toLocaleDateString() : ""}
                  </Typography>
                <CardActions>
                  <Button 
                      href={`${fileUploadsUrl}/${s.appFiles.filename}` } download={s.appFiles.filename} 
                      size="small"
                      sx={{borderColor: "primary.main"}}
                      startIcon={<DownloadIcon />}
                  >
                    Download Manuscript
                  </Button>
                  
                </CardActions>
                <Paper 
                // to disable Cards
                    elevation={2}
                    style={{
                      opacity: (userHasSubmitted(events, s.id, s.userId) ? 0.5 : 1),
                      pointerEvents: (userHasSubmitted(events, s.id, s.userId) ? 'none' : 'auto')
                    }}
                >
                  <UploadFileForm onSendData={reloadFromUploadForm} eventId={s.eventId} formProperties={uploadFormProperties} isUserDisabled={false} />
                </Paper>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Stack>
        </div>
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

      {/* Preview dialog */}
      <Dialog
        open={!!previewFile}
        onClose={() => setPreviewFile(null)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {previewFile?.title}
          <IconButton
            onClick={() => setPreviewFile(null)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          {previewFile &&
            (previewFile.mimetype.startsWith("image/") ? (
              <img
                src={previewFile.url}
                alt={previewFile.title}
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            ) : previewFile.mimetype === "application/pdf" || "PDF" ? (
              <iframe
                src={`${pdfsUrl}?url=${previewFile.url}`}
                title="PDF Preview"
                width="100%"
                height="100%"
                style={{ border: "none" }}
              />
            ) : (
              <Typography variant="body1" color="text.secondary">
                Preview not available for this file type.
              </Typography>
            ))}
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default ReadingFeedback;