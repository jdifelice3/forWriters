// src/components/review/ManuscriptReview.tsx
import React, { useMemo, useRef, useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Box, Paper, TextField, Button, Typography } from "@mui/material";

import { ParagraphWithId } from "../../extensions/ParagraphWithId";
import { DraftHighlightExtension } from "../../extensions/DraftHighlightExtension";
import {
  CommentHighlightExtension,
  CommentRange,
} from "../../extensions/CommentHighlightExtension";
import { CommentDTO } from "../../types/FeedbackTypes";
import { CommentsAPI } from "../../api/comments";
import { InsertInvitationOutlined } from "@mui/icons-material";

/* ---------- types ---------- */

type ActiveRange = {
  from: number;
  to: number;
  paragraphId: string;
  top: number;
  targetText: string; // 👈 ADD THIS
};


type Props = {
  html: string;
  fileFeedbackId: string;
  reviewerUserId: string;
  initialComments: CommentDTO[];
};

/* ---------- component ---------- */

export function ManuscriptReview({
  html,
  fileFeedbackId,
  reviewerUserId,
  initialComments,
}: Props) {
    console.log('in ManuscriptReviewer')
    console.log('initlaComments', initialComments)
  const containerRef = useRef<HTMLDivElement>(null);
  const draftLockedRef = useRef(false);

  const [comments, setComments] = useState<CommentDTO[]>(initialComments);
  const [activeRange, setActiveRange] = useState<ActiveRange | null>(null);
  const [draftComment, setDraftComment] = useState("");

  const commentRanges: CommentRange[] = useMemo(
    () =>
      comments.flatMap((c) =>
        c.targets.map((t) => ({
          commentId: c.id,
          from: t.from,
          to: t.to,
        }))
      ),
    [comments]
  );

  const editor = useEditor(
    {
      editable: false,
      autofocus: false,

      extensions: [
        StarterKit.configure({ paragraph: false }),
        ParagraphWithId,
        DraftHighlightExtension,
        CommentHighlightExtension.configure({
          ranges: commentRanges,
        }),
      ],

      content: html,

    },
    []
  );

  useEffect(() => {
  if (!editor || !containerRef.current) return;

  const el = containerRef.current;

  const handleMouseUp = () => {
    if (draftLockedRef.current) return;

    const sel = editor.state.selection;
    if (sel.empty) return;

    const { from, to } = sel;
    if (to - from <= 1) return;

    const $from = editor.state.doc.resolve(from);
    const paragraphId = $from.parent.attrs.paragraphId;
    if (!paragraphId) return;

    const coords = editor.view.coordsAtPos(from);
    const rect = el.getBoundingClientRect();

    const targetText = editor.state.doc
      .textBetween(from, to, "\n", " ")
      .trim();

    draftLockedRef.current = true;

    editor.commands.setDraftRange({ from, to });

    setActiveRange({
      from,
      to,
      paragraphId,
      top: coords.top - rect.top,
      targetText,
    });
  };

  el.addEventListener("mouseup", handleMouseUp);
  return () => el.removeEventListener("mouseup", handleMouseUp);
}, [editor]);


async function handleSave() {
  if (!activeRange || !draftComment.trim()) return;

  try {
    const created = await CommentsAPI.create(fileFeedbackId, {
      reviewerUserId,
      commentText: draftComment,
      source: "DOCX",
      targets: [
        {
          paragraphId: activeRange.paragraphId,
          from: activeRange.from,
          to: activeRange.to,
          targetText: activeRange.targetText, // ✅ USE STORED VALUE
        },
      ],
    });

    setComments(prev => [...prev, created]);
  } finally {
    resetUI();
  }
}

  function resetUI() {
    editor?.commands.clearDraftRange();
    draftLockedRef.current = false;
    setActiveRange(null);
    setDraftComment("");
  }

  if (!editor) return null;

  return (
    <Box ref={containerRef} sx={{ position: "relative", width: 675 }}>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <EditorContent editor={editor} />
      </Paper>

      {activeRange && (
        <Paper
          elevation={4}
          sx={{
            position: "absolute",
            top: Math.max(8, activeRange.top),
            left: 560,
            width: 280,
            p: 2,
            zIndex: 50,
          }}
        >
          <Typography variant="subtitle2">Add comment</Typography>

          <TextField
            multiline
            minRows={3}
            fullWidth
            value={draftComment}
            onChange={(e) => setDraftComment(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") resetUI();
              if ((e.ctrlKey || e.metaKey) && e.key === "Enter") handleSave();
            }}
          />

          <Box mt={1} display="flex" justifyContent="space-between">
            <Button size="small" onClick={resetUI}>
              Cancel
            </Button>
            <Button size="small" variant="contained" onClick={handleSave}>
              Save
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
}
