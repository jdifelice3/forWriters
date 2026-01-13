import { useState, useRef, useLayoutEffect } from "react";
import { Editor } from "@tiptap/react";
import MarginCommentCard from "./MarginCommentCard";
import { Comment } from "../../types/ReviewTypes";

export const MarginComments = ({
  editor,
  comments,
  hoveredCommentId,
  focusedCommentId,
  onHoverComment,
  onClickComment,
}: {
  editor: Editor;
  comments: Comment[];
  hoveredCommentId: string | null;
  focusedCommentId: string | null;
  onHoverComment: (id: string | null) => void;
  onClickComment: (id: string) => void;
}) => {

  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<
    Record<string, number>
  >({});

  useLayoutEffect(() => {
    if (!editor || !containerRef.current) return;

    const containerTop =
      containerRef.current.getBoundingClientRect().top;

    const newPositions: Record<string, number> = {};
    for (const c of comments) {
      newPositions[c.id] = getCommentTop(
        editor,
        c.from,
        containerTop
      );
    }

    setPositions(newPositions);
  }, [editor, comments]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: 320,
        paddingLeft: 16,
      }}
    >
      {comments.map(c => (
        <MarginCommentCard
          key={c.id}
          comment={c}
          top={positions[c.id]}
          active={hoveredCommentId === c.id}
          onHover={onHoverComment}
          onClick={onClickComment}
        />
      ))}
    </div>
  );
}

const getCommentTop = (
  editor: Editor,
  from: number,
  containerTop: number
) => {
  const coords = editor.view.coordsAtPos(from);
  return coords.top - containerTop;
}
