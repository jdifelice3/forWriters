import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { ReadingAuthor, ReadingAuthorByUser } from "../../../backend/src/domain-types";
import {
    Alert,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  Divider,
  Popover,
  TextField
} from "@mui/material";
import Grid from "@mui/material/Grid";
// import FileIcon from "../components/FileIcon";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FileSelect from "../components/FileSelect";
import { FileListProperties } from '../types/File';
import InfoIcon from '@mui/icons-material/Info';
import FeedbackCommentList from "../components/FeedbackCommentList";

const fileListProperties: FileListProperties =
  {
    fileType: "DOCX",
    showPreviewButton: true,
    buttonDownloadText: "DOWNLOAD",
    showDeleteButton: true,
    showEditButton: true 
  }

const styles = {
    marginLeft: '75px' // or a responsive value
};

const currentDate = new Date();

const Readings = () => {
    const { user, isLoading } = useUserContext();
    const [readingAuthor, setReadingAuthor] = useState <ReadingAuthorByUser>();
    const [anchorEl, setAnchorEl] = useState(null);
    const [error, setError] = useState<string | null>(null);

    const readingsUrl = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/events/user/author`;
    const addFileToReadingUrl = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/events/file/add`;
    
    useEffect(() => {
        if(!user) return;
        (async () => {
            console.log('readingsUrl',readingsUrl);
        const res = await fetch(`${readingsUrl}`, {
            credentials: "include",
        });
        if (res.ok) {
            const data: ReadingAuthorByUser[] = await res.json();
            //There is only one ReadingAuthor on this page
            console.log('readingAuthor', data[0]);
            setReadingAuthor(data[0]);
            if(!data[0]){
                setError("You have not signed up for any readings");
            }
        }
        })();
  }, [user]);
  
  const handleSelectChange = async(readingAuthorId: string, fileId: string) => {
    const res = await fetch(addFileToReadingUrl, {
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({readingAuthorId: readingAuthorId, appFileId: fileId}),
    });
    if (res.ok) {

    }
  }

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget); // Set anchor to the clicked button
  };

  const handleClose = () => {
    setAnchorEl(null); // Close the popover
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

    return (
    <>
        <Box mt={3}>
            {error && (
                <Alert severity="error" sx={{ mt: 3 }}>
                    {error}
                </Alert>
            )}
        </Box>
        {readingAuthor !== undefined ? (
            <Card style={styles} sx={{ maxWidth: 750, mx: "auto", p: 4}}>
                <CardContent>
                    <Typography variant="h4" mb={2}>
                    <MenuBookIcon 
                        sx={{ 
                        fontSize: '44px',
                        verticalAlign: "bottom", 
                        }}
                    />&nbsp;
                    Readings
                    </Typography>
                    
                    <Grid container spacing={2}>
                        <Grid size={12} key={1}>
                        <Box 
                            sx={{
                            border: "1px solid #ddd",
                            p: 2,
                            borderRadius: 2,
                            backgroundColor:
                                new Date(readingAuthor.reading.submissionDeadline) > currentDate && (!readingAuthor.authorAppFile)
                                ? "#e3f2fd"
                                : "#e3f2fd"
                            }}  
                            // ,"#e3f2fd" #f3e5f5
                        >
                            <Typography variant="h6" fontWeight="bold">
                            {readingAuthor.reading.name }
                            </Typography>
                            {/* <Typography>
                                Group Name Goes Here
                            </Typography> */}
                            <Typography variant="body2">
                            Date of Reading: <span style={{fontWeight: "bold"}}>{new Date(readingAuthor.reading.readingDate).toLocaleDateString()}</span>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            Submit manuscripts by <b>{new Date(readingAuthor.reading.submissionDeadline).toLocaleDateString()}</b>
                            </Typography>
                            <Divider sx={{ my: 1 }} />
                            <Typography variant="body1" fontWeight="bold">
                            Submitted Manuscript: <InfoIcon style={{ cursor: 'pointer' }} onClick={handleClick}/>
                            </Typography>
                            <div>
                            {new Date(readingAuthor.reading.submissionDeadline).valueOf() > currentDate.valueOf() ? (
                            <FileSelect 
                                onSendData={handleSelectChange} 
                                readingAuthorId={readingAuthor.id} 
                                selectedValueId={readingAuthor.authorAppFile?.appFile.id || ""}
                                fileListProperties={fileListProperties}
                                />
                            ) : (
                            <TextField
                                variant="outlined"
                                sx={{ width: 360 }}
                                disabled
                                value={readingAuthor.authorAppFile?.appFile.title || ""}
                            />
                            )}
                            <Popover
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                >
                                <Typography sx={{ p: 2 }}>
                                    <span style={{fontWeight: "bold"}}>Submission Rules:</span>
                                    <ul>
                                    <li>You may change your manuscript until the submission deadline</li>
                                    <li>Available files are ones you have already uploaded</li>
                                    </ul>
                                    <Button onClick={handleClose}>Close</Button>
                                </Typography>                
                            </Popover>
                            </div>
                            <Typography variant="caption" color="text.secondary">
                                Submitted to Reading on {
                                    readingAuthor.authorAppFile ?
                                    new Date(readingAuthor.authorAppFile.createdAt).toLocaleDateString()
                                    : "N/A"
                                }
                            </Typography>
                            <Divider sx={{ mb: 2, mt: 1 }} />
                            <Typography variant="body1" fontWeight="bold">
                                Feedback:
                            </Typography>
                                <FeedbackCommentList readingAuthor={readingAuthor}/>
                                {/* {readingAuthor.readingFeedback && readingAuthor.readingFeedback.map((fb) =>(
                                    {fb.readingFeedbackComment}
                                ))};
                             */}
                            
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        ) : (
            <div></div>
        )}
    </>
    )
}
export default Readings;
