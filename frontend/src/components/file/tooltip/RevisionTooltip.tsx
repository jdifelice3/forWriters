import { TooltipProps } from "recharts";
import { FileDiffMetricWithDelta } from "../../../hooks/file/useFileDiffMetrics";

type CustomTooltipProps = TooltipProps<number, string> & {
  payload?: Array<{
    payload: FileDiffMetricWithDelta;
  }>;
  label: string;
};

export default function RevisionTooltip({
  active,
  payload,
  label,
}: CustomTooltipProps) {

    if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;

  const formatDelta = (delta: number | null) => {
    if (delta == null) return "";
    if (delta === 0) return " (no change)";
    return delta > 0 ? ` (+${delta})` : ` (${delta})`;
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "12px",
        border: "1px solid #ddd",
        borderRadius: 4,
        fontSize: 13,
      }}
    >
      <strong>Version {label}</strong>
      <div>
        Word Count: {data.wordCount}
        {formatDelta(data.wordDelta)}
      </div>
      <div>
        Paragraphs: {data.paragraphCount}
        {formatDelta(data.paragraphDelta)}
      </div>
      <div>
        Sentences: {data.sentenceCount}
        {formatDelta(data.sentenceDelta)}
      </div>
    </div>
  );
}