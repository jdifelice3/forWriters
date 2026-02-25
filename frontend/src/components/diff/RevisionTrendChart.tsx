import { Box } from "@mui/material"
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { DiffResponse } from "../../types/Diff"

export const RevisionTrendChart = ({ diff }: { diff: DiffResponse }) => {
  const data = [
    { name: "Added", value: diff.addedCount },
    { name: "Deleted", value: diff.deletedCount },
    { name: "Modified", value: diff.modifiedCount }
  ]

const COLORS = {
  Added: "#2e7d32",      // green
  Deleted: "#c62828",    // red
  Modified: "#ed6c02"    // orange
}

const max = Math.max(
  diff.addedCount,
  diff.deletedCount,
  diff.modifiedCount
);

return (
    <Box sx={{ height: 250, width: 750, mb: 4 }}>
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
                <Bar dataKey="value" barSize={100}>
                    {data.map((entry, index) => (
                        <Cell
                        key={`cell-${index}`}
                        fill={COLORS[entry.name as keyof typeof COLORS]}
                        />
                    ))}
                </Bar>
            <XAxis dataKey="name" />
            <YAxis domain={[0, max]} />
            <Tooltip />
        </BarChart>
        </ResponsiveContainer>
    </Box>
  )
}