import { useTextSelection } from "../../hooks/review/useTextSelection";
import { Editor } from "@tiptap/react";
import { CommentBubble } from "../../components/review/CommentBubble";

export const CommentCreationOverlay = ({
  editor,
  onCreateComment,
}: {
  editor: Editor | null;
  onCreateComment: (from: number, to: number) => void;
}) => {
  const selection = useTextSelection(editor);

  if (!editor || !selection) return null;

  const { top, left } = getSelectionCoords(
    editor,
    selection.from,
    selection.to
  );

  return (
    <CommentBubble
      top={top}
      left={left}
      onClick={() =>
        onCreateComment(selection.from, selection.to)
      }
    />
  );
}

const getSelectionCoords = (editor: Editor, from: number, to: number) => {
  const start = editor.view.coordsAtPos(from);
  const end = editor.view.coordsAtPos(to);

  return {
    top: Math.min(start.top, end.top),
    left: (start.left + end.right) / 2,
  };
}
