import { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";
import { 
    ReadingAuthor,
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
import FileSelect from "../file/FileSelect";
import { FileListProperties } from '../../types/File';
import InfoIcon from '@mui/icons-material/Info';
import FeedbackCommentList from "./FeedbackCommentList";
import wordIcon from '../../assets/icons/icons8-word-file-48.png';
import { getCardBackgroundColor } from "../../util/readingUtil";
import { useReadings } from "../../hooks/useReading";

const fileListProperties: FileListProperties =
  {
    fileType: "MANUSCRIPT",
    showPreviewButton: true,
    buttonDownloadText: "DOWNLOAD",
    showDeleteButton: true,
    showEditButton: true 
  }

const styles = {
    marginLeft: '75px' 
};

const currentDate = new Date();

interface ReadingFormProps {
  readings: Reading[];
}
const ReadingForm: React.FC<ReadingFormProps> = ({readings}) => {
    //const { data : readings = [] , isLoading } = useReadings<Reading[]>();
    const [error, setError] = useState<string | null>(null);
    if(!readings) throw new Error("There are no readings");
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
            {readings.map((r) => (
                <ReadingAuthorForm readingAuthors={r.readingAuthor} />        
            ))}
        </Box>
    )
}
export default ReadingForm;

interface ReadingAuthorFormProps {
  readingAuthors: ReadingAuthor[];
}

const ReadingAuthorForm: React.FC<ReadingAuthorFormProps> = ({readingAuthors}) => {
    const [error, setError] = useState<string | null>(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const readingsUrl = `${import.meta.env.VITE_API_HOST}/api/events/user/author`;
    const addFileToReadingUrl = `${import.meta.env.VITE_API_HOST}/api/events/file/add`;

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
            {readingAuthors.map((ra) => (
                <Grid size={12}>
                <Box 
                    sx={{
                        border: "1px solid #ddd",
                        p: 2,
                        borderRadius: 2,
                    }}  
                >
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
        </>
    )
}