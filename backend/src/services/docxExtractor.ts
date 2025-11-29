import unzipper from "unzipper";
import { XMLParser } from "fast-xml-parser";

export interface DocxCommentTarget {
  commentId: string;
  commentText: string;
  targetText: string;
}

function decodeXmlEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

export async function extractCommentsWithTargets(
  docxPath: string
): Promise<DocxCommentTarget[]> {
  const directory = await unzipper.Open.file(docxPath);

  // -------------------------
  // 1. Read comments.xml → commentId → commentText
  // -------------------------
  const commentsFile = directory.files.find(f => f.path === "word/comments.xml");
  if (!commentsFile) return [];

  const parser = new XMLParser({ ignoreAttributes: false });
  const commentsXML = parser.parse(await commentsFile.buffer());
  const comments = commentsXML?.["w:comments"]?.["w:comment"] ?? [];

  const commentMap: Record<string, string> = {};

  for (const c of Array.isArray(comments) ? comments : [comments]) {
    if (!c) continue;
    const id = String(c["@_w:id"]);
    let text = "";

    const paras = c["w:p"]
      ? Array.isArray(c["w:p"])
        ? c["w:p"]
        : [c["w:p"]]
      : [];

    for (const p of paras) {
      if (!p) continue;
      const runs = p["w:r"]
        ? Array.isArray(p["w:r"])
          ? p["w:r"]
          : [p["w:r"]]
        : [];

      for (const r of runs) {
        if (r["w:t"]) {
          text += r["w:t"] + " ";
        }
      }
    }

    commentMap[id] = text.trim();
  }

  // -------------------------
  // 2. Read document.xml as a raw XML string
  // -------------------------
  const docFile = directory.files.find(f => f.path === "word/document.xml");
  if (!docFile) return [];

  const docXml = (await docFile.buffer()).toString("utf8");

  const results: DocxCommentTarget[] = [];

  // -------------------------
  // 3. For each commentId, slice XML between start/end tags
  // -------------------------
  for (const id of Object.keys(commentMap)) {
    // Find the comment range start tag
    const startRe = new RegExp(
      `<w:commentRangeStart\\b[^>]*w:id="${id}"[^>]*/?>`
    );
    const startMatch = startRe.exec(docXml);
    if (!startMatch) {
      // No range in the main document for this comment; skip
      continue;
    }

    const startPos = startMatch.index + startMatch[0].length;

    // Find the matching end tag *after* the start
    const endRe = new RegExp(
      `<w:commentRangeEnd\\b[^>]*w:id="${id}"[^>]*/?>`
    );
    const searchFrom = startPos;
    const endMatch = endRe.exec(docXml.slice(searchFrom));
    if (!endMatch) {
      // No end tag found; skip this one
      continue;
    }

    const endPos = searchFrom + endMatch.index;

    // Raw XML inside the comment range
    const rangeXml = docXml.slice(startPos, endPos);

    // Extract all text nodes inside <w:t>...</w:t>
    const textRe = /<w:t[^>]*>([\s\S]*?)<\/w:t>/g;
    let m: RegExpExecArray | null;
    const pieces: string[] = [];

    while ((m = textRe.exec(rangeXml)) !== null) {
      pieces.push(m[1]);
    }

    const targetRaw = pieces.join(" ");
    const targetText = decodeXmlEntities(targetRaw).trim();

    results.push({
      commentId: id,
      commentText: commentMap[id] ?? "",
      targetText
    });
  }

  return results;
}
