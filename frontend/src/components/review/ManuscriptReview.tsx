import React, { useMemo, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Box, Paper, TextField, Typography, Button, Chip } from "@mui/material";

import { ParagraphWithId } from "../../extensions/ParagraphWithId";
import { CommentHighlightExtension } from "../../extensions/CommentHighlightExtension";
import { Comment } from "../../types/FeedbackTypes";
import { CommentsAPI } from "../../api/comments";

type ActiveRange = {
  from: number;
  to: number;
  paragraphId: string;
  top: number; // container-relative
};

type Pin = {
  commentId: string;
  top: number;
  lane: number; // for stacking
};

type Props = {
  html: string;
  readingFeedbackId: string;
  reviewerParticipantId: string;
  initialComments: Comment[];
};

const PIN_HEIGHT = 56;
const PIN_GAP = 8;
const LANES_MAX = 3;
const LANE_WIDTH = 26;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

/**
 * Stacking algorithm:
 * - Sort pins by top
 * - Assign lane so pins that overlap vertically get different lanes
 * - If all lanes are occupied, push pin down (minimal displacement)
 */
function stackPins(pins: Array<{ commentId: string; top: number }>): Pin[] {
  const sorted = [...pins].sort((a, b) => a.top - b.top);
  const laneBottoms = new Array(LANES_MAX).fill(-Infinity);

  const result: Pin[] = [];

  for (const p of sorted) {
    // try to place in a lane without overlap
    let placedLane = -1;
    for (let lane = 0; lane < LANES_MAX; lane++) {
      if (p.top >= laneBottoms[lane] + PIN_GAP) {
        placedLane = lane;
        break;
      }
    }

    let top = p.top;

    if (placedLane === -1) {
      // all lanes overlap; pick lane with smallest bottom and push down
      let bestLane = 0;
      for (let lane = 1; lane < LANES_MAX; lane++) {
        if (laneBottoms[lane] < laneBottoms[bestLane]) bestLane = lane;
      }
      placedLane = bestLane;
      top = laneBottoms[bestLane] + PIN_GAP; // push down
    }

    laneBottoms[placedLane] = top + PIN_HEIGHT;

    result.push({ commentId: p.commentId, top, lane: placedLane });
  }

  return result;
}

export function ManuscriptReview({
  html,
  readingFeedbackId,
  reviewerParticipantId,
  initialComments,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [activeRange, setActiveRange] = useState<ActiveRange | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [focusedCommentId, setFocusedCommentId] = useState<string | null>(null);
  const [draftComment, setDraftComment] = useState("");

  const sortedComments = useMemo(() => {
    // order by first target position
    return [...comments].sort((a, b) => (a.targets[0]?.from ?? 0) - (b.targets[0]?.from ?? 0));
  }, [comments]);

  const commentRanges = useMemo(() => {
    // highlight every target
    return comments.flatMap((c) =>
      c.targets.map((t) => ({
        commentId: c.id,
        from: t.from,
        to: t.to,
      }))
    );
  }, [comments]);

  const editor = useEditor(
    {
      editable: false,
      autofocus: true,
      extensions: [
        StarterKit.configure({ paragraph: false }),
        ParagraphWithId,
        CommentHighlightExtension.configure({
          comments: commentRanges,
          onClickComment: (commentId: string) => {
            setFocusedCommentId(commentId);
            openEditForComment(commentId);
          },
        }),
      ],
      content: html,

      onSelectionUpdate({ editor }) {
        if (editingCommentId) return;

        const { from, to, empty } = editor.state.selection;
        if (empty) return;

        const container = containerRef.current;
        if (!container) return;

        const paragraphId = editor.state.doc.resolve(from).parent.attrs.paragraphId;
        if (!paragraphId) return;

        const coords = editor.view.coordsAtPos(from);
        const rect = container.getBoundingClientRect();

        setActiveRange({
          from,
          to,
          paragraphId,
          top: coords.top - rect.top,
        });
      },

      editorProps: {
        handleKeyDown: (_view, event) => {
          // keyboard navigation between comments
          if (event.altKey && event.key === "ArrowDown") {
            event.preventDefault();
            focusNextComment(+1);
            return true;
          }
          if (event.altKey && event.key === "ArrowUp") {
            event.preventDefault();
            focusNextComment(-1);
            return true;
          }
          if (event.key === "Escape") {
            if (editingCommentId || activeRange) {
              event.preventDefault();
              resetEditorUI();
              return true;
            }
          }
          if (event.key === "Enter" && focusedCommentId && !editingCommentId && !activeRange) {
            // Enter edits the focused comment
            event.preventDefault();
            openEditForComment(focusedCommentId);
            return true;
          }
          return false;
        },
      },
    },
    []
  );

  function resetEditorUI() {
    setActiveRange(null);
    setEditingCommentId(null);
    setDraftComment("");
  }

  function openEditForComment(commentId: string) {
    if (!editor || !containerRef.current) return;
    const comment = comments.find((c) => c.id === commentId);
    if (!comment) return;

    // anchor to first target
    const first = comment.targets[0];
    if (!first) return;

    const coords = editor.view.coordsAtPos(first.from);
    const rect = containerRef.current.getBoundingClientRect();

    setEditingCommentId(commentId);
    setDraftComment(comment.commentText);
    setActiveRange({
      from: first.from,
      to: first.to,
      paragraphId: first.paragraphId,
      top: coords.top - rect.top,
    });

    // also move selection for context
    editor.commands.setTextSelection({ from: first.from, to: first.to });
    editor.commands.scrollIntoView();
  }

  function focusNextComment(dir: 1 | -1) {
    if (!editor) return;
    if (sortedComments.length === 0) return;

    const idx = focusedCommentId
      ? sortedComments.findIndex((c) => c.id === focusedCommentId)
      : -1;

    const nextIdx = idx === -1
      ? (dir === 1 ? 0 : sortedComments.length - 1)
      : clamp(idx + dir, 0, sortedComments.length - 1);

    const next = sortedComments[nextIdx];
    setFocusedCommentId(next.id);

    // scroll to first target
    const first = next.targets[0];
    if (first) {
      editor.commands.setTextSelection({ from: first.from, to: first.to });
      editor.commands.scrollIntoView();
    }
  }

  async function handleSave() {
    if (!draftComment.trim() || !activeRange) return;

    if (editingCommentId) {
      // update comment text
      const updated = await CommentsAPI.updateText(readingFeedbackId, editingCommentId, draftComment);

      setComments((prev) =>
        prev.map((c) => (c.id === updated.id ? { ...c, ...updated } : c))
      );
    } else {
      // create comment w/ one target from selection
      const created = await CommentsAPI.create(readingFeedbackId, {
        reviewerParticipantId,
        commentText: draftComment,
        source: "NATIVE",
        targets: [
          {
            paragraphId: activeRange.paragraphId,
            from: activeRange.from,
            to: activeRange.to,
            targetText: "", // optional: populate by extracting from HTML later if you want
          },
        ],
      });

      setComments((prev) => [...prev, created]);
      setFocusedCommentId(created.id);
    }

    resetEditorUI();
  }

  const pinsRaw = useMemo(() => {
    if (!editor || !containerRef.current) return [];
    const rect = containerRef.current.getBoundingClientRect();

    // one pin per comment, positioned at first target
    return comments
      .map((c) => {
        const first = c.targets[0];
        if (!first) return null;
        const coords = editor.view.coordsAtPos(first.from);
        return {
          commentId: c.id,
          top: coords.top - rect.top,
        };
      })
      .filter(Boolean) as Array<{ commentId: string; top: number }>;
  }, [comments, editor]);

  const pins = useMemo(() => stackPins(pinsRaw), [pinsRaw]);

  if (!editor) return null;

  return (
    <Box
      ref={containerRef}
      sx={{
        position: "relative",
        width: "550px",
      }}
    >
      <Paper variant="outlined" sx={{ p: 2 }}>
        <EditorContent editor={editor} />
      </Paper>

      {/* Margin pins + cards */}
      {pins.map((p) => {
        const c = comments.find((x) => x.id === p.commentId);
        if (!c) return null;

        const isFocused = focusedCommentId === c.id;

        return (
          <Paper
            key={c.id}
            elevation={isFocused ? 6 : 2}
            sx={{
              position: "absolute",
              top: Math.max(8, p.top),
              left: -360 - p.lane * LANE_WIDTH, // lane stacks horizontally
              width: 330,
              p: 1.25,
              zIndex: isFocused ? 40 : 10,
              cursor: "pointer",
              opacity: c.isResolved ? 0.6 : 1,
            }}
            onClick={() => {
              setFocusedCommentId(c.id);
              openEditForComment(c.id);
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="caption" sx={{ fontWeight: 700 }}>
                {c.reviewerDisplayName}
              </Typography>
              {c.isResolved && <Chip size="small" label="Resolved" />}
            </Box>

            <Typography variant="body2" sx={{ mt: 0.5 }}>
              {c.commentText}
            </Typography>

            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.75 }}>
              {new Date(c.createdAt).toLocaleString()}{" "}
              {c.updatedAt !== c.createdAt ? `(edited ${new Date(c.updatedAt).toLocaleString()})` : ""}
            </Typography>
          </Paper>
        );
      })}

      {/* Create/Edit panel */}
      {activeRange && (
        <Paper
          elevation={4}
          sx={{
            position: "absolute",
            top: Math.max(8, activeRange.top),
            left: -720,
            width: 330,
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
            value={draftComment}
            onChange={(e) => setDraftComment(e.target.value)}
            placeholder="Write your comment…"
            onKeyDown={(e) => {
              if (e.key === "Escape") resetEditorUI();
              if ((e.metaKey || e.ctrlKey) && e.key === "Enter") handleSave();
            }}
          />

          <Box mt={1} display="flex" justifyContent="space-between">
            <Button size="small" onClick={resetEditorUI}>
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