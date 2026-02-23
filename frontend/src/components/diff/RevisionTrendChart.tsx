import { Box } from "@mui/material"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { DiffResponse } from "../../types/Diff"

export const RevisionTrendChart = ({ diff }: { diff: DiffResponse }) => {
  const data = [
    { name: "Added", value: diff.addedCount },
    { name: "Deleted", value: diff.deletedCount },
    { name: "Modified", value: diff.modifiedCount }
  ]

  return (
    <Box sx={{ height: 250, mb: 4 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  )
}