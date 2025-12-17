import { Reading } from "../../types/domain-types";
import AuthorList from "../member/AuthorList";
import {
    Box,
    Button,
    Grid,
    Stack,
    Typography,
} from "@mui/material";
import ReviewsIcon from '@mui/icons-material/Reviews';

interface ReadingScheduleFormPersonal {
  reading: Reading;
}

const ReadingScheduleFormPersonal: React.FC<ReadingScheduleFormPersonal> = ({ reading}) => {

    return (
        <Stack spacing={2}> 
            <Typography variant="h6" fontWeight="bold"
                sx={{
                    mb:100
                }}
            >
                {reading.name }
            </Typography>
            <Grid container spacing={10}>
                <Grid>
                {reading.readingAuthor && reading.readingAuthor.length > 0 && (
                    <Box>
                        <Typography variant={"body1"} fontWeight={"bold"}>Authors:</Typography>
                        <AuthorList reading={reading} />
                    </Box>
                )}
                </Grid>
                <Grid alignSelf="center">
                <Button className="readingReviewButton"
                    startIcon={<ReviewsIcon />}
                    size="small"
                    variant="contained"
                >
                    {/* onClick={() => navigate(`/readingfeedback/${r.id}`)} */}
                    Review              
                </Button>
                </Grid>
            </Grid>
        </Stack>
    )
}
export default ReadingScheduleFormPersonal;