import React, { useEffect, useState, useRef } from "react";
import { Reading, ReadingAuthor } from "../../../backend/src/domain-types";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  CircularProgress,
  Select, 
  MenuItem
} from "@mui/material";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { useUserContext } from "../context/UserContext";
import { useForm } from "react-hook-form";
import { getSpotsOpenText } from "../util/readingUtil";

interface EventsCalendarProps {
  groupId: string;
  isAdmin: boolean;
}

interface AuthorListProps {
  reading: Reading;
}

type FormInput = {
  name: string,
  readingDate: Date,
  readingStartTime: string,
  readingEndTime: string,
  submissionDeadline: Date,
  description: string
}

const currentDate = new Date();

export const EventsCalendar: React.FC<EventsCalendarProps> = ({ groupId, isAdmin }) => {
  const { user, isLoading, error } = useUserContext();
  const [reading, setReading] = useState<Reading[]>([]);
  const [open, setOpen] = useState(false);
  const [readingDate, setReadingDate] = useState("");
  const [name, setName] = useState("");
  //const [addressId, setAddressId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [buttonEventId, setButtonEventId] = useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [err, setErr] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);
  const [submissionDeadline, setSubmissionDeadline] = useState("");
  
  const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FormInput>({
      defaultValues: {
        name: "", 
        readingDate: new Date(),
        readingStartTime: "",
        readingEndTime: "",
        submissionDeadline: new Date(),
        description: ""
      },
    });
  useEffect(() => {
    if (!user || isLoading) return;

    const eventsUrl = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/events`;
    
    (async () => {
      try {
        const res = await fetch(`${eventsUrl}/${groupId}`, {
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
  }, [groupId, buttonEventId]);

  const handleAddReading = async (values: FormInput ) => {
   
    setSubmitting(true);
    setErr(null);
    setSuccess(null);
    try{
    const eventsURrl = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/events/${groupId}`;
    const res = await fetch(eventsURrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        name: values.name, 
        createdUserId: user.id,
        readingDate: values.readingDate,
        readingStartTime: values.readingStartTime,
        readingEndTime: values.readingEndTime,
        //readingAddressId: addressId,
        submissionDeadline: values.submissionDeadline,
        description: values.description
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
      const eventsUrl = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/events/${readingId}/signup`;
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
      const withdrawUrl = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/events/${readingId}/withdraw`;
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
  } catch (err) {

    return false;
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

        <Grid container spacing={2}>
          {reading.map((e) => (
            <Grid size={12} key={e.id}>
              <Box 
                className={new Date(e.readingDate) < currentDate ? "disabled" : ""}
                sx={{
                  border: "1px solid #ddd",
                  p: 2,
                  borderRadius: 2,
                  backgroundColor:
                    new Date(e.submissionDeadline) > new Date() || new Date(e.readingDate) < currentDate 
                      ? "#e3f2fd"
                      : "#f3e5f5",
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  {e.name }
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  {new Date(e.readingDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Submit manuscripts by <b>{new Date(e.submissionDeadline).toLocaleDateString()}</b>
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{
                    fontWeight: "bold", 
                    color:(e.readingAuthor ? (e.readingAuthor.length === 0 ? "green" : "red") : "green")
                    }}>
                    {getSpotsOpenText(e)}
                </Typography>
                {!isAdmin && (
                <Box>
                  <Button
                    id={e.id}
                    size="small"
                    variant="contained"
                    startIcon={<EventAvailableIcon />}
                    onClick={(event) => handleSignup(event, e.id)}
                    sx={{ mt: 1 }}         
                    //Check if the current user has already signed-in to the event
                    disabled={disableSignInButton(e.id)}
                  >
                    Sign Up
                  </Button>&nbsp;
                  <Button
                    id={e.id}
                    size="small"
                    variant="contained"
                    startIcon={<EventAvailableIcon />}
                    onClick={(event) => handleWithdraw(event, e.id)}
                    sx={{ mt: 1 }}         
                    //Check if the current user has already signed-in to the event
                    disabled={!disableSignInButton(e.id)}
                  >
                    Withdraw
                  </Button>
                  </Box>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Create a Reading</DialogTitle>
            <Box  component="form" onSubmit={handleSubmit(handleAddReading)} noValidate>

          <DialogContent>
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
            <TextField
              label="Reading Date"
              type="date"
              value={readingDate}
              fullWidth
              sx={{ my: 2 }}
              required
              {...register("readingDate", {
                onChange: (e) => setReadingDate(e.target.value) // Update React Hook Form's value
              })}
              error={!!errors.name}
              helperText={errors.name?.message}            />
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
              helperText={errors.name?.message}            />
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
              helperText={errors.name?.message}            />
            {/* <Select
              label=""
              type="string"
              // labelId="demo-simple-select-label"
              // id="demo-simple-select"
              value={addressId}
              onChange={(e) => setAddressId(e.target.value)}
              required
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
          </Select> */}
            <TextField
              label="Submission Deadline"
              type="date"
              value={submissionDeadline}
              fullWidth
              required
              {...register("submissionDeadline", {
                onChange: (e) => setSubmissionDeadline(e.target.value) // Update React Hook Form's value
              })}
              error={!!errors.name}
              helperText={errors.name?.message}           
            />
            
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

// const AuthorList: React.FC<AuthorListProps> = ({ reading }) => {
//   return (
//     reading.readingAuthor.map((ra: ReadingAuthor) => (
//       <Typography variant="body2" color="text.secondary">
//         {/* {ra.userProfile.firstName} {ra.userProfile.lastName} */}
//         {!ra.userProfile.firstName && !ra.userProfile.lastName ? "Name unknown" 
//           : `${ra.userProfile.firstName} ${ra.userProfile.lastName}`}
//       </Typography>
//     ))
//   );
// }