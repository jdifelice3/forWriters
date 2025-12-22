import React, { useEffect, useState } from "react";
import { Reading} from "../../types/domain-types";
import { ReadingCommands } from "../../types/ReadingTypes";
import {
    Alert,
    Box,
    Button, 
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useUserContext } from "../../context/UserContext";
import { ReadingCalendarItemForm } from "./ReadingCalendarItemForm";
import Grid from "@mui/material/Grid";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { useForm } from "react-hook-form";
import { getSpotsOpenText, getCardBackgroundColor } from "../../util/readingUtil";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ReviewsIcon from '@mui/icons-material/Reviews';
import { useGroupContext } from "../../context/GroupContextProvider";

interface EventsCalendarProps {
 readings: Reading[];
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

export const ReadingCalendar: React.FC<EventsCalendarProps> = ({ readings, isAdmin, commands}) => {
    const { user, isLoading, error } = useUserContext();
    
    const [reading, setReading] = useState<Reading[]>([]);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [err, setErr] = React.useState<string | null>(null);
  
    //const { activeGroup } = useGroupContext();

    const [readingDate, setReadingDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [description, setDescription] = useState("");
    const [buttonEventId, setButtonEventId] = useState("");
    const [submitting, setSubmitting] = React.useState(false);
    const [submissionDeadline, setSubmissionDeadline] = useState("");
    const [schedule, setSchedule] = useState("SCHEDULED");

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

    const disableSignInButton = (eventId: string): boolean => {
        try {
            for(let i=0; i < reading.length; i++){
                for(let k=0; k < reading[i].readingAuthor.length; k++){
                if(reading[i].id === eventId && reading[i].readingAuthor[k].authorId === user.id){
                    return true;
                }
            }
        }
            return false;
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
      <Box>
        {isAdmin && (
          <Button
            startIcon={<AddIcon />}
            variant="outlined"
            onClick={() => setOpen(true)}
          >
            Create Reading
          </Button>
        )}
        <Box>
            {err && (
                <Alert severity="error" sx={{ mt: 3 }}>
                    {err}
                </Alert>
            )}
            {readings.map((r, index) => (
                <ReadingCalendarItemForm key={index} reading={r} isAdmin={isAdmin} commands={commands} />
            ))}
        </Box>
        <Dialog 
            open={open} 
            onClose={() => setOpen(false)}
        >
            <DialogTitle sx={{pb: 0}}>Create a Reading</DialogTitle>
            <Box  component="form" onSubmit={handleSubmit(commands.save)} noValidate>
                <DialogContent>
                    <TextField
                        label="Reading Name"
                        type="string"
                        value={name}
                        fullWidth
                        sx={{ my: 2 }}
                        required
                        {...register("name", {
                            onChange: (e) => setName(e.target.value)
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
                            onChange: (e) => setDescription(e.target.value)
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
                                onChange: (e) => setReadingDate(e.target.value)
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
                                onChange: (e) => setStartTime(e.target.value) 
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
                                onChange: (e) => setEndTime(e.target.value) 
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
                                onChange: (e) => setSubmissionDeadline(e.target.value)
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
     </Box>


  );
};
export default ReadingCalendar;