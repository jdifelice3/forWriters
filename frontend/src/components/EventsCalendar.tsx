import React, { useEffect, useState } from "react";
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
  CircularProgress
} from "@mui/material";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { useUserContext } from "../context/UserContext";

interface EventsCalendarProps {
  groupId: string;
  isAdmin: boolean;
}

interface EventItem {
  id: string;
  eventDate: string;
  submissionDeadline: string;
  signups: any[];
}

export const EventsCalendar: React.FC<EventsCalendarProps> = ({ groupId, isAdmin }) => {
  const { user, isLoading, error } = useUserContext();
  // if(!user){
  //   throw new Error("Failed to retrive user");
  // }
  //const [userId, setUserId] = useState(user.id);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [deadline, setDeadline] = useState("");
  
  
  useEffect(() => {
    if (!user || isLoading) return;

    const eventsUrl = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/events/${groupId}`;
    (async () => {
      try {
        const events = await fetch(eventsUrl, { credentials: "include" })
          .then((r) => r.json())
          .then((data) => setEvents(data))
          .catch(console.error);
        //console.log('events', events);
      } catch (err) {
        console.error("Error isLoading events:", err);
      }
    })();
  }, [groupId]);

  const handleAddEvent = async () => {
    const eventsUrl = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/events/${groupId}`;
    const res = await fetch(eventsUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventDate: date, userId: deadline }),
      credentials: "include",
    });
    if (res.ok) {
      const newEvent = await res.json();
      setEvents((prev) => [newEvent, ...prev]);
      setOpen(false);
    }
  };

  const handleSignup = async (eventId: string) => {
    const eventsUrl = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/events/${eventId}/signup`;
    const res = await fetch(eventsUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId: eventId, userId: user ? user.id : "" }),
      credentials: "include",
    });
    if (res.ok) alert("You are signed up for this reading!");
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
            Create Event
          </Button>
        )}

        <Grid container spacing={2}>
          {events.map((e) => (
            <Grid size={12} key={e.id}>
              <Box
                sx={{
                  border: "1px solid #ddd",
                  p: 2,
                  borderRadius: 2,
                  backgroundColor:
                    new Date(e.submissionDeadline) > new Date()
                      ? "#e3f2fd"
                      : "#f3e5f5",
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  {new Date(e.eventDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Submit manuscripts by <b>{new Date(e.submissionDeadline).toLocaleDateString()}</b>
                </Typography>

                {!isAdmin && (
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<EventAvailableIcon />}
                    onClick={() => handleSignup(e.id)}
                    sx={{ mt: 1 }}
                    disabled={new Date(e.submissionDeadline) < new Date()}
                  >
                    Sign Up
                  </Button>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Create Reading Event</DialogTitle>
          <DialogContent>
            <TextField
              label="Event Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              fullWidth
              sx={{ my: 2 }}
            />
            <TextField
              label="Submission Deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddEvent}>Save</Button>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
};
