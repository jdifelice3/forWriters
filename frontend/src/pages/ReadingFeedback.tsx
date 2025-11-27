"use client";

import { useState, useEffect } from "react";
import { UploadFileFormProperties } from "../types/File";
import { AppFile, Reading, ReadingAuthor } from "../../../backend/src/domain-types";
import { Variant } from "../types/Style";
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
  const { readingId } = useParams<{ readingId: string }>();
  
  const [feedbackreadingId, setFeedbackreadingId] = useState("");
  const [files, setFiles] = useState<AppFile[]>([]);
  const [reading, setReading] = useState<Reading>();
  const [editFile, setEditFile] = useState<AppFile | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [previewFile, setPreviewFile] = useState<AppFile | null>(null);
  const [eventTitle, setEventTitle] = useState("");
      
  const eventSubmissionUrl = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/events/${readingId}/readingauthors`;
  const eventFeedbackUrl = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/events/${readingId}/feedback`;
  const readingUrl = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/events/${readingId}/reading`;
  
  const pdfsUrl = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/pdfs`;
  
  const fileUploadsUrl = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/uploads`;
  const [reload, setReload] = useState("");

  console.log('user', user.id);
  // Fetch uploaded files
  useEffect(() => {
    (async () => {
      const res = await fetch(readingUrl, 
      { 
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include"
      });
      
      if (res.ok) {
        const data: Reading = await res.json();
        console.log('reading', data);
        const _eventDate = new Date(data.readingDate).toLocaleDateString('en-US');
        //let t = `Current Reading - ${_eventDate}`;
        //setEventTitle(data.readingAuthor.length > 0 ? t : 'Reading')
        setEventTitle(data.name);
        if(data.readingAuthor && data.readingAuthor.length > 0){
          setReading(data);
          console.log('findIndex appFileId',data && data.readingAuthor.findIndex(item => item.appFileId !== null) === -1);
          let files: AppFile[] = [];
          data.readingAuthor.forEach((a: ReadingAuthor) => {
            if(a.authorAppFile){
                files.push(a.authorAppFile.appFile);
            }
            setFiles(files);
          });
        }
      }
    })();
  }, [reload]);

  const reloadFromUploadForm = async(file: AppFile, readingId?: string) => {
    //setFeedbackreadingId(readingId);
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

  const userHasSubmittedFeedback = (readingAuthor: ReadingAuthor, userId: string) => {
    /*
    if a user has submitted feedback:
      readingAuthor.readingFeedback.AppFile.userid = current user id
    */
   let findIndex = -1;
    for(let i = 0; i < readingAuthor.readingFeedback.length; i++){
      findIndex = readingAuthor.readingFeedback.findIndex(item => item.feedbackUserId = userId);
    }
    return findIndex !== -1;

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

      {reading && reading.readingAuthor.findIndex(item => item.appFileId !== null) === -1 ? (
        <Typography variant="body1" color="text.secondary">
          No files uploaded yet.
        </Typography>
      ) : (
        <div>
        <Stack direction="column" alignItems="left" gap={1} my={1}>
          {reading?.readingAuthor.map((readingAuthor: ReadingAuthor) => (

            <Grid size={{xs:12, md:6}} key={readingAuthor.id}>
              <Card>
                <CardContent>
                  <Stack direction="column" alignItems="left" gap={1} my={1}>         
                      <Stack direction="row" alignItems="center" gap={1} mb={1}>
                        <FileIcon file={(readingAuthor.authorAppFile) ? readingAuthor.authorAppFile?.appFile : undefined} />
                        <Typography variant="subtitle1" fontWeight="bold">
                          {readingAuthor.authorAppFile?.appFile ? readingAuthor.authorAppFile?.appFile.title : ""}
                        </Typography>
                      </Stack>
                    {readingAuthor.authorAppFile && readingAuthor.authorAppFile?.appFile.user.userProfile ? (
                      <Typography sx={{verticalAlign: "top"}} variant="body2">
                        by {readingAuthor.authorAppFile?.appFile.user.userProfile.firstName} {readingAuthor.authorAppFile?.appFile.user.userProfile.lastName}
                      </Typography>
                    ) : (
                      <div></div>
                    )}
                      
                   
                  </Stack>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {readingAuthor.authorAppFile?.appFile ? readingAuthor.authorAppFile?.appFile.description : "No description"}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Uploaded on {readingAuthor.authorAppFile?.appFile ? new Date(readingAuthor.authorAppFile?.appFile.uploadedAt).toLocaleDateString() : ""}
                  </Typography>
                <CardActions>
                  <Button 
                      href={`${fileUploadsUrl}/${readingAuthor.authorAppFile?.appFile.filename}` } download={readingAuthor.authorAppFile?.appFile.filename} 
                      size="small"
                      sx={{borderColor: "primary.main"}}
                      startIcon={<DownloadIcon />}
                  >
                    Download Manuscript
                  </Button>
                  
                </CardActions>
                <Paper className={userHasSubmittedFeedback(readingAuthor, user.id) ? "disabled" : ""}
                // to disable Cards
                    elevation={2}
                    // style={{
                    //   opacity: (userHasSubmittedFeedback(readingAuthor, user.id) ? 0.5 : 1),
                    //   pointerEvents: (userHasSubmittedFeedback(readingAuthor, user.id) ? 'none' : 'auto')
                    // }}
                >
                  <UploadFileForm 
                    onSendData={reloadFromUploadForm} 
                    readingId={readingAuthor.id} 
                    formProperties={uploadFormProperties} 
                    isUserDisabled={false}
                    hasUserSubmitted={userHasSubmittedFeedback(readingAuthor, user.id)} 
                  />
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
            ) : previewFile.mimetype.startsWith("application/pdf") || previewFile.mimetype.startsWith("PDF") ? (
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