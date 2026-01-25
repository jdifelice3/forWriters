"use client";

import {
  Paper,
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
  TextField,
  Typography,
  Stack,
  Tab,
  Tabs,

} from "@mui/material";
import { 
    AppFile, 
    FileFeedback, 
    Reading, 
    ReadingSubmission 
} from "../types/domain-types";
import { FileDomainCommands } from "../types/FileTypes";
import { CommentDTO } from "../types/FeedbackTypes";

import { useState, useEffect } from "react";
import { useReadings } from "../hooks/reading/useReadings"
import { useFileDomain } from "../hooks/file/useFileDomain";
import { useFilesData } from "../hooks/file/useFilesData";
import { useFilesDataFeedback } from "../hooks/file/useFilesDataFeedback";
import { useUserContext } from "../context/UserContext";
import { useFiles } from "../hooks/file/useFiles";
import { useParams } from "react-router-dom";

import { UploadFileFormProperties } from "../types/FileTypes";
import Grid from "@mui/material/Grid";
import { lightBlue } from "@mui/material/colors";

const uploadFormProperties: UploadFileFormProperties =
  {
    title: "",
    subtitle: "Upload the author's Word Doc with your inline comments",
    buttonChooseFileText: "CHOOSE FILE",
    buttonUploadText: "UPLOAD",
    titleVariant: "body1",
    showUploadIcon: false
  }

const FileFeedbackDetail = () => {
    const { getFileFeedbackUnique } = useFileDomain();
    const { appFileId } = useParams<{ appFileId: string }>();

    const [comments, setComments] = useState<CommentDTO[] | undefined>();
    const [commentCount, setCommentCount] = useState<Number>(0);
    const [tab, setTab] = useState(0);

    useEffect(() => {
        let cancelled = false;

        async function loadComments() {
            const result = await getFileFeedbackUnique(appFileId!);
            if (!cancelled) {
                setComments(result);
                setCommentCount(result.length); 
            }
        }

        if (appFileId) loadComments();

        return () => {
            cancelled = true;
        };
    }, [appFileId]);

    const { paragraphFeedbackDTO } = useFilesDataFeedback(comments);

  return (
    <Box 
        sx={{ 
            maxWidth: 900, 
            mx: "auto", 
            p: 0,
            marginLeft: "55px",
            
        }}>
        <Typography variant="h4" mb={3} textAlign="left">
            TITLE
        </Typography>
        <Typography variant="h4" mb={2}>
            Manuscripts to Review
        </Typography>
        {commentCount === 0 && (
            <>
            <Typography>
                    There is no feedback to display
                </Typography>
            </>
        )}
            {!appFileId ? (
                <Card>
                    <CardContent>
                        <Typography variant="body1" color="text.secondary">
                            No files uploaded yet.
                        </Typography>
                    </CardContent>
                </Card>
            ) : (
     <Card elevation={0} className="filesComponentPanel">
        <CardContent>
        
          <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{mb: 2}}>
            <Tab label="Manuscript View" disabled={commentCount === 0}/>
            <Tab label="Comments by Paragraph" disabled={commentCount === 0}/>
            <Tab label="Comments by User" disabled={commentCount === 0}/>
          </Tabs>

          {tab === 0 && (
            <>

            </>
          )}

          {tab === 1 && (
            <>            
                {Object.entries(paragraphFeedbackDTO).map(([key, value]) => (
                    <Card sx={{mb:2, backgroundColor: "white"}}>
                        <CardContent>
                            <Typography fontWeight={"bold"}>
                                Paragraph {key.split("-")[1]}
                            </Typography>
                            {value.map(v => (
                                <Box>
                                <Typography sx={{backgroundColor: "#fdeee3"}}>
                                    "{v.targetText}"
                                </Typography>
                                <Typography sx={{backgroundColor: "#e3fdfb"}}>
                                    {v.commentText}
                                    </Typography>
                                <Typography fontStyle={"italic"} sx={{mb: 2}}>
                                    - {v.reviewerDisplayName}
                                </Typography>
                                </Box>
                            ))}
                        </CardContent>
                    </Card>
                ))}
            </>
          )} 

          {tab == 1 && (
            <>
            </>
          )}
            
        </CardContent>
    </Card>
            )}
    </Box>
    )
}

export default FileFeedbackDetail;