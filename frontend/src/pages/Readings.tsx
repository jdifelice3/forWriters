import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { 
    ReadingAuthorByUser,
    Reading
 } from "../../../backend/src/domain-types";
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
import { generateRandomString } from "../util/Math";
import Grid from "@mui/material/Grid";
// import FileIcon from "../components/FileIcon";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FileSelect from "../components/FileSelect";
import { FileListProperties } from '../types/File';
import InfoIcon from '@mui/icons-material/Info';
import FeedbackCommentList from "../components/FeedbackCommentList";
import wordIcon from '../assets/icons/icons8-word-file-48.png';
import { getCardBackgroundColor } from "../util/readingUtil";

const fileListProperties: FileListProperties =
  {
    fileType: "MANUSCRIPT",
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
    const [readingAuthor, setReadingAuthor] = useState <ReadingAuthorByUser[]>();
    const [anchorEl, setAnchorEl] = useState(null);
    const [error, setError] = useState<string | null>(null);

    const readingsUrl = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/events/user/author`;
    const addFileToReadingUrl = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/events/file/add`;
    
    useEffect(() => {
        if(!user) return;
        (async () => {

        const res = await fetch(`${readingsUrl}`, {
            credentials: "include",
        });
        if (res.ok) {
            const data: ReadingAuthorByUser[] = await res.json();
            
            //console.log('readingAuthor', data);
            setReadingAuthor(data);
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

  const canChangeManuscript = (r: Reading) => {
    if(r.scheduledType === "SCHEDULED"){
        return new Date(r.submissionDeadline || "").valueOf() > currentDate.valueOf()
    } else {
        return true; // As of now, users can can their manuscripts until it has been downloaded.
                     // TODO: LOG ALL FILE DOWNLOADS
    }
}

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

    return (
    <>
        
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
                    <Box mt={3}>
                        {error && (
                            <Alert severity="error" sx={{ mt: 3 }}>
                                {error}
                            </Alert>
                        )}
                    </Box>
                    <Grid container spacing={2}>
                    {readingAuthor.map((ra) => (
                        <Grid size={12}>
                        <Box 
                            sx={{
                            border: "1px solid #ddd",
                            p: 2,
                            borderRadius: 2,
                            backgroundColor: getCardBackgroundColor(ra.reading as Reading)
                                // new Date(ra.reading.submissionDeadline) > currentDate && (!ra.authorAppFile)
                                // ? "#e3f2fd"
                                // : "#e3f2fd"
                            }}  
                        >
                            <Typography variant="h6" fontWeight="bold">
                                {ra.reading.name }
                            </Typography>
                            {/* <Typography>
                                Group Name Goes Here
                            </Typography> */}
                            {ra.reading.scheduledType === "SCHEDULED" ? (
                                <>
                                <Typography variant="body2">
                                    Date of Reading: 
                                        <span style={{fontWeight: "bold"}}>
                                            {new Date(ra.reading.readingDate || "").toLocaleDateString()}
                                        </span>
                                    </Typography>
                                <Typography variant="body2" color="text.secondary">
                                Submit manuscripts by <b>{new Date(ra.reading.submissionDeadline || "").toLocaleDateString()}</b>
                                </Typography>
                                </>
                            ) : (
                                <span></span>
                            )}
                            <Divider sx={{ my: 1 }} />
                            <Typography variant="body1" fontWeight="bold">
                            Submitted Manuscript: <InfoIcon style={{ cursor: 'pointer' }} onClick={handleClick}/>
                            </Typography>
                            
                            <div>
                            {canChangeManuscript(ra.reading as Reading) ? (
                            <FileSelect 
                                onSendData={handleSelectChange} 
                                readingAuthorId={ra.id} 
                                selectedValueId={ra.authorAppFile?.appFile.id || ""}
                                fileListProperties={fileListProperties}
                                />
                            ) : (
                            <TextField
                                variant="outlined"
                                sx={{ width: 360 }}
                                disabled
                                value={ra.authorAppFile?.appFile.title || ""}
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
                                        <li>Files must be of type DOCX<img src={wordIcon} className='icon' alt="DOCX" style={{width: "20px", height: "auto", verticalAlign: "text-bottom"}}/></li>
                                        <li>You may change your manuscript until the submission deadline</li>
                                        <li>Available files are ones you have already uploaded</li>
                                    </ul>
                                    <Button onClick={handleClose}>Close</Button>
                                </Typography>                
                            </Popover>
                            </div>
                            <Typography variant="caption" color="text.secondary">
                                 {
                                    ra.authorAppFile ?
                                    `Submitted to Reading on ${new Date(ra.authorAppFile.createdAt).toLocaleDateString()}`
                                    : "You haven't submitted a manuscript"
                                }
                            </Typography>
                            <Divider sx={{ mb: 2, mt: 1 }} />
                            <Typography variant="body1" fontWeight="bold">
                                Feedback:
                            </Typography>
                            {ra.readingFeedback.length > 0 ? (
                                <FeedbackCommentList readingAuthor={ra}/>
                            ) : (
                                <Typography>
                                    Awaiting Feedback
                                </Typography>
                            )}
                                
                            </Box>
                        </Grid>
                    ))}

                    </Grid>
                </CardContent>
            </Card>
        ) : (
            <span></span>
        )}
    </>
    )
}
export default Readings;
