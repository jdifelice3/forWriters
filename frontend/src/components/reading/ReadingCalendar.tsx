import React, { useState } from "react";
import { Reading } from "../../types/domain-types";
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
import { useForm } from "react-hook-form";
import { useGroupContext } from "../../context/GroupContextProvider";
import { ReadingDomainCommands } from "../../types/ReadingTypes";
import { useReadingsUI } from "../../hooks/reading/useReadingsUI";

type FormInput = {
  name: string,
  readingDate: Date,
  readingStartTime: string,
  readingEndTime: string,
  submissionDeadline: Date,
  description: string,
  schedule: string
}

interface ReadingCalendarProps {
  readings: Reading[];
  isAdmin: boolean;
  domain: ReadingDomainCommands;
  ui: ReturnType<typeof useReadingsUI>;
  onFeedback(readingId: string): void;
  onCreateReading(form: FormInput): void;
}

export const ReadingCalendar: React.FC<ReadingCalendarProps> = ({ readings, isAdmin, domain, ui, onFeedback, onCreateReading}) => {
    const { user, isLoading, error } = useUserContext();
    const { activeGroup } = useGroupContext();
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
  
    const [readingDate, setReadingDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [description, setDescription] = useState("");
    const [submitting, setSubmitting] = React.useState(false);
    const [submissionDeadline, setSubmissionDeadline] = useState("");
    const [err, setErr] = useState<string | null>(null);

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

    if (isLoading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;
    if (!user) return <Typography>No user found.</Typography>;

    const handleCreateReading = async (form: FormInput) => {
        setOpen(false);
        setName("");
        setDescription("");
        setReadingDate("")
        setSubmissionDeadline("");
        setStartTime("");
        setEndTime("");

        onCreateReading(form);
    }

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
            {readings && readings.length > 0 ? (
            readings.map((r, index) => (
                <ReadingCalendarItemForm 
                    key={index.toString()} 
                    reading={r} 
                    isAdmin={isAdmin} 
                    domain={domain} 
                    ui={ui}
                    onFeedback={onFeedback}
                />
            ))
            ) : (
            <span></span>
            )}
        </Box>
        <Dialog 
            open={open} 
            onClose={() => setOpen(false)}
        >
            <DialogTitle sx={{pb: 0}}>Create a Reading</DialogTitle>
            <Box  component="form" onSubmit={handleSubmit(handleCreateReading)} noValidate>
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
                    {activeGroup?.groupType === "WRITING" && (
                        <>
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
                            </>
                    )}
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