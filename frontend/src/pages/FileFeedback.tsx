"use client";

import { useState, useEffect, useMemo } from "react";
import { useGroupContext } from "../context/GroupContextProvider";
import { useFileDomain } from "../hooks/file/useFileDomain";
import { useReadings } from "../hooks/reading/useReadings";
import { useReadingDomain } from "../hooks/reading/useReadingDomain";
import { AppFile, Reading, ReadingSubmission } from "../types/domain-types";
import { useParams } from "react-router-dom";
import {
  Box,
  Alert,
  Card,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import { useUserContext } from "../context/UserContext";
import { FileDomainCommands } from "../types/FileTypes";
import { CommentDTO } from "../types/FeedbackTypes";
import { ManuscriptReview } from "../components/review/ManuscriptReview";
import { useCritiqueWorkflow } from "../hooks/reading/useCritiqueWorkflow";

const FileFeedback = () => {
    const { user } = useUserContext();
    const { 
        saveMetadata, 
        deleteFile, 
        uploadVersion, 
        uploadManuscript,
        setActiveVersion, 
        getFileFeedback,
        getFileFeedbackUnique,
        getComments,
        getDeletionIds,
        getHTML,
        exportFeedbackReport
      } = useFileDomain();

    const { activeGroup } = useGroupContext();
    const { groupId, readingId } = useParams<{ groupId: string; readingId: string }>();
    const { readings, isLoading: isReadingLoading, refresh } = useReadings();
    const reading: Reading | undefined = readings.find(r => r.id === readingId);
    const { workflow } = useCritiqueWorkflow(groupId, readingId);
    const { canReviewFile, getManuscriptHtml } = useReadingDomain(activeGroup?.id, user, readings, refresh);
    const [editFile, setEditFile] = useState<AppFile | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [eventTitle, setEventTitle] = useState("");
    const [manuscriptHtmlBySubmission, setManuscriptHtmlBySubmission] = useState<Record<string, string>>({});
    const [fileFeedbackIds, setFileFeedbackIds] = useState<Record<string, string>>({});
    const [initialComments, setInititalComments] = useState<Record<string, CommentDTO[]>>({});
    const [reviewLoadError, setReviewLoadError] = useState("");

    const requestedSubmissionId = new URLSearchParams(window.location.search).get("submission");
    const visibleSubmissions = useMemo(() => {
        const reviewableSubmissionIds = new Set(
            workflow?.submissions
                .filter((submission) =>
                    submission.assignments.some(
                        (assignment) => assignment.reviewer.userId === user?.id
                    )
                )
                .map((submission) => submission.id) ?? []
        );

        return reading?.readingSubmission.filter((submission) => {
            if (!groupId || !workflow) return true;
            if (!reviewableSubmissionIds.has(submission.id)) return false;
            return !requestedSubmissionId || submission.id === requestedSubmissionId;
        }) ?? [];
    }, [groupId, reading?.readingSubmission, requestedSubmissionId, user?.id, workflow]);
    const reviewReading = useMemo(
        () => reading ? { ...reading, readingSubmission: visibleSubmissions } : undefined,
        [reading, visibleSubmissions]
    );

    useEffect(() => {
        if (!reviewReading) return;
        const currentReviewReading = reviewReading;
        
        let cancelled = false;

        async function loadReviewData() {
            try {
                const ids = await getFileFeedback(currentReviewReading);
                const commentEntries = await Promise.all(
                    Object.entries(ids).map(async ([submissionId, feedbackId]) => (
                        [submissionId, await getComments(feedbackId)] as const
                    ))
                );
                const htmlEntries = await Promise.all(
                    currentReviewReading.readingSubmission
                        .filter((submission) => Boolean(submission.appFile))
                        .map(async (submission) => (
                            [
                                submission.id,
                                await getManuscriptHtml(currentReviewReading.id, submission.id),
                            ] as const
                        ))
                );

                if (cancelled) return;

                const htmlBySubmission: Record<string, string> = {};
                htmlEntries.forEach(([submissionId, html]) => {
                    if (html) htmlBySubmission[submissionId] = html;
                });
                if (htmlEntries.some(([, html]) => !html)) {
                    throw new Error("The manuscript response did not contain document content.");
                }

                setFileFeedbackIds(ids);
                setInititalComments(Object.fromEntries(commentEntries));
                setManuscriptHtmlBySubmission(htmlBySubmission);
                setReviewLoadError("");
            } catch (error) {
                if (cancelled) return;
                console.error("Unable to load review data", error);
                setReviewLoadError("The manuscript could not be loaded. Please try refreshing the page.");
            }
        }

        loadReviewData();

        return () => {
            cancelled = true;
        };
    }, [
        reviewReading,
        getFileFeedback,
        getComments,
        getManuscriptHtml,
    ]);

    if ( !activeGroup || !reading ) {
        return (
            <Box display="flex" justifyContent="center" p={6}>
                <CircularProgress size={24} />
            </Box>
    )};
    
    const domain: FileDomainCommands = {
        saveMetadata:saveMetadata,
        deleteFile: deleteFile,
        uploadVersion: uploadVersion,
        uploadManuscript: uploadManuscript,
        setActiveVersion: setActiveVersion,
        getFileFeedback: getFileFeedback,
        getFileFeedbackUnique: getFileFeedbackUnique,
        getComments: getComments,
        getDeletionIds: getDeletionIds,
        getHTML: getHTML,
        exportFeedbackReport: exportFeedbackReport
    }

  return (
    <Box 
        sx={{ 
            maxWidth: 900, 
            mx: "auto", 
            p: 0,
            marginLeft: "55px",
            
        }}>
        <Typography variant="h4" mb={3} textAlign="left">
            {eventTitle}
        </Typography>
        <Typography variant="h4" mb={2}>
            Manuscripts to Review
        </Typography>
        <Typography variant="h6">
            Reading: {reading?.name}
        </Typography>
        {reading!.readingDate && (
            <Typography variant="h6">
                Date: {new Date(reading!.readingDate || "").toLocaleDateString()}
            </Typography>
        )}
        <Typography  variant="h6" sx={{mb:2}}>
            There&nbsp;
            {reading!.readingSubmission.length === 1 ? "is" : "are"}&nbsp;
            <b>{visibleSubmissions.length}</b> manuscript
            {visibleSubmissions.length === 1 ? "" : "s"}&nbsp;to review
        </Typography>
        <Typography variant="h6" sx={{color: "blue", mb: 2}} fontWeight={"bold"}>
            Highlight manuscript text and add a comment in the popup box
        </Typography>
        {reviewLoadError && (
            <Alert severity="error" sx={{ mb: 2 }}>
                {reviewLoadError}
            </Alert>
        )}
            {visibleSubmissions.length === 0 ? (
                <Card>
                    <CardContent>
                        <Typography variant="body1" color="text.secondary">
                            No manuscripts are assigned to you in this reading.
                        </Typography>
                    </CardContent>
                </Card>
            ) : (
                visibleSubmissions.map((rs: ReadingSubmission) => (
                    <Card key={rs.id} sx={{mb:4}}>
                        <CardContent>
                            <Grid container>
                                <Grid size={{xs:12, md:9 }} key={rs.id} >
                                    <Typography variant="h4" fontWeight="bold">
                                        {rs.appFile.appFileMeta.title}
                                    </Typography>
                                    <Typography fontWeight="bold">
                                        by &nbsp;
                                        {rs.appFile.appFileMeta.user.userProfile?.firstName}&nbsp;
                                        {rs.appFile.appFileMeta.user.userProfile?.lastName} 
                                    </Typography>
                                    <Typography
                                            align="justify"
                                            variant="body1"
                                            color="text.secondary"
                                            sx={{ mb: 2, mt: 2, mr:-4, width: "550px"}}
                                            fontStyle={"italic"}
                                    >
                                        {rs.appFile.appFileMeta.description}
                                    </Typography>
                                            {!canReviewFile(rs.appFile, user.id) ? (
                                                <Typography variant="h6">
                                                    You are the author of this manuscript and cannot review it
                                                </Typography>
                                            ) : (
                                                <>
                                                <Box sx={{mb: 10}}>
                                                {reviewLoadError ? null : manuscriptHtmlBySubmission[rs.id] ? (
                                                    <ManuscriptReview
                                                        html={manuscriptHtmlBySubmission[rs.id]}
                                                        initialComments={initialComments[rs.id]}
                                                        fileFeedbackId={fileFeedbackIds[rs.id]}
                                                        reviewerUserId={user.id}
                                                        readOnly={false}
                                                    />
                                                ) : (
                                                    <CircularProgress size={20} />
                                                )}
                                                </Box>
                                                </>
                                        )}
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                )
            ))}
      
      {/* Edit dialog */}
      <Dialog open={!!editFile} onClose={() => setEditFile(null)} fullWidth maxWidth="sm">
        <DialogTitle>
          Edit File Metadata
          <IconButton
            onClick={() => setEditFile(null)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            sx={{ mt: 1 }}
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <TextField
            label="Description"
            fullWidth
            sx={{ mt: 2 }}
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            multiline
            rows={3}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default FileFeedback;
