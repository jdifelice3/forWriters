"use client";

import { ReadingAuthorByUser } from "../../types/domain-types";
import { generateRandomString } from "../../util/Math";
import {
    Divider,
    Typography,
    Box
} from "@mui/material";
import Grid from "@mui/material/Grid";
import ReviewsIcon from '@mui/icons-material/Reviews';
import EditIcon from '@mui/icons-material/Edit';

interface FeedbackCommentListProps {
  readingAuthor: ReadingAuthorByUser;
}

const FeedbackCommentList: React.FC<FeedbackCommentListProps> = ({readingAuthor}) => {
   
  return (
    <Box>
        {readingAuthor.readingFeedback.map((fb => (
            <div key={generateRandomString(5)}>
            <Grid key={generateRandomString(5)}
                container
                direction="column"
                spacing={1}
                sx={{ p:1,
                    "& > .row:nth-of-type(odd)": {
                    backgroundColor: "grey.100",
                    },
                    "& > .row:nth-of-type(even)": {
                    backgroundColor: "background.paper",
                    },
                }}
            >
                <Typography key={generateRandomString(10)} sx={{fontWeight:"bold"}}>
                    {/* {fb.user.userProfile?.firstName} {fb.user.userProfile?.lastName} */}
                </Typography>
                {fb.readingFeedbackComment.map((com => (
                <>
                {com.source === "DOCX" ? (  
                    <>
                    <Grid key={generateRandomString(10)} sx={{p: 2}} className="row">
                        <EditIcon sx={{fontSize: '24px', verticalAlign: "bottom", paddingRight:1}}/>{com.targetText}
                    </Grid>
                    <Grid key={generateRandomString(10)} sx={{p: 2}} className="row">
                        <ReviewsIcon sx={{fontSize: '24px', verticalAlign: "bottom", paddingRight:1}}/>{com.commentText}
                    </Grid>
                    </>
                ) : (
                    <>
                    <Typography key={generateRandomString(10)} sx={{m: 1, fontWeight:"bold"}}>
                        Additional Feedback
                    </Typography>
                    
                    <Grid key={generateRandomString(10)} sx={{p: 2}} className="row">
                        {com.commentText === "" ? "No additional feedback" : com.commentText}
                    </Grid>
                    </>
                )}
                </>
            )))}
            </Grid>
            <Divider key={generateRandomString(10)} sx={{ my: 4 }} />
            </div>
        )))}
    </Box>
  )
}

export default FeedbackCommentList; 