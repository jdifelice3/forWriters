type CommentBubbleProps = {
  top: number;
  left: number;
  onClick: () => void;
};

export function CommentBubble({ top, left, onClick }: CommentBubbleProps) {
  return (
    <div
      style={{
        position: 'absolute',
        top: top - 32,
        left,
        transform: 'translateX(-50%)',
        zIndex: 10,
      }}
    >
      <button
        onClick={onClick}
        style={{
          borderRadius: 16,
          padding: '4px 8px',
          fontSize: 12,
          background: '#fff',
          border: '1px solid #ccc',
          cursor: 'pointer',
        }}
      >
        + Comment
      </button>
    </div>
  );
}
