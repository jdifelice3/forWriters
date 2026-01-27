"use client";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Tab,
  Tabs,

} from "@mui/material";
import { 
    AppFile, 
    AppFileMeta,
} from "../types/domain-types";
import { CommentDTO } from "../types/FeedbackTypes";

import { useState, useEffect } from "react";
import { useFileDomain } from "../hooks/file/useFileDomain";
import { useFilesDataFeedback } from "../hooks/file/useFilesDataFeedback";
import { useFiles } from "../hooks/file/useFiles";
import { useParams } from "react-router-dom";
import { ManuscriptReview } from "../components/review/ManuscriptReview";
import ReviewerRadioList from "../components/review/ReviewerRadioList";

const FileFeedbackDetail = () => {
    const { appFileId } = useParams<{ appFileId: string }>();
    if(!appFileId) return;

    const { getFileFeedbackUnique, getHTML } = useFileDomain();
    const { files } = useFiles();

    const [comments, setComments] = useState<CommentDTO[] | undefined>();
    const [commentCount, setCommentCount] = useState(0);
    const [selectedReviewer, setSelectedReviewer] = useState<string | undefined>(undefined);
    const [manuscriptTitle, setManuscriptTitle]= useState("");
    const [tab, setTab] = useState(0);
    const [appFileMeta, setAppFileMeta] = useState<AppFileMeta | undefined>(undefined);
    const [appFile, setAppFile] = useState<AppFile | undefined>(undefined);
    const [manuscriptHtml, setManuscriptHtml] = useState<string>("");
    const [initialComments, setInititalComments] = useState<CommentDTO[] | undefined>([]);
 
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

    const handleReviewerOnChange = (reviewerDisplayName: string) => {
        console.log(reviewerDisplayName);
        let reviewerComments: CommentDTO[] | undefined = undefined;
        if(reviewerDisplayName === "selectall"){
            reviewerComments = comments;
        } else {
            reviewerComments = comments?.filter(c => c.reviewerDisplayName === reviewerDisplayName); 
        }
        setInititalComments(reviewerComments);    
        setSelectedReviewer(reviewerDisplayName);
    }
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
     <Card elevation={0} className="filesComponentPanel" sx={{width: "1000px"}}>
        <CardContent>
        
          <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{mb: 2}}>
            <Tab label="Manuscript View" disabled={commentCount === 0}/>
            <Tab label="Comments by Paragraph" disabled={commentCount === 0}/>
            <Tab label="Comments by User" disabled={commentCount === 0}/>
          </Tabs>

            {tab === 0 && commentCount > 0 && manuscriptHtml && (
                <>
                <ReviewerRadioList
                    reviewers={commentsByReviewer}
                    selectedReviewer={selectedReviewer}
                    onChange={handleReviewerOnChange}
                />
                <ManuscriptReview
                    html={manuscriptHtml}
                    initialComments={initialComments!}
                    fileFeedbackId={undefined}
                    reviewerUserId={undefined}
                    readOnly={true}
                />
                </>
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
                                    {v.targetText}
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
                                        {v.targetText}
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