import unzipper from "unzipper";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import sax from "sax";
import { ExtractedComment } from "../types/Feedback";

export const extractCommentsWithTargetsFromS3 = async (
  bucket: string,
  key: string,
  region: string
): Promise<ExtractedComment[]> => {
  const s3 = new S3Client({ region });

  const response = await s3.send(
    new GetObjectCommand({ Bucket: bucket, Key: key })
  );

  if (!response.Body) {
    throw new Error("Empty S3 response body");
  }

  const zipStream = (response.Body as NodeJS.ReadableStream)    
    .pipe(unzipper.Parse({ forceStream: true }));

  const commentMap = new Map<string, string>();
  const targetMap = new Map<string, string[]>();
  const referenceOnlyComments = new Set<string>();

  for await (const entry of zipStream) {
    console.log("ZIP ENTRY:", entry.path);
    switch (entry.path) {
      case "word/comments.xml":
      case "word/commentsExtended.xml":
        await parseCommentsXml(entry, commentMap);
        break;

      case "word/document.xml":
        await parseDocumentXml(entry, targetMap, referenceOnlyComments);
        break;

      default:
        entry.autodrain();
    }
  }

  return [...commentMap.entries()].map(([commentId, commentText]) => ({
    commentId,
    commentText,
    targets: targetMap.get(commentId) ?? [],
  }));
};


export const parseCommentsXml = (
  stream: NodeJS.ReadableStream,
  commentMap: Map<string, string>
): Promise<void> =>
  new Promise((resolve, reject) => {
    const parser = sax.createStream(true);

    let currentId: string | null = null;
    let buffer = "";
    let inText = false;

    parser.on("opentag", node => {
      if (node.name.endsWith(":comment")) {
        currentId = String(node.attributes["w:id"] ?? node.attributes["id"]);
        buffer = "";
      }

      if (currentId && node.name.endsWith(":t")) {
        inText = true;
      }
    });

    parser.on("text", text => {
      if (currentId && inText) buffer += text;
    });

    parser.on("closetag", name => {
      if (name.endsWith(":t")) inText = false;

      if (name.endsWith(":comment") && currentId) {
        commentMap.set(currentId, buffer.trim());
        currentId = null;
      }
    });

    parser.on("end", resolve);
    parser.on("error", reject);

    stream.pipe(parser);
  });

export const parseDocumentXml = (
  stream: NodeJS.ReadableStream,
  targetMap: Map<string, string[]>,
  referenceOnlyComments: Set<string>
): Promise<void> =>
  new Promise((resolve, reject) => {
    const parser = sax.createStream(true);

    const activeRangeComments = new Set<string>();
    const rangeStack: string[] = [];
    let inText = false;

    parser.on("opentag", node => {
      // 1️⃣ Range-based comment start
      if (node.name.endsWith(":commentRangeStart")) {
        const id = String(node.attributes["w:id"] ?? node.attributes["id"]);
        activeRangeComments.add(id);
        rangeStack.push(id);
      }

      // 2️⃣ Reference-based comment
      if (node.name.endsWith(":commentReference")) {
        const id = String(node.attributes["w:id"] ?? node.attributes["id"]);
        referenceOnlyComments.add(id);

        // Ensure map entry exists even if no text
        if (!targetMap.has(id)) {
          targetMap.set(id, []);
        }
      }

      // 3️⃣ Enter text nodes
      if (
        activeRangeComments.size > 0 &&
        (node.name.endsWith(":t") || node.name.endsWith(":delText"))
      ) {
        inText = true;
      }
    });

    parser.on("text", text => {
      if (!inText || activeRangeComments.size === 0) return;

      for (const id of activeRangeComments) {
        const arr = targetMap.get(id) ?? [];
        arr.push(text);
        targetMap.set(id, arr);
      }
    });

    parser.on("closetag", name => {
      if (name.endsWith(":t") || name.endsWith(":delText")) {
        inText = false;
      }

      if (name.endsWith(":commentRangeEnd")) {
        const id = rangeStack.pop();
        if (id) activeRangeComments.delete(id);
      }
    });

    parser.on("end", resolve);
    parser.on("error", reject);

    stream.pipe(parser);
  });

