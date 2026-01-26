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
    AppFileMeta,
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
import { ManuscriptReview } from "../components/review/ManuscriptReview";

const FileFeedbackDetail = () => {
    const { appFileId } = useParams<{ appFileId: string }>();
    //console.log('appFileId', appFileId)
    if(!appFileId) return;

    let cancelled = false;

    const { getFileFeedbackUnique, getHTML } = useFileDomain();
    const { files } = useFiles();

    const [comments, setComments] = useState<CommentDTO[] | undefined>();
    const [commentCount, setCommentCount] = useState(0);
    const [manuscriptTitle, setManuscriptTitle]= useState("");
    const [tab, setTab] = useState(0);
    const [appFileMeta, setAppFileMeta] = useState<AppFileMeta | undefined>(undefined);
    const [appFile, setAppFile] = useState<AppFile | undefined>(undefined);
    const [manuscriptHtml, setManuscriptHtml] = useState<string>("");
    const [initialComments, setInititalComments] = useState<Record<string, CommentDTO[]>>({});
 
    useEffect(() => {
        if (!appFileId || files.length === 0) return;

        const meta = files.find(f =>
            f.appFile.some(ff => ff.id === appFileId)
        );

        if (!meta) return;

        setAppFileMeta(meta);
        setAppFile(meta.appFile.find(f => f.id === appFileId));
        setManuscriptTitle(meta.title ?? "");
    }, [files, appFileId]);

    useEffect(() => {
        if (!appFileId) return;

        const load = async () => {
            const result = await getFileFeedbackUnique(appFileId);
            setComments(result);
            setCommentCount(result.length);

            if (result.length > 0) {
            const html = await getHTML(appFileId);
            setManuscriptHtml(html);
            }
        };

        load();
    }, [appFileId, getFileFeedbackUnique, getHTML]);

    const { commentsByParagraph } = useFilesDataFeedback(comments);
    const { commentsByReviewer } = useFilesDataFeedback(comments);
    console.log('manuscriptHtml', manuscriptHtml)
  return (
    <Box 
        sx={{ 
            maxWidth: 900, 
            mx: "auto", 
            mt: 2,
            p: 0,
            marginLeft: "55px",
            
        }}>
        <Typography variant="h4" mb={3} textAlign="left">
            Feedback for {manuscriptTitle}
        </Typography>
        <Typography variant="body1" mb={0}>
            <b>Version</b>: {appFile ? appFile.version.toString() : ""}
        </Typography>
        <Typography variant="body1" mb={2}>
            <b>Filename</b>: {appFile ? appFile.filename.toString() : ""}
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

            {tab === 0 && commentCount > 0 && manuscriptHtml && (
                <ManuscriptReview
                    html={manuscriptHtml}
                    initialComments={comments!}
                    fileFeedbackId={undefined}
                    reviewerUserId={undefined}
                    readOnly
                />
            )}

          {tab === 1 && (
            <>            
                {Object.entries(commentsByParagraph).map(([key, value]) => (
                    <Card sx={{mb:2, backgroundColor: "white"}}>
                        <CardContent>
                            <Typography fontWeight={"bold"} sx={{mb:1}}>
                                Paragraph {key.split("-")[1]}
                            </Typography>
                            {value.map(v => (
                                <Box>
                                <Typography sx={{backgroundColor: "#fdeee3", p:2}}>
                                    "{v.targetText}"
                                </Typography>
                                <Typography sx={{backgroundColor: "#e3fdfb", p:2}}>
                                    {v.commentText}
                                    </Typography>
                                <Typography fontStyle={"italic"} sx={{mb: 2, mt:1}}>
                                    - {v.reviewerDisplayName}
                                </Typography>
                                </Box>
                            ))}
                        </CardContent>
                    </Card>
                ))}
            </>
          )} 

          {tab == 2 && (
            <>
                {Object.entries(commentsByReviewer).map(([key, value]) => (
                    <Card sx={{mb:2, backgroundColor: "white"}}>
                        <CardContent>
                            <Typography fontWeight={"bold"}  sx={{mb:1}}>
                                Reviewer: {key} 
                            </Typography>
                            {value.map(v => (
                                <Box>
                                    <Typography fontStyle={"oblique"} sx={{mb:1, mt: 1}}>
                                        Paragraph {v.paragraphId.split("-")[1]}
                                    </Typography>
                                    <Typography sx={{backgroundColor: "#fdeee3", p:2}}>
                                        "{v.targetText}"
                                    </Typography>
                                    <Typography sx={{backgroundColor: "#e3fdfb", p:2}}>
                                        {v.commentText}
                                        </Typography>
                                </Box>
                            ))}
                        </CardContent>
                    </Card>
                ))}

            </>
          )}
            
        </CardContent>
    </Card>
            )}
    </Box>
    )
}

export default FileFeedbackDetail;