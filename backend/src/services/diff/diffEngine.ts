import DiffMatchPatch from "diff-match-patch";
import { Block, DiffBlock, DiffParagraph } from "../../types/Diff";

const dmp = new DiffMatchPatch();

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(text: string): Set<string> {
  return new Set(normalize(text).split(" ").filter(Boolean));
}

function jaccard(a: Set<string>, b: Set<string>): number {
  const intersection = new Set([...a].filter(x => b.has(x)));
  const union = new Set([...a, ...b]);
  return union.size === 0 ? 0 : intersection.size / union.size;
}

function sentenceSplit(text: string): string[] {
  return text.split(/(?<=[.!?])\s+/).filter(Boolean);
}

function diffSentences(a: string, b: string) {
  const diffs = dmp.diff_main(a, b);
  dmp.diff_cleanupSemantic(diffs);

  return diffs.map(([op, text]) => ({
    text,
    status:
      op === 0 ? "unchanged" :
      op === 1 ? "added" :
      "deleted"
  }));
}

export function createDiff(fromBlocks: Block[], toBlocks: Block[]) {
  const matchedFrom = new Set<number>();
  const diffJson: DiffParagraph[] = [];
    console.log('fromBlocks', fromBlocks)
    console.log('toBlocks', toBlocks)
  const fromTokenized = fromBlocks.map(b => tokenize(b.text));

  for (let i = 0; i < toBlocks.length; i++) {
    const toBlock = toBlocks[i];
    const toTokens = tokenize(toBlock.text);

    let bestIndex = -1;
    let bestScore = 0;

    for (let j = 0; j < fromBlocks.length; j++) {
      if (matchedFrom.has(j)) continue;

      const score = jaccard(toTokens, fromTokenized[j]);

      if (score > bestScore) {
        bestScore = score;
        bestIndex = j;
      }
    }

    if (bestScore >= 0.6 && bestIndex !== -1) {
      matchedFrom.add(bestIndex);

      const status =
        bestScore >= 0.9 ? "unchanged" : "modified";

      const sentenceDiff =
        status === "unchanged"
          ? sentenceSplit(toBlock.text).map(s => ({
              text: s,
              status: "unchanged"
            }))
          : diffSentences(
              fromBlocks[bestIndex].text,
              toBlock.text
            );

      diffJson.push({
        id: toBlock.id,
        order: i,
        status,
        sentences: sentenceDiff
      });

    } else {
      // Added paragraph
      diffJson.push({
        id: toBlock.id,
        order: i,
        status: "added",
        sentences: sentenceSplit(toBlock.text).map(s => ({
          text: s,
          status: "added"
        }))
      });
    }
  }

  // Deleted paragraphs
  fromBlocks.forEach((block, index) => {
    if (!matchedFrom.has(index)) {
      diffJson.push({
        id: block.id,
        order: diffJson.length,
        status: "deleted",
        sentences: sentenceSplit(block.text).map(s => ({
          text: s,
          status: "deleted"
        }))
      });
    }
  });

  return diffJson;
}