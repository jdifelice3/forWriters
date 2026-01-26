import { useMemo } from 'react';
import { CommentsForDisplay, CommentDTO } from "../../types/FeedbackTypes";

export const useFilesDataFeedback = (commentDTO?: CommentDTO[]) => {

    const mapParagraphDTO = (): CommentsForDisplay[] => {
        if (!commentDTO) return [];
        return commentDTO.flatMap(c =>
            c.targets.map(t => ({
                paragraphId: t.paragraphId,
                targetText: t.targetText,
                commentText: c.commentText,
                reviewerDisplayName: c.reviewerDisplayName
            }))
        );
    };

    const getParagraphGroups = (): Record<string, CommentsForDisplay[]> => {
        const groups: Record<string, CommentsForDisplay[]> = {};
        for (const p of mapParagraphDTO()) {
            if (!groups[p.paragraphId]) groups[p.paragraphId] = [];
            groups[p.paragraphId].push(p);
        }
        return groups;
    };

    const getReviewerGroups = (): Record<string, CommentsForDisplay[]> => {
        const groups: Record<string, CommentsForDisplay[]> = {};
        for (const r of mapParagraphDTO()) {
            if (!groups[r.reviewerDisplayName]) groups[r.reviewerDisplayName] = [];
            groups[r.reviewerDisplayName].push(r);
        }
        return groups;
    };


    const commentsByParagraph = useMemo<Record<string, CommentsForDisplay[]>>(() => {
        if (!commentDTO) return {};
        return getParagraphGroups();
    }, [commentDTO]);

    const commentsByReviewer = useMemo<Record<string, CommentsForDisplay[]>>(() => {
        if (!commentDTO) return {};
        return getReviewerGroups();
    }, [commentDTO]);

    return { commentsByParagraph, commentsByReviewer };
};
