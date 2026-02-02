import React, { useState } from "react";
import { useReadings } from "../../hooks/reading/useReadings";
import { 
    AppFile,
    Reading, 
    ReadingParticipant,
    ReadingSubmission,
} from "../../types/domain-types";
import {
    Alert,
    Box,
    Typography,
    Button,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    IconButton,
    Stack,
    Dialog,
    DialogTitle,
    Tooltip
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { getSpotsOpenText } from "../../util/readingUtil";
import ReviewsIcon from '@mui/icons-material/Reviews';
import { useUserContext } from "../../context/UserContext";
import FileSearchBox from "../../components/file/data/FileSearchBox";
import FileDescription from "../../components/file/data/FileDescription";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { ReadingDomainCommands } from "../../types/ReadingTypes";
import { useReadingsUI } from "../../hooks/reading/useReadingsUI";
import { useGroupContext } from "../../context/GroupContextProvider";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface ReadingCalendarItemFormProps {
    key: string;
    reading: Reading;
    isAdmin: boolean;
    domain: ReadingDomainCommands;
    ui: ReturnType<typeof useReadingsUI>;
    onFeedback(readingId: string): void;
}

const currentDate = new Date();

export const ReadingCalendarItemForm: React.FC<ReadingCalendarItemFormProps> = ({ key, reading, isAdmin, domain, ui, onFeedback }) => {
    console.log('reading', reading);
    const { user, isLoading, error } = useUserContext();
    const { activeGroup } = useGroupContext();
    const { refresh } = useReadings();
    
    if (!activeGroup) return <CircularProgress />;
        
    const [err, setErr] = React.useState<string | null>(null);
    const [submitManuscriptOpen, setSubmitManuscriptOpen] = useState(false);
    const [updateManuscriptVersionOpen, setUpdateManuscriptVersionOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<AppFile | null>(null);
    const [loading, setLoading] = useState(false);
  

    if (isLoading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;
    if (!user) return <Typography>No user found.</Typography>;

    //File submission details
    const getfileSubmissionDetails = () => {
        let hasSignedUp = false;
        let hasSubmitted = false;
        let isPastSubmissionDeadline = false;
        let title = "";
        let versionName = "";
        let version = 0;

        const rp: ReadingParticipant | undefined =  reading.readingParticipant.find(rp => rp.userId === user.id);
        const rs: ReadingSubmission | undefined = reading.readingSubmission.find(item => item.participantId === rp?.id)

        hasSignedUp = rp !== undefined;
        hasSubmitted = rs !== undefined;
        if(rs){// && rp.readingSubmission){
            title = rs.appFile.appFileMeta.title;
            version = rs.appFile.version;
            versionName = rs.appFile.name;
            isPastSubmissionDeadline = new Date(reading.submissionDeadline!).getDate() - currentDate.getDate() > 0;
        }

        return { hasSignedUp, hasSubmitted, title, version, versionName, isPastSubmissionDeadline};
    }

    const FileSubmissionDetails = () => {
        const { hasSignedUp, hasSubmitted, title, version, versionName, isPastSubmissionDeadline} = getfileSubmissionDetails();
        
        const renderMessage = () => {
            if (hasSignedUp) {
                if (hasSubmitted) {
                    return (
                        <>
                        {activeGroup.groupType === "WRITING" && (
                        <Typography variant="body2" sx={{color: "green"}} fontWeight={"bold"}>
                            You are signed up for this reading<br/>
                        </Typography>
                        )}
                        <Typography sx={{mt: 1}}>
                            <b>Title:</b> {title}
                        </Typography>
                        <Typography>
                            <b>Version:</b> {versionName}
                        </Typography>

                         <Button
                                variant="text"
                                color="primary"
                                size="small"
                                startIcon={<ChangeCircleIcon />}
                                onClick={(e) => setUpdateManuscriptVersionOpen(true)}
                                disabled={!domain.canChangeSubmission(reading.id, activeGroup.groupType)}
                            >
                                Change
                            </Button>
                        </>
                    )
                } else {
                    return (
                        <>
                        {activeGroup.groupType === "WRITING" && (
                            <Typography variant="body2" sx={{color: "green", my: 1}} fontWeight={"bold"}>
                                You are signed up for this reading<br/>
                                Please submit your manuscript by {new Date(reading.submissionDeadline || "").toLocaleDateString()}
                            </Typography>
                        )}
                            <Button
                                variant="text"
                                color="primary"
                                size="small"
                                startIcon={<AddIcon />}
                                onClick={(e) => setSubmitManuscriptOpen(true)}
                            >
                                Submit
                            </Button>
                        </>
                    )
                }
            } else {
                return (
                    <span></span>
                )
            }
        }
        return <div>{renderMessage()}</div>
    };
 
    const { hasSignedUp, hasSubmitted, title, version, versionName} = getfileSubmissionDetails();
//e: React.MouseEventHandler<HTMLButtonElement>, 
    const updateSubmittedVersion = (readingId: string, appFileId: string) => {
        setUpdateManuscriptVersionOpen(false); 
        domain.updateSubmittedVersion(readingId, appFileId);
    }

    const submitFileVersion = (readingId: string, appFileId: string) => {
        setSubmitManuscriptOpen(false);
        domain.submitFileVersion(readingId, appFileId);        
    }
    
    const handleDelete = (readingId: string) => {
        const answer = confirm('Are you sure you want to delete this reading?')
        if(answer) domain.deleteReading(readingId);
    }

    return (
    <>
         <Box mb={2}>
            {err && (
                <Alert severity="error" sx={{ mt: 3 }}>
                    {err}
                </Alert>
            )}
        </Box>
            <Stack spacing={2}>
              <Card 
                className = "readingCardSignup"
                sx={{
                  border: "1px solid #ddd",
                  p: 1,
                  borderRadius: 2,
                }}
              >
                <CardContent>
                    <Typography variant="body1" fontWeight="bold">
                        {reading.name }
                    </Typography>
                    <Typography variant="body2" >
                        {reading.description }
                    </Typography>
                    {activeGroup.groupType === "WRITING" && (
                        <Box>
                            <Typography variant="body2">
                                Reading Date:{new Date(reading.readingDate || "").toLocaleDateString()}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Submit manuscripts by <b>{new Date(reading.submissionDeadline || "").toLocaleDateString()}</b>
                            </Typography>   
                            {reading.readingParticipant && (
                                <Typography variant="body2" sx={{mt: 1}}>
                                    Authors:
                                </Typography>
                            )}
                            {reading.readingParticipant && (
                                reading.readingParticipant.map((rp, index) => (
                                    <Typography variant="body2">
                                        {
                                            rp.user.userProfile?.firstName && 
                                            rp.user.userProfile.lastName 
                                                ? `${(index + 1).toString()}. ${rp.user.userProfile.firstName} ${rp.user.userProfile.lastName}`
                                                : `${(index + 1).toString()}. Author name not provided`
                                        }
                                    </Typography>
                                ))
                            )}
                        </Box>
                    )}
                        {/* <Box>&nbsp;</Box> */}
                    {activeGroup.groupType === "WRITING" && (                        
                        <Box>
                        {/* <Typography 
                            variant="body2" 
                            color="text.secondary" 
                            sx={{
                                fontWeight: "bold", 
                                color:(reading.readingParticipant ? (reading.readingParticipant.length === 0 ? "green" : "red") : "green")
                                }}>
                                {getSpotsOpenText(reading)}
                        </Typography> */}
                        <Typography variant="body2">
                            {/* Authors: */}
                        </Typography>
                        </Box>
                    )}


{/* FileSubmissionDetails */}

                      <FileSubmissionDetails/>

                </CardContent>
                <CardActions>
                    <Box>
                        <Button className="readingReviewButton"
                            id={reading.id}
                            startIcon={<ReviewsIcon />}
                            size="small"
                            variant="text"
                            onClick={(event) => onFeedback(reading.id)}
                            sx={{ mt: 1 }}
                            disabled={!domain.canReviewReading(reading.id, user.id)}

                        >
                            Review            
                        </Button>
                            {/* <>
                            <IconButton onClick={()=> alert('Edit')} size="small">
                                <Tooltip title="edit">
                                    <EditIcon fontSize="small" />
                                </Tooltip>
                            </IconButton>
                            <IconButton
                                onClick={() => handleDelete(reading.id)}
                                size="small"
                                color="error"
                            >
                                <Tooltip title="delete">
                                    <DeleteIcon fontSize="small" />
                                </Tooltip>
                            </IconButton>
                            </> */}
                    </Box>      
                </CardActions>
              </Card>


{/* Dialog - Submit Manuscript to Reading */}
        <Dialog
            open={submitManuscriptOpen} 
            onClose={() => setSubmitManuscriptOpen(false)}
        >
            <DialogTitle variant="h5" sx={{pb: 0}}>Submit a Manuscript Version to a Reading</DialogTitle>
                <Box 
                    // style={styles}  
                    sx={{ 
                        width: 400, 
                        alignContent: "center",
                        //mx: "auto", 
                        p: 4,
                }}>
                
                <Typography variant="h6" sx={{}}>
                    Find Your Manuscript Version
                </Typography>

                <FileSearchBox onSelectFile={setSelectedFile} />
                    
                {selectedFile && (
                    <Box mt={2}>
                    <Typography sx={{mb: 2 }}>
                        Selected version: <strong>{selectedFile.name}</strong>
                    </Typography>
                    <Card>
                        <CardContent>
                            <FileDescription appFileId={selectedFile.id}/>
                        </CardContent>
                    </Card>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                    <Button
                        size="small"
                        variant="contained"
                        startIcon={<ReviewsIcon />}
                        sx={{ mt: 2, ml: 2 }}
                        onClick={() => submitFileVersion(reading.id, selectedFile.id)}
                    >
                        {loading ? <CircularProgress size={22} /> : "Submit"}
                    </Button>
                    <Button
                    href=""
                    variant="contained"
                    sx={{ mt: 2, ml: 2 }}
                    onClick={() => setSubmitManuscriptOpen(false) }
                    >
                        Cancel
                    </Button>
                    </Box>
                    </Box>
                )}
                </Box>
            </Dialog>

{/* Dialog - Update Manuscript Verion */}
        <Dialog
            open={updateManuscriptVersionOpen} 
            onClose={() => setUpdateManuscriptVersionOpen(false)}
        >
            <DialogTitle variant="h5" sx={{pb: 0}}>Update Manuscript Verion</DialogTitle>
                <Box 
                    // style={styles}  
                    sx={{ 
                        width: 400, 
                        alignContent: "center",
                        //mx: "auto", 
                        p: 4,
                }}>
                
                <Typography variant="h6" sx={{}}>
                    Find Your Manuscript Version
                </Typography>

                <FileSearchBox onSelectFile={setSelectedFile} />
                    
                {selectedFile && (
                    <Box mt={2}>
                    <Typography sx={{mb: 2 }}>
                        Selected version: <strong>{selectedFile.name}</strong>
                    </Typography>
                    <Card>
                        <CardContent>
                            <FileDescription appFileId={selectedFile.id}/>
                        </CardContent>
                    </Card>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                    <Button
                        size="small"
                        variant="contained"
                        startIcon={<ReviewsIcon />}
                        sx={{ mt: 2, ml: 2 }}
                        onClick={() => updateSubmittedVersion(reading.id, selectedFile.id)}
                    >
                        {loading ? <CircularProgress size={22} /> : "Submit"}
                    </Button>
                    <Button
                        href=""
                        variant="contained"
                        sx={{ mt: 2, ml: 2 }}
                        onClick={() => setUpdateManuscriptVersionOpen(false) }
                    >
                        Cancel
                    </Button>
                    </Box>
                    </Box>
                )}
                </Box>
            </Dialog>
          </Stack>

        </>
  );
};