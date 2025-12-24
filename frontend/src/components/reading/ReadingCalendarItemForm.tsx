import React, { useState } from "react";
import { useReadingsActions, useReadingsData } from "../../hooks/useReading";
import { useGroupDetails } from "../../hooks/useGroup";
import { 
    AppFile,
    Group,
    Reading, 
    ReadingAuthor,
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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { getSpotsOpenText, getCardBackgroundColor } from "../../util/readingUtil";
import ReviewsIcon from '@mui/icons-material/Reviews';
import { useUserContext } from "../../context/UserContext";
import { ReadingCommands } from "../../types/ReadingTypes";
import FileSearchBox from "../../components/file/data/FileSearchBox";
import FileDescription from "../../components/file/data/FileDescription";

interface ReadingCalendarItemFormProps {
 reading: Reading;
 isAdmin: boolean;
 commands: ReadingCommands;
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

export const ReadingCalendarItemForm: React.FC<ReadingCalendarItemFormProps> = ({ reading, isAdmin, commands }) => {
    const { user, isLoading, error } = useUserContext();
    const {data: group, mutate: mutateGroup } = useGroupDetails<Group>();
    
    if(group === undefined) throw new Error("Group undefined");
    
    const { addFile } = useReadingsActions(group.id, user.id, mutateGroup );

    const [err, setErr] = React.useState<string | null>(null);
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
        let title = "";
        let versionName = "";
        let version = 0;

        const ra: ReadingAuthor | undefined =  reading.readingAuthor.find(rauth => rauth.authorId === user.id);
        hasSignedUp = ra !== undefined;
        
        if(ra && ra.authorAppFileMeta){
            hasSubmitted = ra.authorAppFileMeta.appFileMeta !== undefined;
            title = ra.authorAppFileMeta.appFileMeta.title;
            version = ra.authorAppFileMeta.appFileMeta.currentVersionId;
            versionName = `${version.toString()} -${ra.authorAppFileMeta.appFileMeta.title}-${ new Date(ra.authorAppFileMeta.appFileMeta.createdAt).toLocaleDateString()}`;
        }

        return { hasSignedUp, hasSubmitted, title, version, versionName};
    }

    const FileSubmissionDetails = () => {
        const { hasSignedUp, hasSubmitted, title, version, versionName} = getfileSubmissionDetails();
        
        const renderMessage = () => {
            if (hasSignedUp) {
                if (hasSubmitted) {
                    return (
                        <Typography variant="body2" sx={{color: "green"}} fontWeight={"bold"}>
                            You have signed up for this reading<br/>
                            You have submitted a manuscript for this reading
                        </Typography>
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

    const handleSubmitToReading = async (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        if (!selectedFile) return;

        setErr(null);
        setConfirmation(null);
        setLoading(true);

        try {
            const ra: ReadingAuthor | undefined =  reading.readingAuthor.find(rauth => rauth.authorId === user.id);
            let formData = new FormData();
            if(!ra) throw new Error("Reading author not found");

            formData.append("readingAuthorId", ra.id);
            formData.append("appFileId" ,selectedFile.id); 
            formData.append("appFileMetaId", selectedFile.appFileMetaId);

            const results = await addFile(formData);
            mutateGroup();
            const { myReadings, myFiles } = useReadingsData(group, user);

            // const res = await fetch(`${import.meta.env.VITE_API_HOST}/api/events/file/add`,
            // {
            //     method: "POST",
            //     credentials: "include",
            //     body: formData
            // });

            //const data = await res.json();

            //if (!res.ok) throw new Error(data.error || "Failed to request to join");
            setConfirmation(
                `Your manuscript has been added to the reading.`
            );
        } catch (err) {
            if (err instanceof Error) setErr(err.message);
                else setErr("Unknown error occurred.");
            } finally {
            setLoading(false);
        }
    };

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
                            color:(reading.readingAuthor ? (reading.readingAuthor.length === 0 ? "green" : "red") : "green")
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
                            onClick={(event) => commands.signup(event,reading.id)}
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
                            onClick={(event) => commands.withdraw(event, reading.id)}
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
                            onClick={(event) => commands.feedback(event, reading.id)}
                            sx={{ mt: 1 }}
                            disabled={hasSignedUp}
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
                        href=""
                        variant="contained"
                        sx={{ mt: 2 }}
                        disabled={loading || !selectedFile}
                        onClick={handleSubmitToReading}
                    >
                        {loading ? <CircularProgress size={22} /> : "Submit"}
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
