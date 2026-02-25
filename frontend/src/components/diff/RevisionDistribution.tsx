import { Box, Typography } from "@mui/material"
import { DiffBlock } from "../../types/Diff"

type Props = {
  blocks: DiffBlock[]
}

const SEGMENTS = 300

export const RevisionDistribution = ({ blocks }: Props) => {
  if (!blocks.length) return null

  const segmentSize = Math.ceil(blocks.length / SEGMENTS)

  const segments = []

  for (let i = 0; i < blocks.length; i += segmentSize) {
    const slice = blocks.slice(i, i + segmentSize)

    const intensity = slice.reduce((acc, block) => {
      return (
        acc +
        block.sentences.filter(s => s.status !== "unchanged").length
      )
    }, 0)

    segments.push(intensity)
  }

  const max = Math.max(...segments, 1)

  return (
    <Box sx={{ mb: 4 }}>

      <Box
        sx={{
          display: "flex",
          height: 16,
          borderRadius: 1,
          overflow: "hidden",
          cursor: "pointer"
        }}
      >
        {segments.map((value, index) => {
          const ratio = value / max

          const bg =
            value === 0
              ? "#eeeeee"
              : `rgba(237,108,2,${0.2 + ratio * 0.8})`

          return (
            <Box
              key={index}
              sx={{
                flex: 1,
                backgroundColor: bg,
                transition: "background-color 120ms ease"
              }}
              onClick={() => {
                const container = document.getElementById("diff-container")
                
                if (!container) return

                const scrollRatio = index / segments.length
                const scrollTarget =
                  container.scrollHeight * scrollRatio

                container.scrollTo({
                  top: scrollTarget,
                  behavior: "smooth"
                })
                console.log('container', container)
              }}
            />
          )
        })}
      </Box>
    </Box>
  )
}