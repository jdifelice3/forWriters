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
import { ReadingCommands } from "../../types/ReadingTypes";

interface ReadingScheduleFormPersonal {
  reading: Reading;
  commands: ReadingCommands;
}

const ReadingScheduleFormPersonal: React.FC<ReadingScheduleFormPersonal> = ({ reading, commands}) => {

    return (
        <Stack spacing={2}> 
            <Typography variant="body1" fontWeight="bold">
                {reading.name }
            </Typography>
                {reading.readingParticipant && reading.readingParticipant.length > 0 && (
                    <Box>
                        <Typography variant={"body2"} fontWeight={"bold"}>Authors:</Typography>
                        <AuthorList reading={reading} />
                    </Box>
                )}
                <Button className="readingReviewButton"
                    startIcon={<ReviewsIcon />}
                    size="small"
                    variant="contained"
                    onClick={(event) => commands.feedback(event, reading.id)}
                >
                    Review            
                </Button>
        </Stack>
    )
}
export default ReadingScheduleFormPersonal;