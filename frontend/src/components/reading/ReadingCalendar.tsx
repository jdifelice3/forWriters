import React, { useEffect, useState } from "react";
import { Reading} from "../../types/domain-types";
import { ReadingCommands } from "../../types/Reading";
import {
    Alert,
    Box,
    Button, 
    CircularProgress,
    Typography
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useUserContext } from "../../context/UserContext";
import { ReadingCalendarItemForm } from "./ReadingCalendarItemForm";

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
            {readings.map((r, index) => (
                <ReadingCalendarItemForm key={index} reading={r} isAdmin={isAdmin} commands={commands} />
            ))}
        </Box>

     </Box>
  );
};
export default ReadingCalendar;