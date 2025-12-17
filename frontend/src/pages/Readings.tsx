import { useState } from "react";
import { useUserContext } from "../context/UserContext";
import { 
    AppFile,
    Group,
    ReadingAuthor,
    Reading
 } from "../types/domain-types";
import {
  Alert,
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent
} from "@mui/material";

import Grid from "@mui/material/Grid";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ReadingSchedule from "../components/reading/ReadingSchedule";
import { ReadingCommands } from "../types/Reading";
import { FileCommands, FileListProperties } from "../types/File";
import { useGroupDetails } from "../hooks/useGroup";
import ReadingCalendar from "../components/reading/ReadingCalendar";
import FileList from "../components/file/FileList";

const fileListProperties: FileListProperties =
  {
    fileType: "MANUSCRIPT",
    showPreviewButton: true,
    buttonDownloadText: "DOWNLOAD",
    showDeleteButton: true,
    showEditButton: true
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

const Readings = () => {
    const { user } = useUserContext();

    const [error, setError] = useState<string | null>(null);
    const [reading, setReading] = useState<Reading[]>([]);
    const [open, setOpen] = useState(false);
    const [buttonEventId, setButtonEventId] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [err, setErr] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [editReading, setEditReading] = useState<Reading | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [schedule, setSchedule] = useState("SCHEDULED");

    const { data : group, isLoading } = useGroupDetails<Group>();

    let isAdmin = false;

    if (isLoading) {
      return (
        <Box display="flex" justifyContent="center" p={6} >
          <CircularProgress size={24}/>
        </Box>
      );
    }

    const foundUser = group?.groupUser.find(u => u.userId === user.id && u.isAdmin );
    if(foundUser) isAdmin = true;

    //Get array of readings that the user has joined    
    let myReadings: Reading[] = [];
    let partialResult: ReadingAuthor[] = [];
    console.log('group readings:', group?.reading);
    group?.reading.forEach((r) => {  
        partialResult = r.readingAuthor.filter(ra => ra.authorId === user.id);
        if(partialResult){
            myReadings.push(r);
        }
    });

    //Get array of files the reader has submitted to readings
    let myFiles: AppFile[] = [];
    myReadings.forEach((r) => {
        r.readingAuthor.forEach((ra) => {
            ra.authorAppFile ? myFiles.push(ra.authorAppFile?.appFile) : {};
        });
    });

    console.log('my readings', myReadings);
    console.log('my files: ', myFiles);

    const baseUrl = `${import.meta.env.VITE_API_HOST}/api/events`;

  const handleAddReading = async (values: FormInput ) => {
    setSubmitting(true);
    setErr(null);
    setSuccess(null);
    try{
        const eventsURrl = `${import.meta.env.VITE_API_HOST}/api/events/${group?.id}`;
        const res = await fetch(eventsURrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            name: values.name, 
            createdUserId: user.id,
            readingDate: values.readingDate,
            readingStartTime: values.readingStartTime,
            readingEndTime: values.readingEndTime,
            submissionDeadline: values.submissionDeadline,
            description: values.description,
            schedule: schedule
        }),
        credentials: "include",
        });

        if (res.ok) {
            const newEvent = await res.json();
            setReading((prev) => [newEvent, ...prev]);
            setOpen(false);
        }
        setSuccess("Reading created successfully.");
    } catch (err) {
            setErr("Failed to create reading");
    } finally {
            setSubmitting(false);
    }
  };

  const handleSignup = async (event: React.MouseEvent<HTMLButtonElement>, readingId: string) => {
      const eventsUrl = `${import.meta.env.VITE_API_HOST}/api/events/${readingId}/signup`;
      const res = await fetch(eventsUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user ? user.id : "" }),
        credentials: "include",
      });
      if (res.ok){
        alert("You are signed up for this reading!");
        setButtonEventId(readingId);
      }
  };

const handleWithdraw = async(event: React.MouseEvent<HTMLButtonElement>, readingId: string) => {
      const withdrawUrl = `${import.meta.env.VITE_API_HOST}/api/events/${readingId}/withdraw`;
      const res = await fetch(withdrawUrl, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user ? user.id : "" }),
        credentials: "include",
      });
      if (res.ok){
        alert("You have withdrawn from this reading!");
        setButtonEventId(readingId);
      }
}

  const handleEdit = (reading: Reading) => {
      setEditReading(reading);
      setEditTitle(reading.name);
      setEditDescription(reading.description || "");
  };
  
const handleDelete = async (reading: Reading) => {
    if (!confirm("Are you sure you want to delete this reading?")) return;
    try {
        const res = await fetch(`${baseUrl}/${reading.id}/group/${group?.id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });
        const data = await res.json();
        if (res.status === 200){
            setButtonEventId(data.id);
        } else {
            setErr(data.error);
        }
    } catch (err: unknown) {
        if(err instanceof Error){
            setErr(`Error caught in handleDelete: ${err.message}`);
            console.error(`Error caught in handleDelete: ${err.message}`);
        } else {
            console.error("Unknown error occurred")
        }
    }
  };

const readingCommands: ReadingCommands = {
    edit: handleEdit,
    save: handleAddReading,
    delete: handleDelete,
    signup: handleSignup,
    withdraw: handleWithdraw
}

const fileListProperties: FileListProperties = {
    showPreviewButton: false,
    buttonDownloadText: "DOWNLOAD",
    showDeleteButton: false,
    showEditButton: false 
}

const handleFileEdit = async(file: AppFile) => {
};

const handleFileSaveEdit = async (file:AppFile) => {
};

const handleFileDelete = async (file: AppFile) => {
};

const fileCommands: FileCommands = {
    edit: handleFileEdit,
    save: handleFileSaveEdit,
    delete: handleFileDelete
}

    return (
        <>
        <Card elevation={0}>
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
            <Card sx={{width:"1200px"}}>
            <CardContent>
            <Grid size={12} container spacing={2}>
                <Grid size={4} >
                    <Typography variant="h6" mb={2}
                        sx={{
                            fontWeight: "bold"
                        }}
                    >
                    My Manuscripts
                    </Typography>
                    <FileList files={myFiles} fileListProperties={fileListProperties} commands={fileCommands} />
                </Grid>
                <Grid size={4} >
                <Typography variant="h6" mb={2}
                    sx={{
                        fontWeight: "bold"
                    }}
                >
                    My Readings
                </Typography>
                    <ReadingSchedule readings={myReadings} commands={readingCommands}/>
                </Grid>
                <Grid size={4} >
                    <Typography variant="h6" mb={2}
                        sx={{
                            fontWeight: "bold"
                        }}
                    >
                    Group Reading Signup
                    </Typography>
                    {group?.reading ? (
                        <ReadingCalendar readings={group?.reading} isAdmin={isAdmin} commands={readingCommands}/>
                    ) : (
                        <Typography>Readings have not yet been created for this group.</Typography>
                    )}
                    
                </Grid>
            </Grid>
            </CardContent>
            </Card>
            </CardContent>
            </Card>
        </>
    )
}
export default Readings;
