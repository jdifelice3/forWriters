import React, { useEffect, useState } from "react";
import { Reading} from "../types/domain-types";
import {
    Alert,
    Box,
    Typography,
    Button,
    Card,
    CardActions,
    CardContent,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    CircularProgress,
    IconButton,
    Tooltip,
    Stack
} from "@mui/material";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { useUserContext } from "../context/UserContext";
import { useForm } from "react-hook-form";
import { getSpotsOpenText, getCardBackgroundColor } from "../util/readingUtil";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

interface EventsCalendarProps {
  groupId: string;
  isAdmin: boolean;
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

export const EventsCalendar: React.FC<EventsCalendarProps> = ({ groupId, isAdmin }) => {
  const { user, isLoading, error } = useUserContext();
  const [reading, setReading] = useState<Reading[]>([]);
  const [open, setOpen] = useState(false);
  const [readingDate, setReadingDate] = useState("");
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [buttonEventId, setButtonEventId] = useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [err, setErr] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);
  const [submissionDeadline, setSubmissionDeadline] = useState("");
  const [schedule, setSchedule] = useState("SCHEDULED");
  const [editReading, setEditReading] = useState<Reading | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  
  
  const {register, handleSubmit, formState: { errors }} = useForm<FormInput>({
       
        defaultValues: {
            name: "", 
            readingDate: new Date(),
            readingStartTime: "",
            readingEndTime: "",
            submissionDeadline: new Date(),
            description: "",
            schedule: "SCHEDULED"
        },
    });

    const baseUrl = `${import.meta.env.VITE_API_HOST}/api/events`;

  useEffect(() => {
    if (!user || isLoading) return;
    
    (async () => {
      try {
        const res = await fetch(`${baseUrl}/${groupId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        }); 
        if (res.ok) {
          const data = await res.json();
          
          setReading(data);
        }
         
      } catch (err) {
        console.error("Error isLoading events:", err);
      }
    })();
  }, [groupId, buttonEventId, baseUrl, isLoading, user]);

  const handleScheduleRadioButtons = (event: React.ChangeEvent<HTMLInputElement>) => {
         setSchedule(event.target.value);
    };

  const handleAddReading = async (values: FormInput ) => {
    setSubmitting(true);
    setErr(null);
    setSuccess(null);
    try{
        const eventsURrl = `${import.meta.env.VITE_API_HOST}/api/events/${groupId}`;
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
  
const handleDelete = async (readingId: string) => {
    if (!confirm("Are you sure you want to delete this reading?")) return;
    try {
        const res = await fetch(`${baseUrl}/${readingId}/group/${groupId}`, {
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

const disableSignInButton = (eventId: string): boolean => {
  
  try {
      for(let i=0; i < reading.length; i++){
        for(let k=0; k < reading[i].readingAuthor.length; k++){
          if(reading[i].id === eventId && reading[i].readingAuthor[k].authorId === user.id){
            return true;
          }
        }
      }
    
        return false; // Return the flag value
  } catch (err:unknown) {
    if(err instanceof Error){
        setErr(err.message);
        return false;
    } else {
        return false;
    }
  }
};

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!user) return <Typography>No user found.</Typography>;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" mb={2}>
          Readings
        </Typography>

        {isAdmin && (
          <Button
            startIcon={<AddIcon />}
            variant="outlined"
            onClick={() => setOpen(true)}
            sx={{ mb: 2 }}
          >
            Create Reading
          </Button>
        )}
        <Box mt={3}>
            {err && (
                <Alert severity="error" sx={{ mt: 3 }}>
                    {err}
                </Alert>
            )}
        </Box>
        <Grid container spacing={2}>
            <Stack spacing={2}>
            {reading.map((r) => (
            
              <Card 
                className={new Date(r.readingDate || "") < currentDate ? "disabled" : ""}
                sx={{
                  border: "1px solid #ddd",
                  p: 1,
                  borderRadius: 2,
                  backgroundColor: getCardBackgroundColor(r)
                }}
              >
                <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                        {r.name }
                    </Typography>
                    {r.scheduledType === "SCHEDULED" ? (
                        <>
                        <Typography variant="subtitle1" fontWeight="bold">
                            {new Date(r.readingDate || "").toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Submit manuscripts by <b>{new Date(r.submissionDeadline || "").toLocaleDateString()}</b>
                        </Typography>
                        </>
                    ) : (
                        <span></span>
                    )}
                    <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{
                            fontWeight: "bold", 
                            color:(r.readingAuthor ? (r.readingAuthor.length === 0 ? "green" : "red") : "green")
                            }}>
                            {getSpotsOpenText(r)}
                    </Typography>
                </CardContent>
                <CardActions>
                    {!isAdmin ? (
                        <Box>
                        <Button
                            id={r.id}
                            size="small"
                            variant="contained"
                            startIcon={<EventAvailableIcon />}
                            onClick={(event) => handleSignup(event, r.id)}
                            sx={{ mt: 1 }}         
                            //Check if the current user has already signed-in to the event
                            disabled={disableSignInButton(r.id)}
                        >
                            Sign Up
                        </Button>&nbsp;
                        <Button
                            id={r.id}
                            size="small"
                            variant="contained"
                            startIcon={<EventAvailableIcon />}
                            onClick={(event) => handleWithdraw(event, r.id)}
                            sx={{ mt: 1 }}         
                            //Check if the current user has already signed-in to the event
                            disabled={!disableSignInButton(r.id)}
                        >
                            Withdraw
                        </Button>
                        </Box>
                    ) : (
                        <Box sx={{mt: -3}}>
                            <Tooltip title="Edit" arrow>
                                <IconButton 
                                    onClick={() => handleEdit(r)} size="small"
                                >
                                    <EditIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete" arrow>

                                <IconButton
                                    onClick={() => handleDelete(r.id)}
                                    size="small"
                                    color="error"
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                      </Box>
                    )}
                </CardActions>
              </Card>

            ))}
          </Stack>
        </Grid>

        <Dialog 
            open={open} 
            onClose={() => setOpen(false)}
        >
          <DialogTitle sx={{pb: 0}}>Create a Reading</DialogTitle>
            <Box  component="form" onSubmit={handleSubmit(handleAddReading)} noValidate>

          <DialogContent>
            <RadioGroup 
                value={schedule} 
                onChange={handleScheduleRadioButtons} 
                //value="SCHEDULED"
            >
                <FormControlLabel value="SCHEDULED" control={<Radio />} label="Scheduled"/>
                <FormControlLabel value="UNSCHEDULED" control={<Radio />} label="Unscheduled" />
            </RadioGroup>
            <TextField
                label="Reading Name"
                type="string"
                value={name}
                fullWidth
                sx={{ my: 2 }}
                required
                {...register("name", {
                    onChange: (e) => setName(e.target.value) // Update React Hook Form's value
                })}
                error={!!errors.name}
                helperText={errors.name?.message}            
            />
            <TextField
                label="Description"
                type="string"
                value={description}
                fullWidth
                sx={{ my: 2 }}
                required
                {...register("description", {
                    onChange: (e) => setDescription(e.target.value) // Update React Hook Form's value
                })}
                error={!!errors.name}
                helperText={errors.name?.message}            
            />
           
            <Box className={schedule === "SCHEDULED" ? "" : "disabled"}>
                <TextField
                    label="Reading Date"
                    type="date"
                    value={readingDate}
                    fullWidth
                    sx={{ 
                        my: 2, 
                    }}
                    InputLabelProps={{ shrink: true }}
                    required
                    {...register("readingDate", {
                        onChange: (e) => setReadingDate(e.target.value) // Update React Hook Form's value
                    })}
                    error={!!errors.readingDate}
                    helperText={errors.readingDate?.message}            
                />
                <TextField
                    label="Start Time"
                    type="string"
                    value={startTime}
                    fullWidth
                    sx={{ my: 2 }}
                    required
                    {...register("readingStartTime", {
                        onChange: (e) => setStartTime(e.target.value) // Update React Hook Form's value
                    })}
                    error={!!errors.name}
                    helperText={errors.name?.message}            
                />
                <TextField
                    label="End Time"
                    type="string"
                    value={endTime}
                    fullWidth
                    sx={{ my: 2 }}
                    required
                    {...register("readingEndTime", {
                        onChange: (e) => setEndTime(e.target.value) // Update React Hook Form's value
                    })}
                    error={!!errors.name}
                    helperText={errors.name?.message}            
                    />
                <TextField
                    label="Submission Deadline"
                    type="date"
                    value={submissionDeadline}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    required
                    {...register("submissionDeadline", {
                        onChange: (e) => setSubmissionDeadline(e.target.value) // Update React Hook Form's value
                    })}
                    error={!!errors.name}
                    helperText={errors.name?.message}           
                />
            </Box>
        
           
          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
              variant="contained"
              startIcon={<AddIcon />}
              disabled={submitting}
            >
            {submitting ? <CircularProgress size={22} /> : "Create Reading"}
          </Button>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
          </DialogActions>
          </Box>
        </Dialog>
      </CardContent>
    </Card>
  );
};
