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
import ReviewsIcon from '@mui/icons-material/Reviews';
import { useUserContext } from "../../context/UserContext";
import { useGroupContext } from "../../context/GroupContextProvider";
import { ReadingCommands } from "../../types/ReadingTypes";

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
    const [err, setErr] = React.useState<string | null>(null);
  
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
                            //disabled={disableSignInButton(reading.id)}
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
                            //disabled={!disableSignInButton(reading.id)}
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
                        >
                            Review            
                        </Button>
                    </Box>      
                </CardActions>
              </Card>
          </Stack>

        </>
  );
};
