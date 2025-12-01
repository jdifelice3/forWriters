"use client";

import { ReadingAuthorByUser } from "../../../backend/src/domain-types";
import {
    Divider,
    Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import ReviewsIcon from '@mui/icons-material/Reviews';
import EditIcon from '@mui/icons-material/Edit';

interface FeedbackCommentListProps {
  readingAuthor: ReadingAuthorByUser;
}

const FeedbackCommentList: React.FC<FeedbackCommentListProps> = ({readingAuthor}) => {
   
  return (
    <div>
        {readingAuthor.readingFeedback.map((fb => (
            <div>
            <Grid
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
                <Typography sx={{fontWeight:"bold"}}>
                    {fb.user.userProfile?.firstName} {fb.user.userProfile?.lastName}
                </Typography>
                {fb.readingFeedbackComment.map((com => (
                <>
                {com.source === "DOCX" ? (  
                    <>
                    <Grid key={com.id + "_"} sx={{p: 2}} className="row">
                        <EditIcon sx={{fontSize: '24px', verticalAlign: "bottom", paddingRight:1}}/>{com.targetText}
                    </Grid>
                    <Grid key={com.id} sx={{p: 2}} className="row">
                        <ReviewsIcon sx={{fontSize: '24px', verticalAlign: "bottom", paddingRight:1}}/>{com.commentText}
                    </Grid>
                    </>
                ) : (
                    <>
                    <Typography sx={{m: 1, fontWeight:"bold"}}>
                        Additional Feedback
                    </Typography>
                    
                    <Grid key={com.id + "_"} sx={{p: 2}} className="row">
                        {com.commentText === "" ? "No additional feedback" : com.commentText}
                    </Grid>
                    </>
                )}
                </>
            )))}
            </Grid>
            <Divider sx={{ my: 4 }} />
            </div>
        )))}
    </div>
  )
}

export default FeedbackCommentList; 