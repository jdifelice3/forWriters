"use client";

import { useState } from "react";
import { ReadingAuthor, ReadingFeedback } from "../../../backend/src/domain-types";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import FileIcon from './FileIcon';
import Grid from "@mui/material/Grid";
import ReviewsIcon from '@mui/icons-material/Reviews';
import EditIcon from '@mui/icons-material/Edit';

interface FeedbackCommentListProps {
  readingAuthor: ReadingAuthor;
}

const FeedbackCommentList: React.FC<FeedbackCommentListProps> = ({readingAuthor}) => {
  
  return (
    <div>
        {readingAuthor.readingFeedback.map((fb => (
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
                {fb.readingFeedbackComment.map((com => (
                    <>
                <Grid key={com.id} sx={{p: 2}} className="row">
                    <EditIcon sx={{fontSize: '24px', verticalAlign: "bottom", paddingRight:1}}/>{com.targetText}
                </Grid>
                <Grid key={com.id} sx={{p: 2}} className="row">
                    <ReviewsIcon sx={{fontSize: '24px', verticalAlign: "bottom", paddingRight:1}}/>{com.commentText}
                </Grid>
                    </>
            )))}
            </Grid>
        )))}
        
    </div>
  )
}

export default FeedbackCommentList; 