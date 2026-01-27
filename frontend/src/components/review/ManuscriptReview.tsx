import React, { useEffect, useMemo, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Box, Paper, TextField, Typography, Button, Chip } from "@mui/material";

import { ParagraphWithId } from "../../extensions/ParagraphWithId";
import {
  CommentHighlightExtension,
  CommentHighlightKey,
} from "../../extensions/CommentHighlightExtension";
import {
  DraftHighlightExtension,
  DraftHighlightKey,
} from "../../extensions/DraftHighlightExtension";

import { Comment, CommentDTO } from "../../types/FeedbackTypes";
import { CommentsAPI } from "../../api/comments";

/* =========================
   Types
========================= */

type ActiveRange = {
  from: number;
  to: number;
  paragraphId: string;
  top: number;
};

type Props = {
  html: string;
  fileFeedbackId: string | undefined;
  reviewerUserId: string | undefined;
  initialComments: CommentDTO[];
  readOnly: boolean;
};


type CommentRange = {
  commentId: string;
  from: number;
  to: number;
};

/* =========================
   Component
========================= */

export function ManuscriptReview({
  html,
  fileFeedbackId,
  reviewerUserId,
  initialComments,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  // We lock after mouseup captures the FINAL selection
  const draftLockedRef = useRef(false);

  const [comments, setComments] = useState<Comment[]>([]);
  const [activeRange, setActiveRange] = useState<ActiveRange | null>(null);
  const [draftText, setDraftText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [focusedCommentId, setFocusedCommentId] = useState<string | null>(null);

  /* =========================
     Hydrate from props
  ========================= */

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  /* =========================
     Derived highlight ranges
  ========================= */

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

  /* =========================
     Editor
  ========================= */

  const editor = useEditor(
    {
      editable: false,
      autofocus: false,

      extensions: [
        StarterKit.configure({ paragraph: false }),
        ParagraphWithId,
        DraftHighlightExtension,
        CommentHighlightExtension.configure({
          onClickComment: (commentId: string) => {
            openEditForComment(commentId);
          },
        }),
      ],

      content: html,

      editorProps: {
        handleDOMEvents: {
          mouseup: (_view, _event) => {
            if (!editor) return false;
            if (editingCommentId) return false;
            if (draftLockedRef.current) return false;

            const sel = editor.state.selection;
            if (sel.empty) return false;

            const { from, to } = sel;
            if (to <= from) return false;

            const $from = editor.state.doc.resolve(from);
            const paragraphId = $from.parent.attrs.paragraphId;
            if (!paragraphId) return false;

            const container = containerRef.current;
            if (!container) return false;

            const coords = editor.view.coordsAtPos(from);
            const rect = container.getBoundingClientRect();

            // 🔒 Lock ONLY after mouseup captures final selection
            draftLockedRef.current = true;

            setActiveRange({
              from,
              to,
              paragraphId,
              top: coords.top - rect.top,
            });

            // Draft highlight independent of selection/focus
            editor.view.dispatch(
              editor.state.tr.setMeta(DraftHighlightKey, { from, to })
            );

            return false;
          },
        },
      },
    },
    []
  );

  /* =========================
     Feed comment highlights
  ========================= */

  useEffect(() => {
    if (!editor) return;
    editor.view.dispatch(
      editor.state.tr.setMeta(CommentHighlightKey, commentRanges)
    );
  }, [editor, commentRanges]);

  /* =========================
     Helpers
  ========================= */

  function clearDraft() {
    if (!editor) return;

    editor.view.dispatch(editor.state.tr.setMeta(DraftHighlightKey, "clear"));

    draftLockedRef.current = false;
    setActiveRange(null);
    setDraftText("");
    setEditingCommentId(null);
  }

  function openEditForComment(commentId: string) {
    if (!editor || !containerRef.current) return;

    const comment = comments.find((c) => c.id === commentId);
    if (!comment) return;

    const first = comment.targets[0];
    if (!first) return;

    const coords = editor.view.coordsAtPos(first.from);
    const rect = containerRef.current.getBoundingClientRect();

    setEditingCommentId(commentId);
    setFocusedCommentId(commentId);
    setDraftText(comment.commentText);

    // Lock draft UI while editing
    draftLockedRef.current = true;

    setActiveRange({
      from: first.from,
      to: first.to,
      paragraphId: first.paragraphId,
      top: coords.top - rect.top,
    });

    editor.view.dispatch(
      editor.state.tr.setMeta(DraftHighlightKey, {
        from: first.from,
        to: first.to,
      })
    );

    editor.commands.setTextSelection({ from: first.from, to: first.to });
    editor.commands.scrollIntoView();
  }

  async function handleSave() {
    if (!editor || !activeRange || !draftText.trim()) return;
    if (activeRange.to <= activeRange.from) return;

    try {
      if (editingCommentId) {
        const updated = await CommentsAPI.updateText(
          fileFeedbackId!,
          editingCommentId,
          draftText
        );

        setComments((prev) =>
          prev.map((c) => (c.id === updated.id ? updated : c))
        );
      } else {
        // ✅ targetText computed from the frozen, final selection (captured on mouseup)
        const targetText = editor.state.doc.textBetween(
          activeRange.from,
          activeRange.to,
          " "
        );

        const created = await CommentsAPI.create(fileFeedbackId!, {
          reviewerUserId: reviewerUserId!,
          commentText: draftText,
          source: "DOCX",
          targets: [
            {
              paragraphId: activeRange.paragraphId,
              from: activeRange.from,
              to: activeRange.to,
              targetText,
            },
          ],
        });

        setComments((prev) => [...prev, created]);
        setFocusedCommentId(created.id);
      }
    } finally {
      clearDraft();
    }
  }

  if (!editor) return null;

  const containerRect = containerRef.current
    ? containerRef.current.getBoundingClientRect()
    : null;

  /* =========================
     Render
  ========================= */

  return (
    <Box ref={containerRef} sx={{ position: "relative", width: "550px" }}>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <EditorContent editor={editor} />
      </Paper>

      {/* Existing comments */}
      {containerRect &&
        comments.map((c) => {
          const first = c.targets[0];
          if (!first) return null;

          const coords = editor.view.coordsAtPos(first.from);

          return (
            <Paper
              key={c.id}
              sx={{
                position: "absolute",
                top: coords.top - containerRect.top,
                left: 560,
                width: 300,
                p: 1.25,
                opacity: c.isResolved ? 0.6 : 1,
                cursor: "pointer",
                zIndex: focusedCommentId === c.id ? 30 : 10,
              }}
              elevation={focusedCommentId === c.id ? 6 : 2}
              onClick={() => openEditForComment(c.id)}
            >
              <Box display="flex" justifyContent="space-between">
                <Typography variant="caption" fontWeight={700}>
                  {c.reviewerDisplayName}
                </Typography>
                {c.isResolved && <Chip size="small" label="Resolved" />}
              </Box>

              <Typography variant="body2" sx={{ mt: 0.5 }}>
                {c.commentText}
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: 0.5, display: "block" }}
              >
                {new Date(c.createdAt).toLocaleString()}
              </Typography>
            </Paper>
          );
        })}

      {/* Draft editor */}
      {activeRange && containerRect && (
        <Paper
          elevation={6}
          sx={{
            position: "absolute",
            top: activeRange.top,
            left: 560,
            width: 300,
            p: 2,
            zIndex: 50,
          }}
        >
          <Typography variant="subtitle2" gutterBottom>
            {editingCommentId ? "Edit comment" : "New comment"}
          </Typography>

          <TextField
            multiline
            minRows={3}
            fullWidth
            value={draftText}
            onChange={(e) => setDraftText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") clearDraft();
              if ((e.metaKey || e.ctrlKey) && e.key === "Enter") handleSave();
            }}
          />

          <Box mt={1} display="flex" justifyContent="space-between">
            <Button size="small" onClick={clearDraft}>
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