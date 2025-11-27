import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { ReadingAuthor } from "../../../backend/src/domain-types";
import {
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
    const { user, isLoading, error } = useUserContext();
    const [readingAuthor, setReadingAuthor] = useState <ReadingAuthor[]>([]);
    const [anchorEl, setAnchorEl] = useState(null);

    const readingsUrl = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/events/user/author`;
    const addFileToReadingUrl = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/events/file/add`;
    
    useEffect(() => {
        if(!user) return;
        (async () => {
        const res = await fetch(`${readingsUrl}`, {
            credentials: "include",
        });
        if (res.ok) {
            const data: ReadingAuthor[] = await res.json();
            console.log('readingAuthor', data);
            setReadingAuthor(data);
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
          {readingAuthor.map((ra) => (
            <Grid size={12} key={ra.id}>
              <Box 
                sx={{
                  border: "1px solid #ddd",
                  p: 2,
                  borderRadius: 2,
                  backgroundColor:
                    new Date(ra.reading.submissionDeadline) > currentDate
                      ? "#e3f2fd"
                      : "#f3e5f5",
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  {ra.reading.name }
                </Typography>
                {/* <Typography>
                    Group Name Goes Here
                </Typography> */}
                <Typography variant="body2">
                  Date of Reading: <span style={{fontWeight: "bold"}}>{new Date(ra.reading.readingDate).toLocaleDateString()}</span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Submit manuscripts by <b>{new Date(ra.reading.submissionDeadline).toLocaleDateString()}</b>
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body1" fontWeight="bold">
                  Submitted Manuscript: <InfoIcon style={{ cursor: 'pointer' }} onClick={handleClick}/>
                </Typography>
                <div>
                {new Date(ra.reading.submissionDeadline).valueOf() > currentDate.valueOf() ? (
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
                      <li>You may change your manuscript until the submission deadline</li>
                      <li>Available files are ones you have already uploaded</li>
                    </ul>
                     <Button onClick={handleClose}>Close</Button>
                  </Typography>                
                </Popover>
                </div>
                {/* <Stack direction="row" alignItems="center" gap={1} mb={1}>
                    <FileIcon file={ra.authorAppFile?.appFile} />
                    <Typography variant="subtitle1" fontWeight="bold">
                      {ra.authorAppFile?.appFile.title || ""}
                    </Typography>
                  </Stack> */}
                  {/* <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {ra.authorAppFile?.appFile.description || "No description"}
                  </Typography> */}
                  <Typography variant="caption" color="text.secondary">
                    Submitted to Reading on {
                        ra.authorAppFile ?
                        new Date(ra.authorAppFile.createdAt).toLocaleDateString()
                        : "N/A"
                    }
                  </Typography>
                  <Divider sx={{ mb: 2, mt: 1 }} />
                  <Typography variant="body1" fontWeight="bold">
                    Feedback:
                  </Typography>
                  {ra.readingFeedback ? ( 
                    "Feedback file list goes here"
                  ) : (
                    "Waiting on feedback"
                  )}
                {/* <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{
                    fontWeight: "bold", 
                    color:"green"
                    }}>
                    {getSpotsOpenText(ra.reading)}

                </Typography> */}
                </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
    )
}
export default Readings;

{/* {e.readingAuthor ? `${e.spotsOpen - e.readingAuthor.length} of ${e.spotsOpen} spots open` : `${e.spotsOpen} of ${e.spotsOpen} spots open`}  */}
