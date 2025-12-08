import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Reading } from "../types/domain-types";
import AuthorList from "./AuthorList";
import { getCardBackgroundColor } from "../util/readingUtil";
import {
  Button,
  Grid,
  Typography,
  Card,
  CardActions,
  CardContent,
  Stack
} from "@mui/material";
import ReviewsIcon from '@mui/icons-material/Reviews';

interface ReadingScheduleProps {
  groupId: string | undefined;
}

const ReadingSchedule: React.FC<ReadingScheduleProps> = ({groupId}) => {
    const [reading, setReading] = useState<Reading[]>([]);
    const [loadingData, setLoadingData] = useState(true);
    const readingUrl = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/events/${groupId}`;
    const navigate = useNavigate();
    
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
                }
            }
            setLoadingData(false);
        })();
    }, [groupId]);   

    return (
    <Card>
        <CardContent>
            <Grid container spacing={2}>
                <Stack spacing={2} sx={{width:"500px"}}> 
                {reading.map((r) => (
                    
                    <Card 
                        sx={{
                            border: "1px solid #ddd",
                            p: 2,
                            borderRadius: 2,
                            backgroundColor: getCardBackgroundColor(r)
                        }}
                    >
                        <CardContent>
                            <Typography variant="h6" fontWeight="bold">
                                {r.name }
                            </Typography>
                            {r.scheduledType === "SCHEDULED" && r.readingDate && r.submissionDeadline ? (
                                <>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    {new Date(r.readingDate).toLocaleDateString()}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Submit manuscripts by <b>{new Date(r.submissionDeadline).toLocaleDateString()}</b>
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
                                {r.readingAuthor ? `${r.spotsOpen - r.readingAuthor.length} of ${r.spotsOpen} spots open` : `${r.spotsOpen} of ${r.spotsOpen} spots open`} 
                            </Typography>
                            {r.readingAuthor && r.readingAuthor.length > 0 && (
                                <Typography variant="body2" color="text.secondary">
                                    Authors:<br/>
                                    <AuthorList reading={r} />
                                </Typography>
                            )}
                            <CardActions>
                                <Button 
                                    startIcon={<ReviewsIcon />}
                                    size="small"
                                    variant="contained"
                                    sx={{ mt: 2 }}
                                    onClick={() => navigate(`/readingfeedback/${r.id}`)}
                                >
                                    Review              
                                </Button>
                            </CardActions>
                        </CardContent>
                    </Card>
                ))}
                </Stack>
            </Grid>
        </CardContent>
    </Card>
    )
}
export default ReadingSchedule;