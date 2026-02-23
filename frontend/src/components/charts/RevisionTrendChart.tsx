import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import RevisionTooltip from "../charts/RevisionTrendChart"

interface Props {
  data: {
    version: number;
    wordCount: number | null;
    paragraphCount: number | null;
    sentenceCount: number | null;
  }[];
}

export default function RevisionTrendChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="version" />
        <YAxis />
        <Tooltip content={<RevisionTooltip data={data}/>} />        
        <Legend />
        <Line
          type="monotone"
          dataKey="wordCount"
          name="Word Count"
          stroke="#1976d2"
        />
        <Line
          type="monotone"
          dataKey="paragraphCount"
          name="Paragraph Count"
          stroke="#2e7d32"
        />
        <Line
          type="monotone"
          dataKey="sentenceCount"
          name="Sentence Count"
          stroke="#ed6c02"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}