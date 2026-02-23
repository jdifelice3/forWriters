import { Box, Typography } from "@mui/material"
import { DiffResponse } from "../../types/Diff"

export const DiffSummary = ({ diff }: { diff: DiffResponse }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="subtitle1" fontWeight={600}>
        Revision Summary
      </Typography>

      <Typography variant="body2">
        +{diff.addedCount} added · −{diff.deletedCount} deleted · {diff.modifiedCount} modified
      </Typography>

      <Typography variant="body2" sx={{ mt: 0.5 }}>
        {diff.wordDelta > 0 ? "+" : ""}{diff.wordDelta} words ·
        {diff.paragraphDelta > 0 ? "+" : ""}{diff.paragraphDelta} paragraphs ·
        {diff.sentenceDelta > 0 ? "+" : ""}{diff.sentenceDelta} sentences
      </Typography>
    </Box>
  )
}