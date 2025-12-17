import { Reading } from "../../types/domain-types";
import AuthorList from "../member/AuthorList";
import {
  Button,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import ReviewsIcon from '@mui/icons-material/Reviews';

interface ReadingScheduleProps {
  reading: Reading;
}

const ReadingScheduleForm: React.FC<ReadingScheduleProps> = ({ reading}) => {

    return (
        <Grid container spacing={2}>
            <Stack spacing={2} > 
                <Typography variant="h6" fontWeight="bold">
                    {reading.name }
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                    {new Date(reading.readingDate || "").toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Submit manuscripts by <b>{new Date(reading.submissionDeadline || "").toLocaleDateString()}</b>
                </Typography>
                <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{
                        fontWeight: "bold", 
                        color:(reading.readingAuthor ? (reading.readingAuthor.length === 0 ? "green" : "red") : "green")
                        }}>
                    {reading.readingAuthor ? `${reading.spotsOpen - reading.readingAuthor.length} of ${reading.spotsOpen} spots open` : `${reading.spotsOpen} of ${reading.spotsOpen} spots open`} 
                </Typography>
                {reading.readingAuthor && reading.readingAuthor.length > 0 && (
                <Typography variant="body1" color="text.secondary" fontWeight={"bold"}>
                    Authors:
                    <AuthorList reading={reading} />
                </Typography>
                )}
                <Button 
                    startIcon={<ReviewsIcon />}
                    size="small"
                    variant="contained"
                    sx={{ mt: 2, }}
                >
                    {/* onClick={() => navigate(`/readingfeedback/${r.id}`)} */}
                    Review              
                </Button>
            </Stack>
        </Grid>
    )
}
export default ReadingScheduleForm;