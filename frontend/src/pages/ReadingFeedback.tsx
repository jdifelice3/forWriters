"use client";

import { useState, useEffect } from "react";
import { UploadFileFormProperties } from "../types/FileTypes";
import { AppFile, AppFileMeta, Reading, ReadingAuthor } from "../types/domain-types";
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
    subtitle: "Upload the author's Word Doc with your comments",
    buttonChooseFileText: "CHOOSE FILE",
    buttonUploadText: "UPLOAD",
    titleVariant: "body1",
    showUploadIcon: false
  }

const ReadingFeedback = () => {
  const { user } = useUserContext();
  const { readingId } = useParams<{ readingId: string }>();
  //const [feedbackreadingId, setFeedbackreadingId] = useState("");
  const [files, setFiles] = useState<AppFile[]>([]);
  const [reading, setReading] = useState<Reading>();
  const [editFile, setEditFile] = useState<AppFile | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [previewFile, setPreviewFile] = useState<AppFileMeta | null>(null);
  const [eventTitle, setEventTitle] = useState("");
  const [reload, setReload] = useState("");
    
  //const eventSubmissionUrl = `${import.meta.env.VITE_API_HOST}/api/events/${readingId}/readingauthors`;
  const eventFeedbackUrl = `${import.meta.env.VITE_API_HOST}/api/events/${readingId}/feedback`;
  const readingUrl = `${import.meta.env.VITE_API_HOST}/api/events/${readingId}/reading`;
  const pdfsUrl = `${import.meta.env.VITE_API_HOST}/api/pdfs`;
  const fileUploadsUrl = `${import.meta.env.VITE_API_HOST}/uploads`;
  
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
        setEventTitle(data.name);
        if(data.readingAuthor && data.readingAuthor.length > 0){
          setReading(data);
          const files: AppFile[] = [];
          data.readingAuthor.forEach((a: any) => {
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

  const userHasSubmittedFeedback = (ra: ReadingAuthor, userId: string) => {
    /*
      if a user has submitted feedback:
      readingAuthor.readingFeedback.AppFile.userid = current user id
    */
    let findIndex = -1;
    for(let i = 0; i < ra.readingFeedback.length; i++){
      findIndex = ra.readingFeedback.findIndex(item => item.feedbackUserId === userId);
    }
    return findIndex !== -1;

  }

  return (
    <Box sx={{ 
        maxWidth: 750, 
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

      {reading && reading.readingAuthor.findIndex(item => item.authorAppFileMeta !== null) === -1 ? (
        <Typography variant="body1" color="text.secondary">
          No files uploaded yet.
        </Typography>
      ) : (
        
        <Stack direction="column" alignItems="left" gap={1} my={1}>
          {reading && reading.readingAuthor.map((ra: any) => (
            <Grid size={{xs:12, md:6}} key={ra.id}>
              <Card>
                <CardContent>
                  <Stack direction="column" alignItems="left" gap={1} my={1}>         
                      <Stack direction="row" alignItems="center" gap={1} mb={1}>
                        {ra.authorAppFile?.appFile ? (
                            <FileIcon file={(ra.authorAppFile) ? ra.authorAppFile?.appFile : undefined} />
                        ) : (
                            <CancelIcon/>
                        )}
                        
                        <Typography variant="subtitle1" fontWeight="bold">
                          {ra.authorAppFile?.appFile ? ra.authorAppFile?.appFile.title : ""}
                        </Typography>
                      </Stack>
                    {ra.authorAppFile && ra.authorAppFile?.appFile.user.userProfile ? (
                      <Typography sx={{verticalAlign: "top"}} variant="body2">
                        by {ra.authorAppFile?.appFile.user.userProfile.firstName} {ra.authorAppFile?.appFile.user.userProfile.lastName}
                      </Typography>
                    ) : (
                      <div></div>
                    )}
                  </Stack>
                  {ra.authorAppFile?.appFile ? (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {ra.authorAppFile?.appFile.description}
                  </Typography>

                    ) : (
                        <div></div>
                    )}
                  {ra.authorAppFile?.appFile ? (
                      <Typography variant="caption" color="text.secondary">
                        Uploaded on {ra.authorAppFile?.appFile ? new Date(ra.authorAppFile?.appFile.uploadedAt).toLocaleDateString() : ""}
                      </Typography>
                    ) : (
                      <Typography>
                        The author has not yet uploaded a manuscript
                      </Typography>
                    )}
                  <CardActions>
                  {ra.authorAppFile?.appFile ? (
                  <Button 
                      href={ra.authorAppFile?.appFile.url} download={ra.authorAppFile?.appFile.filename} 
                      size="small"
                      sx={{borderColor: "primary.main"}}
                      startIcon={<DownloadIcon />}
                  >
                    Download Manuscript
                  </Button>
                  ) : (<div></div>)
                }
                </CardActions>
                <Paper className={userHasSubmittedFeedback(ra, user.id) || ra.authorId === user.id ? "disabled" : ""}
                    // to disable CardsF
                    elevation={0}
                >
                  {ra.authorAppFile?.appFile ? (
                    <>
                    <Typography variant="h5" sx={{mt: 4, mb: 2}}>
                        Upload the author's Word Doc with your comments
                    </Typography>
                    <UploadFileDataFeedback onSendData={reloadFromUploadForm} readingAuthorId={ra.id} />
                    <Typography 
                        className={userHasSubmittedFeedback(ra, user.id) || ra.authorId === user.id ? "disabled" : ""}
                        sx={{color: "green", fontWeight: "bold", mt: 2}}>
                            You have submitted feedback for this story
                    </Typography>
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

      {/* Preview dialog */}
      {/* <Dialog
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
      </Dialog> */}
    </Box>
  );
}

export default ReadingFeedback;