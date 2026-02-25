import { Box, Typography } from "@mui/material"
import { DiffBlock } from "../../types/Diff"

const statusStyles = {
  added: {
    borderLeft: "4px solid #2e7d32",
    backgroundColor: "rgba(46,125,50,0.08)"
  },
  deleted: {
    borderLeft: "4px solid #c62828",
    backgroundColor: "rgba(198,40,40,0.08)",
    opacity: 0.9
  },
  modified: {
    borderLeft: "4px solid #ed6c02",
    backgroundColor: "rgba(237,108,2,0.08)"
  },
  unchanged: {}
}

export const DiffParagraph = ({ block }: { block: DiffBlock }) => {
  return (
    <Box
      id={`paragraph-${block.paragraphNumber}`}  // 👈 here
      sx={{
        mb: 2,
        px: 2,
        py: 1.5,
        borderRadius: 1,
        ...statusStyles[block.status]
      }}
    >
      <Typography
        variant="subtitle2"
        fontWeight={600}
        sx={{ mb: 1 }}
      >
        Paragraph {block.paragraphNumber}
      </Typography>

      <Typography variant="body1">
        {block.sentences.map((s, i) => {
          const style =
            s.status === "added"
              ? { backgroundColor: "rgba(46,125,50,0.18)" }
              : s.status === "deleted"
              ? {
                  backgroundColor: "rgba(198,40,40,0.18)",
                  textDecoration: "line-through"
                }
              : {}

          return (
            <span key={i} style={style}>
              {s.text}{" "}
            </span>
          )
        })}
      </Typography>
    </Box>
  )
}