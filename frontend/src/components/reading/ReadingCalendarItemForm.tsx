import React, { useState } from "react";
import { Reading} from "../../types/domain-types";
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
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { useForm } from "react-hook-form";
import { getSpotsOpenText, getCardBackgroundColor } from "../../util/readingUtil";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useUserContext } from "../../context/UserContext";
import { useGroupContext } from "../../context/GroupContextProvider";
import { ReadingCommands } from "../../types/Reading";

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
  const { activeGroup } = useGroupContext();

  const [readingDate, setReadingDate] = useState("");
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [buttonEventId, setButtonEventId] = useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [err, setErr] = React.useState<string | null>(null);
  const [submissionDeadline, setSubmissionDeadline] = useState("");
  const [schedule, setSchedule] = useState("SCHEDULED");
  const [open, setOpen] = useState(false);

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
//     try {
//         for(let k=0; k < reading.readingAuthor.length; k++){
//             if(reading.id === eventId && reading.readingAuthor[k].authorId === user.id){
//                 return true;
//             }
//         }
//         return false; // Return the flag value
//     } catch (err:unknown) {
//     if(err instanceof Error){
//         setErr(err.message);
//         return false;
//     } else {
//         return false;
//     }
//   }
    return false;
};

    if (isLoading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;
    if (!user) return <Typography>No user found.</Typography>;

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
                // className={new Date(reading.readingDate || "") < currentDate ? "disabled" : ""}
                className = "readingCardSignup"
                sx={{
                  border: "1px solid #ddd",
                  p: 1,
                  borderRadius: 2,
                //   backgroundColor: getCardBackgroundColor(reading)
                }}
              >
                <CardContent>
                    <Typography variant="body1" fontWeight="bold">
                        {reading.name }
                    </Typography>
                    {reading.scheduledType === "SCHEDULED" ? (
                        <>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{position: "fixed"}}>
                            {new Date(reading.readingDate || "").toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{position: "fixed"}}>
                            Submit manuscripts by <b>{new Date(reading.submissionDeadline || "").toLocaleDateString()}</b>
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
                            color:(reading.readingAuthor ? (reading.readingAuthor.length === 0 ? "green" : "red") : "green")
                            }}>
                            {getSpotsOpenText(reading)}
                    </Typography>
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
                            disabled={disableSignInButton(reading.id)}
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
                            disabled={!disableSignInButton(reading.id)}
                        >
                            Withdraw
                        </Button>
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
                </CardActions>
              </Card>
          </Stack>

        </>
  );
};
