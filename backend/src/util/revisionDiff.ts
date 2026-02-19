import { diffArrays } from "diff";
import { split } from "sentence-splitter";

export type ParagraphBlock = {
  order: number;
  text: string;
};

export type SentenceDiffToken = {
  type: "unchanged" | "added" | "removed";
  text: string;
};

export type DiffBlock =
  | { type: "unchanged"; text: string }
  | { type: "added"; text: string }
  | { type: "deleted"; text: string }
  | {
      type: "modified";
      newText: string; // base/to paragraph
      oldText: string; // from paragraph
      sentences: SentenceDiffToken[];
    };

export type RevisionDiffResult = {
  fromVersion: number;
  toVersion: number; // base version that defines ordering
  summary: { added: number; deleted: number; modified: number };
  blocks: DiffBlock[];
};

export function normalizeText(input: string): string {
  return input
    .replace(/\s+/g, " ")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .trim();
}

function splitSentences(text: string): string[] {
  const nodes = split(text);
  const sentences = nodes
    .filter((n) => n.type === "Sentence")
    .map((n) => n.raw.trim())
    .filter(Boolean);

  return sentences.length ? sentences : [text.trim()];
}

function diffSentences(oldText: string, newText: string): SentenceDiffToken[] {
  const oldSentences = splitSentences(normalizeText(oldText));
  const newSentences = splitSentences(normalizeText(newText));

  const parts = diffArrays(oldSentences, newSentences) as Array<{
    added?: boolean;
    removed?: boolean;
    value: string[];
  }>;

  const tokens: SentenceDiffToken[] = [];
  for (const p of parts) {
    const type: SentenceDiffToken["type"] = p.added
      ? "added"
      : p.removed
      ? "removed"
      : "unchanged";

    for (const s of p.value) tokens.push({ type, text: s });
  }
  return tokens;
}

function emitPairedModifiedOrAddsDeletes(
  removedRun: string[],
  addedRun: string[],
  out: DiffBlock[]
): { modified: number; added: number; deleted: number } {
  let modified = 0;
  let added = 0;
  let deleted = 0;

  const pairCount = Math.min(removedRun.length, addedRun.length);

  for (let i = 0; i < pairCount; i++) {
    const oldText = removedRun[i];
    const newText = addedRun[i];

    out.push({
      type: "modified",
      oldText,
      newText,
      sentences: diffSentences(oldText, newText),
    });
    modified++;
  }

  for (let i = pairCount; i < removedRun.length; i++) {
    out.push({ type: "deleted", text: removedRun[i] });
    deleted++;
  }

  for (let i = pairCount; i < addedRun.length; i++) {
    out.push({ type: "added", text: addedRun[i] });
    added++;
  }

  return { modified, added, deleted };
}

export function computeRevisionDiff(params: {
  fromVersion: number;
  toVersion: number;
  fromParagraphs: ParagraphBlock[];
  toParagraphs: ParagraphBlock[];
}): RevisionDiffResult {
  const { fromVersion, toVersion, fromParagraphs, toParagraphs } = params;

  const oldTexts = fromParagraphs.map((p) => normalizeText(p.text));
  const newTexts = toParagraphs.map((p) => normalizeText(p.text));

  const parts = diffArrays(oldTexts, newTexts) as Array<{
    added?: boolean;
    removed?: boolean;
    value: string[];
  }>;

  const blocks: DiffBlock[] = [];
  const summary = { added: 0, deleted: 0, modified: 0 };

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];

    if (!part.added && !part.removed) {
      for (const t of part.value) blocks.push({ type: "unchanged", text: t });
      continue;
    }

    if (part.added && !part.removed) {
      for (const t of part.value) {
        blocks.push({ type: "added", text: t });
        summary.added++;
      }
      continue;
    }

    if (part.removed) {
      const removedRun = part.value;
      const next = parts[i + 1];

      if (next?.added && !next?.removed) {
        const delta = emitPairedModifiedOrAddsDeletes(
          removedRun,
          next.value,
          blocks
        );
        summary.modified += delta.modified;
        summary.added += delta.added;
        summary.deleted += delta.deleted;
        i++; // consume next
        continue;
      }

      for (const t of removedRun) {
        blocks.push({ type: "deleted", text: t });
        summary.deleted++;
      }
      continue;
    }
  }

  return { fromVersion, toVersion, summary, blocks };
}
