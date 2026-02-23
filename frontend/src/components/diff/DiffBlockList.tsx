import { Box } from "@mui/material"
import { DiffBlock } from "../../types/Diff"
import { DiffParagraph } from "./DiffParagraph"

export const DiffBlockList = ({
  blocks,
  showUnchanged
}: {
  blocks: DiffBlock[]
  showUnchanged: boolean
}) => {
    console.log('in DiffBlockList')
    console.log('blocks', blocks)
    console.log('showUnchanged', showUnchanged)
  return (
    <Box>
      {blocks
        .filter(b => showUnchanged || b.status !== "unchanged")
        .map((block) => (
          <DiffParagraph key={block.id} block={block} />
        ))}
    </Box>
  )
}