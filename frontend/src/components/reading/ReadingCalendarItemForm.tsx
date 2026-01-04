import React, { useState } from "react";
import { useReadings } from "../../hooks/reading/useReadings";
import { useReadingData } from "../../hooks/reading/useReadingsData";

import { useGroupDetails } from "../../hooks/useGroup";
import { 
    AppFile,
    Group,
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
    Stack,
    Dialog,
    DialogTitle,
    Popover
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { getSpotsOpenText, getCardBackgroundColor } from "../../util/readingUtil";
import ReviewsIcon from '@mui/icons-material/Reviews';
import { useUserContext } from "../../context/UserContext";
import FileSearchBox from "../../components/file/data/FileSearchBox";
import FileDescription from "../../components/file/data/FileDescription";
import InfoIcon from '@mui/icons-material/Info';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { ReadingDomainCommands } from "../../types/ReadingTypes";
import { useReadingsUI } from "../../hooks/reading/useReadingsUI";

interface ReadingCalendarItemFormProps {
 key: string;
 reading: Reading;
 isAdmin: boolean;
 domain: ReadingDomainCommands;
 ui: ReturnType<typeof useReadingsUI>;
 onFeedback(readingId: string): void;
}

type FormInput = {
  name: string,
  readingDate: Date,
  readingStartTime: string,
  readingEndTime: string,
  submissionDeadline: Date,
  description: string,
  schedule: string
}

const currentDate = new Date();

export const ReadingCalendarItemForm: React.FC<ReadingCalendarItemFormProps> = ({ key, reading, isAdmin, domain, ui, onFeedback }) => {
    const { user, isLoading, error } = useUserContext();
    const { data: group, mutate: mutateGroup } = useGroupDetails<Group>();
    const { mutate: mutateReading } = useReadings();
    const { isParticipant, myFiles } = useReadingData(reading, user);
    if(group === undefined) throw new Error("Group undefined");
        
    const [err, setErr] = React.useState<string | null>(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [submitManuscriptOpen, setSubmitManuscriptOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<AppFile | null>(null);
    const [loading, setLoading] = useState(false);
    const [confirmation, setConfirmation] = useState<string | null>(null);
  

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
        console.log('hasSubmitted', hasSubmitted)
        const renderMessage = () => {
            if (hasSignedUp) {
                if (hasSubmitted) {
                    return (
                        <>
                        <Typography variant="body2" sx={{color: "green"}} fontWeight={"bold"}>
                            You have signed up for this reading<br/>
                        </Typography>
                        <Typography>
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
                                onClick={(e) => setSubmitManuscriptOpen(true)}
                                disabled={isPastSubmissionDeadline}
                            >
                                Change
                            </Button>
                        </>
                    )
                } else {
                    return (
                        <Typography variant="body2" sx={{color: "green"}} fontWeight={"bold"}>
                            You have signed up for this reading<br/>
                            Please submit your manuscript by {new Date(reading.submissionDeadline || "").toLocaleDateString()}
                            <Button
                                variant="text"
                                color="primary"
                                size="small"
                                startIcon={<AddIcon />}
                                onClick={(e) => setSubmitManuscriptOpen(true)}
                            >
                                Submit
                            </Button>
                        </Typography>
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

    // const handleSubmitToReading = async (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    //     event.preventDefault();
    //     if (!selectedFile) return;

    //     setErr(null);
    //     setConfirmation(null);
    //     setLoading(true);

    //     try {
    //         const rp: ReadingParticipant | undefined =  reading.readingParticipant.find(rp => rp.userId === user.id);
            
    //         if(!rp) throw new Error("Reading author not found");

    //         const results = await addVersion(group.id, reading.id, selectedFile.id);
    //         //mutateGroup();
            
    //         setConfirmation(
    //             `Your manuscript has been added to the reading.`
    //         );
    //         //mutateReading();
    //         setSubmitManuscriptOpen(false);
    //     } catch (err) {
    //         if (err instanceof Error) setErr(err.message);
    //             else setErr("Unknown error occurred.");
    //         } finally {
    //         setLoading(false);
    //     }
    // };

    // const handleUpdateVersion = async (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    //     event.preventDefault();
    //     if (!selectedFile) return;

    //     setErr(null);
    //     setConfirmation(null);
    //     setLoading(true);

    //     try {
    //         const rp: ReadingParticipant | undefined =  reading.readingParticipant.find(rp => rp.userId === user.id);
            
    //         if(!rp) throw new Error("Reading author not found");

    //         const results = await updateVersion(group.id, reading.id, selectedFile.id);
            
    //         setConfirmation(
    //             `Your manuscript version has been updated.`
    //         );
    //         //mutateReading();
    //         setSubmitManuscriptOpen(false);
    //     } catch (err) {
    //         if (err instanceof Error) setErr(err.message);
    //             else setErr("Unknown error occurred.");
    //         } finally {
    //         setLoading(false);
    //     }
    // };

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
                    {reading.scheduledType === "SCHEDULED" ? (
                        <Box>
                        <Typography variant="body2">
                            Reading Date:{new Date(reading.readingDate || "").toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Submit manuscripts by <b>{new Date(reading.submissionDeadline || "").toLocaleDateString()}</b>
                        </Typography>
                        </Box>
                    ) : (
                        <Box>&nbsp;</Box>
                    )}
                    <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{
                            fontWeight: "bold", 
                            color:(reading.readingParticipant ? (reading.readingParticipant.length === 0 ? "green" : "red") : "green")
                            }}>
                            {getSpotsOpenText(reading)}
                    </Typography>
{/* FileSubmissionDetails */}

                      <FileSubmissionDetails/>

                </CardContent>
                <CardActions>
                    <Box>
                        <Button
                            id={reading.id}
                            size="small"
                            variant="contained"
                            startIcon={<EventAvailableIcon />}
                            onClick={(event) => domain.signUpForReading(reading.id)}
                            sx={{ mt: 1 }}         
                            disabled={hasSignedUp}
                        >
                            Sign Up
                        </Button>&nbsp;
                        <Button
                            id={reading.id}
                            size="small"
                            variant="contained"
                            startIcon={<EventAvailableIcon />}
                            onClick={(event) => domain.withdrawFromReading(reading.id)}
                            sx={{ mt: 1 }}         
                            disabled={!hasSignedUp}
                        >
                            Withdraw
                        </Button>&nbsp;
                        <Button className="readingReviewButton"
                            id={reading.id}
                            startIcon={<ReviewsIcon />}
                            size="small"
                            variant="contained"
                            onClick={(event) => onFeedback(reading.id)}
                            sx={{ mt: 1 }}
                            
                        >
                            Review            
                        </Button>
                    </Box>      
                </CardActions>
              </Card>

{/* Dialog - Submit Manuscript to Reading */}
        <Dialog
            open={submitManuscriptOpen} 
            onClose={() => setSubmitManuscriptOpen(false)}
        >
            <DialogTitle variant="h5" sx={{pb: 0}}>Submit a Manuscript to a Reading</DialogTitle>
                <Box 
                    // style={styles}  
                    sx={{ 
                        width: 400, 
                        alignContent: "center",
                        //mx: "auto", 
                        p: 4,
                }}>
                
                <Typography variant="h6" sx={{}}>
                    Find a Manuscript Version
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
                        onClick={() => onFeedback(reading.id)}
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

                {error && (
                    <Alert severity="error" sx={{ mt: 3 }}>
                    {error}
                    </Alert>
                )}

                {confirmation && (
                    <Alert severity="success" sx={{ mt: 3 }}>
                    {confirmation}
                    </Alert>
                )}
                </Box>
            </Dialog>
          </Stack>

        </>
  );
};