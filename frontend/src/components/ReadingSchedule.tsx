import React, { useEffect, useState, useRef } from "react";
import { Reading, ReadingAuthor } from "../../../backend/src/domain-types";
import AuthorList from "./AuthorList";
import {
  Box,
  Grid,
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

interface ReadingScheduleProps {
  groupId: string | undefined;
}

const ReadingSchedule: React.FC<ReadingScheduleProps> = ({groupId}) => {
    const [reading, setReading] = useState<Reading[]>([]);
    const [loadingData, setLoadingData] = useState(true);
    const readingUrl = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/events/${groupId}`;
    console.log('readingurl', readingUrl);
    useEffect(() => {
        if (!groupId) return;
    
        (async () => {
            const res = await fetch(readingUrl, {
                credentials: "include",
            }); 
            if (res.ok) {
                const data: Reading[] = await res.json();
                if(data){
                    setReading(data);
                    console.log('reading', data);
                }
            }
            setLoadingData(false);
        })();
    }, [groupId]);   
    return (
    <Card>
        <CardContent>
            <Grid container spacing={2}>
                {reading.map((e) => (
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
                        {e.readingAuthor ? `${e.spotsOpen - e.readingAuthor.length} of ${e.spotsOpen} spots open` : `${e.spotsOpen} of ${e.spotsOpen} spots open`} 

                        </Typography>
                        {e.readingAuthor && e.readingAuthor.length > 0 && (
                        <Typography variant="body2" color="text.secondary">
                            Authors:<br/>
                            <AuthorList reading={e} />
                        </Typography>

                        )}
                    </Box>
                    </Grid>
                ))}
            </Grid>
        </CardContent>
    </Card>
    )
}
export default ReadingSchedule;