import { useMemo } from 'react';
import { ParagraphFeedback, CommentDTO } from "../../types/FeedbackTypes";

export const useFilesDataFeedback = (commentDTO?: CommentDTO[]) => {

    const mapParagraphDTO = (): ParagraphFeedback[] => {
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

    const getParagraphGroups = (): Record<string, ParagraphFeedback[]> => {
        const groups: Record<string, ParagraphFeedback[]> = {};
        for (const p of mapParagraphDTO()) {
            if (!groups[p.paragraphId]) groups[p.paragraphId] = [];
            groups[p.paragraphId].push(p);
        }
        return groups;
    };

    const paragraphFeedbackDTO = useMemo<Record<string, ParagraphFeedback[]>>(() => {
        if (!commentDTO) return {};
        return getParagraphGroups();
    }, [commentDTO]);

    return { paragraphFeedbackDTO };
};
