import { resolveReviewerParticipant } from "../routes/filesApi/filesApi.middleware";

export type ExtractedComment = {
  commentId: string;
  commentText: string;
  targets: string[];
};

export type CommentDTO = {
  id: string;
  readingFeedbackId: string;
  reviewerParticipantId: string;

  reviewerDisplayName: string;
  reviewerAvatarUrl?: string | null;

  commentText: string;
  isResolved: boolean;

  createdAt: string; // ISO
  updatedAt: string; // ISO

  targets: Array<{
    id: string;
    paragraphId: string;
    from: number;
    to: number;
    targetText: string;
  }>;
};



// const data: CommentDTO[] = [{
//     id: "",
//     readingFeedbackId: "",
//     reviewerParticipantId: "",

//     reviewerDisplayName: "",
//     reviewerAvatarUrl?: "",

//     commentText: "",
//     isResolved: true,

//     createdAt: "",
//     updatedAt: "",

//     targets: [{
//         id: "",
//         paragraphId: "",
//         from: 0,
//         to: 0,
//         targetText: ""
//     }]
// }]



// const p: ParagraphFeedback[] = data.flatMap(c => 
//     c.targets.map(t => ({
//         paragraphId: t.paragraphId,
//         targetText: t.targetText,
//         commentText: c.commentText,
//         reviewerParticipantId: c.reviewerParticipantId
//   }))
// );
