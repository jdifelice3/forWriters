import React, { useState, useEffect,useCallback } from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { ParagraphWithId } from "../../extensions/ParagraphWithId";
import { CommentHighlightExtension } from "../../extensions/CommentHighlightExtension";
import { CommentCreationOverlay } from "./CommentCreationOverlay";
import { MarginComments } from "../../components/review/MarginComments";
import { Comment} from "../../types/ReviewTypes";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";

type ManuscriptReviewProps = {
  html: string; // DOCX → Mammoth → HTML (with paragraph IDs)
  initialComments: Comment[];
};

export function ManuscriptReview({
  html,
  initialComments,
}: ManuscriptReviewProps) {
  const [activeRange, setActiveRange] = useState<{
    from: number;
    to: number;
    paragraphId: string;
    top: number;
    left: number;
  } | null>(null);

  const [draftComment, setDraftComment] = useState("");

  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [hoveredCommentId, setHoveredCommentId] = useState<string | null>(null);
  const [focusedCommentId, setFocusedCommentId] = useState<string | null>(null);

    const commentRanges = comments.map(c => ({
        commentId: c.id,
        from: c.from,
        to: c.to,
    }));

const editor = useEditor(
  {
    editable: false,
    extensions: [
      StarterKit.configure({ paragraph: false }),
      ParagraphWithId,
      CommentHighlightExtension.configure({
        comments: initialComments,
      }),
    ],
    content: html,

    onSelectionUpdate({ editor }) {
      const { from, to, empty } = editor.state.selection;
      const coords = editor.view.coordsAtPos(from);
      console.log("selection:", from, to, empty);

      if (empty) return;

      const paragraphId =
        editor.state.doc.resolve(from).parent.attrs.paragraphId;

      if (!paragraphId) return;

        setActiveRange({
            from,
            to,
            paragraphId,
            top: coords.top,
            left: coords.left,
        });

    },
  },
  [] // 👈 THIS is what stabilizes the editor
);

if (!editor) {
  return <div>Loading editor…</div>;
}
  if (!editor) return null;

  return (
    <Box sx={{ position: "relative", width: "550px" }}>
      {/* 1️⃣ Manuscript */}
        <Paper variant="outlined" sx={{ p: 2 }}>
            <EditorContent editor={editor} />
        </Paper>

      {/* 2️⃣ Comment input */}
      {activeRange && (
        <Paper
            elevation={4}
            sx={{
                position: "absolute",
                top: activeRange.top + 8,
                left: activeRange.left + 16,
                right: -320,
                width: 300,
                p: 2,
                zIndex: 10,
            }}
        >
          <Typography variant="subtitle2">
            Comment on selected text
          </Typography>

          <TextField
            multiline
            minRows={3}
            fullWidth
            value={draftComment}
            onChange={e => setDraftComment(e.target.value)}
            placeholder="Write your comment…"
            sx={{ mt: 1 }}
          />

          <Box mt={1} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              onClick={() => {
                // save comment here
                setDraftComment("");
                setActiveRange(null);
              }}
            >
              Save comment
            </Button>
          </Box>
        </Paper>
      )}

      {/* 3️⃣ Existing comments (optional) */}
      {/* <CommentList comments={initialComments} /> */}
    </Box>
  );
}
