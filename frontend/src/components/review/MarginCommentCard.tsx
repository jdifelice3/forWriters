import { Comment } from "../../types/ReviewTypes";

export const MarginCommentCard = ({
  comment,
  top,
  active,
  onHover,
  onClick,
}: {
  comment: Comment;
  top?: number;
  active: boolean;
  onHover: (id: string | null) => void;
  onClick: (id: string) => void;
}) => {

  return (
    <div
      style={{
        position: 'absolute',
        top,
        left: 0,
        width: 280,
        padding: '8px 10px',
        borderRadius: 6,
        background: active ? '#eef4ff' : '#fafafa',
        border: '1px solid #ddd',
        fontSize: 14,
        lineHeight: 1.4,
        boxShadow: active
          ? '0 2px 6px rgba(0,0,0,0.1)'
          : 'none',
        cursor: 'pointer',
      }}
      onMouseEnter={() => onHover(comment.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(comment.id)}
    >
      {comment.text}
    </div>
  );
}
export default MarginCommentCard;
