import { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";
import { 
    ReadingParticipant,
    Reading
 } from "../../types/domain-types";
import {
  Alert,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
  Popover,
  TextField
} from "@mui/material";

import Grid from "@mui/material/Grid";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FileSelect from "../controls/FileSelect";
import { FileListProperties } from '../../types/FileTypes';
import InfoIcon from '@mui/icons-material/Info';
import FeedbackCommentList from "../../components/reading/FeedbackCommentList";
import wordIcon from '../../assets/icons/icons8-word-file-48.png';
import { getCardBackgroundColor } from "../../util/readingUtil";
//import { useReadings } from "../../hooks/useReading";

const fileListProperties: FileListProperties =
  {
    fileType: "MANUSCRIPT",
    showPreviewButton: true,
    buttonDownloadText: "DOWNLOAD",
    showDeleteButton: true,
    showEditButton: true,
    showVersionHistory: false
  }

const styles = {
    marginLeft: '75px' 
};

const currentDate = new Date();

interface ReadingFormProps {
  reading: Reading;
}
const ReadingForm: React.FC<ReadingFormProps> = ({reading}) => {
    //const { data : readings = [] , isLoading } = useReadings<Reading[]>();
    const [error, setError] = useState<string | null>(null);
    
    return (
        
        <Box>
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
            {reading.readingParticipant.map((rp: ReadingParticipant) => (
                <>
                    <ReadingAuthorForm readingParticipant={rp} />        
                </>
            ))}
        </Box>
    )
}
export default ReadingForm;

interface ReadingAuthorFormProps {
  readingParticipant: ReadingParticipant;
}

const ReadingAuthorForm: React.FC<ReadingAuthorFormProps> = ({readingParticipant: readingParticipant}) => {
    const [error, setError] = useState<string | null>(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const readingsUrl = `${import.meta.env.VITE_API_HOST}/api/readings/user/author`;
    const addFileToReadingUrl = `${import.meta.env.VITE_API_HOST}/api/readings/file/add`;

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget); // Set anchor to the clicked button
    };

    const handleSelectChange = async(readingAuthorId: string, fileId: string) => {
    const res = await fetch(addFileToReadingUrl, {
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({readingAuthorId: readingAuthorId, appFileId: fileId}),
    });
  }
    const canChangeManuscript = (r: Reading) => {
        if(r.scheduledType === "SCHEDULED"){
            return new Date(r.submissionDeadline || "").valueOf() > currentDate.valueOf()
        } else {
            return true; // As of now, users can can their manuscripts until it has been downloaded.
                         // TODO: LOG ALL FILE DOWNLOADS
        }
    }

    const handleClose = () => {
        setAnchorEl(null); // Close the popover
    };
    
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <Grid size={12}>
            <Box 
                sx={{
                border: "1px solid #ddd",
                p: 2,
                borderRadius: 2,
                backgroundColor: getCardBackgroundColor(readingParticipant.reading as Reading)
                    // new Date(ra.reading.submissionDeadline) > currentDate && (!ra.authorAppFile)
                    // ? "#e3f2fd"
                    // : "#e3f2fd"
                }}  
            >
                <Typography variant="h6" fontWeight="bold">
                    {readingParticipant.reading.name }
                </Typography>
                {/* <Typography>
                    Group Name Goes Here
                </Typography> */}
                {readingParticipant.reading.scheduledType === "SCHEDULED" ? (
                    <>
                    <Typography variant="body2">
                        Date of Reading: 
                            <span style={{fontWeight: "bold"}}>
                                {new Date(readingParticipant.reading.readingDate || "").toLocaleDateString()}
                            </span>
                        </Typography>
                    <Typography variant="body2" color="text.secondary">
                    Submit manuscripts by <b>{new Date(readingParticipant.reading.submissionDeadline || "").toLocaleDateString()}</b>
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
                {canChangeManuscript(readingParticipant.reading as Reading) ? (
                <FileSelect 
                    onSendData={handleSelectChange} 
                    readingAuthorId={readingParticipant.id} 
                    selectedValueId={readingParticipant.readingSubmission?.appFile.appFileMeta?.id || ""}
                    fileListProperties={fileListProperties}
                    />
                ) : (
                <TextField
                    variant="outlined"
                    sx={{ width: 360 }}
                    disabled
                    value={readingParticipant.readingSubmission?.appFile.appFileMeta?.id || ""}
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
                        readingParticipant.readingSubmission?.appFile.appFileMeta ?
                        `Submitted to Reading on ${new Date(readingParticipant.readingSubmission.appFile.appFileMeta.createdAt).toLocaleDateString()}`
                        : "You haven't submitted a manuscript"
                    }
                </Typography>
                <Divider sx={{ mb: 2, mt: 1 }} />
                <Typography variant="body1" fontWeight="bold">
                    Feedback:
                </Typography>
                {readingParticipant.readingFeedback.length > 0 ? (
                    <FeedbackCommentList readingAuthor={readingParticipant}/>
                ) : (
                    <Typography>
                        Awaiting Feedback
                    </Typography>
                )}
                    
                </Box>
            </Grid>
        </>
    )
}