interface GradientDivider {
  text: string;
}

const GradientDivider: React.FC<GradientDivider> = ({ text }) => {
  return (
    <div className="divider-container">
        <div className="divider-line left" />
            <span className="divider-text">{text}</span>
        <div className="divider-line right" />
    </div>
  );
}

export default GradientDivider;