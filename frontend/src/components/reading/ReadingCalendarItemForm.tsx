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
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Tooltip
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
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
import MessageIcon from '@mui/icons-material/Message';
import ArchiveIcon from '@mui/icons-material/Archive';

interface ReadingCalendarItemFormProps {
    key: string;
    reading: Reading;
    isAdmin: boolean;
    domain: ReadingDomainCommands;
    ui: ReturnType<typeof useReadingsUI>;
    onFeedback(readingId: string): Promise<void>;
    openEditDialog(reading: Reading): void;
}

type SendInviteEmail = {
    success: boolean;
}

const currentDate = new Date();

export const ReadingCalendarItemForm: React.FC<ReadingCalendarItemFormProps> = ({
        key, 
        reading, 
        isAdmin, 
        domain, 
        ui, 
        onFeedback,
        openEditDialog,
    }) => {
    const { user, isLoading, error } = useUserContext();
    const { activeGroup } = useGroupContext();
    const { refresh } = useReadings();
    
    if (!activeGroup) return <CircularProgress />;
        
    const [err, setErr] = React.useState<string | null>(null);
    const [submitManuscriptOpen, setSubmitManuscriptOpen] = useState(false);
    const [updateManuscriptVersionOpen, setUpdateManuscriptVersionOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<AppFile | null>(null);
    const [loading, setLoading] = useState(false);
    const [informMembersOpen, setInformMembersOpen] = useState(false);
    const [sendInviteSuccess, setSendInviteSuccess] = useState(false);
  

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
        let fileDescription = "";

        const rp: ReadingParticipant | undefined =  reading.readingParticipant.find(rp => rp.userId === user.id);
        const rs: ReadingSubmission | undefined = reading.readingSubmission.find(item => item.participantId === rp?.id)

        hasSignedUp = rp !== undefined;
        hasSubmitted = rs !== undefined;
        if(rs){
            title = rs.appFile.appFileMeta.title;
            version = rs.appFile.version;
            versionName = rs.appFile.name;
            isPastSubmissionDeadline = new Date(reading.submissionDeadline!).getDate() - currentDate.getDate() > 0;
            fileDescription = rs.appFile.appFileMeta.description;
        }

        return { hasSignedUp, hasSubmitted, title, version, versionName, isPastSubmissionDeadline, fileDescription};
    }

    const FileSubmissionDetails = () => {
        const { hasSignedUp, hasSubmitted, title, version, versionName, 
            isPastSubmissionDeadline, fileDescription} = getfileSubmissionDetails();
        
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
                            <b>Title:</b> <br/>{title}
                        </Typography>
                        <Typography sx={{mt: 1}}>
                            <b>Version:</b> <br/>{versionName}
                        </Typography>
                        <Typography sx={{mt: 1}}>
                            <b>Description:</b><br/> {fileDescription}
                        </Typography>
                         <Button
                                sx={{mt: 1}}
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
                                Please submit your manuscript by {new Date(reading.submissionDeadline || "").toLocaleDateString("en-US", { timeZone: "UTC" })}
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

    const handleInformMembers = async(readingId: string) => {
        const result: SendInviteEmail = await domain.sendInviteEmail(activeGroup.id, readingId);
        setSendInviteSuccess(result!.success);
    }

    const handleInformMembersOnClose = () => {
        setInformMembersOpen(false);
        setSendInviteSuccess(false);
    }

    const handleInformMembersOnOpen = () => {
        setSendInviteSuccess(false);
        setInformMembersOpen(true)
    }

    const locked = reading.readingSubmission.length > 0;

    return (
    <>
         <Box mb={2}>
            {err && (
                <Alert severity="error" sx={{ mt: 3 }}>
                    {err}
                </Alert>
            )}
        </Box>
            <Stack spacing={2} sx={{mb:2}}>
              <Card 
                className = "readingCardSignup"
                sx={{
                  border: "1px solid #ddd",
                  p: 1,
                  borderRadius: 2,
                  width: 700
                }}
              >
                <CardContent>
                    <Typography variant="body1" fontWeight="bold" sx={{mb:1}}>
                        {reading.name }
                    </Typography>
                    <Typography variant="body1"  fontStyle={"italic"} sx={{mb:3}}>
                        {reading.description }
                    </Typography>
                    {activeGroup.groupType === "WRITING" && (
                        <Box>
                            <Typography variant="body2">
                                Reading Date:{new Date(reading.readingDate || "").toLocaleDateString("en-US", { timeZone: "UTC" })}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Submit manuscripts by <b>{new Date(reading.submissionDeadline || "").toLocaleDateString("en-US", { timeZone: "UTC" })}</b>
                            </Typography>   
                            {reading.readingParticipant.length > 0 && (
                                <Typography variant="body2" sx={{mt: 1}}>
                                    Authors:
                                </Typography>
                            )}
                            {reading.readingParticipant.length > 0 && (
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
                      
                    {activeGroup.groupType === "WRITING" && (                        
                        <Box>
                        <Typography variant="body2">
                            {/* Authors: */}
                        </Typography>
                        </Box>
                    )}


{/* FileSubmissionDetails */}

                      <FileSubmissionDetails/>

                </CardContent>
                <CardActions>
                    {isAdmin ? (
                            <Box display="flex" gap={1} mt={1}>
                                <Tooltip title={"Tell group members about the reading with an email"}>
                                <Box>
                                <Button
                                    variant="contained"
                                    size="small"
                                    startIcon={<MessageIcon />}
                                    onClick={handleInformMembersOnOpen}
                                >
                                    Notify Members
                                </Button>
                                </Box>
                                </Tooltip>
                                <Tooltip title={"Modify the name and description of your reading"}>
                                <Button
                                    variant="contained"
                                    size="small"
                                    startIcon={<EditIcon />}
                                    onClick={() => openEditDialog(reading)}
                                >
                                    Edit Reading
                                </Button>
                                </Tooltip>
                                <Tooltip title={"COMMING SOON. Archive your reading if you want to keep it, but don't want it visible"}>
                                    <Box>
                                    <Button
                                    variant="contained"
                                    size="small"
                                    startIcon={
                                        <ArchiveIcon />
                                    }
                                    disabled={true}
                                    onClick={() => handleDelete(reading.id)}
                                    >
                                    Archive Reading
                                    </Button>
                                </Box>
                                </Tooltip>
                                <Tooltip title={locked ? "You cannot delete this reading because it has submissions" : ""}>
                                    <Box>
                                    <Button
                                        variant="contained"
                                        disabled={locked}
                                        size="small"
                                        startIcon={
                                            <DeleteIcon />
                                        }
                                        onClick={() => handleDelete(reading.id)}
                                    >
                                    Delete Reading
                                    </Button>
                                </Box>
                                </Tooltip>
                            </Box>
                        ) : (
                            <Box>
                                <Button className="readingReviewButton"
                                    id={reading.id}
                                    startIcon={<ReviewsIcon />}
                                    size="small"
                                    variant="contained"
                                    onClick={() => onFeedback(reading.id)}
                                    sx={{ mt: 1 }}
                                    disabled={!domain.canReviewReading(reading.id, user.id)}

                                >
                                    Review            
                                </Button>
                            </Box>    
                        )}
                      
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
                        onClick={() => setUpdateManuscriptVersionOpen(false)}
                    >
                        Cancel
                    </Button>
                    </Box>
                    </Box>
                )}
                </Box>
            </Dialog>

            {/* Dialog - inform members */}
            <Dialog 
                open={informMembersOpen}
            >
                <DialogTitle 
                    sx={{ 
                        pb: 0, mb:2 
                    }}
                >
                    Tell members that manuscripts in this reading are ready for review
                </DialogTitle>
                    <DialogContent sx={{mb: -2}}>
                        <Typography sx={{whiteSpace: "pre-line", width: 500}}>
                            {!sendInviteSuccess && (
                                "If you want to tell only certain members, copy the link to your clipboard and email it with your personal account."
                            )}
                        </Typography>
                    </DialogContent>
                    <DialogContent>
                        <Typography sx={{
                            whiteSpace: "pre-line", 
                            width: 500,
                            color: sendInviteSuccess ? "green" : "black"                             
                        }}>
                            {!sendInviteSuccess ? (
                                "If you want to tell all group members, click the SEND EMAILS button."
                            ) : (
                                <b>Your emails have been sent.</b>
                            )}
                        </Typography>
                    </DialogContent>
                    <DialogActions 
                        sx={{ 
                            justifyContent: "center", 
                        }}
                    >
                        <Button 
                            variant="contained"
                            onClick={handleInformMembersOnClose}
                            sx={{
                                mb: 2
                            }}
                        >
                            Close
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => handleInformMembers(reading.id)}
                            sx={{ 
                                display: sendInviteSuccess? "none" : "inline-flex",
                                mb: 2
                               
                            }}
                        >
                            Send Emails
                        </Button>
                    </DialogActions>
            </Dialog>
        </Stack>
        </>
  );
};