import unzipper from "unzipper";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import sax from "sax";

type ExtractedComment = {
  commentId: string;
  commentText: string;
  targetText: string;
};

export const extractCommentsWithTargetsFromS3 = async(
  bucket: string,
  key: string,
  region: string
): Promise<ExtractedComment[]> => {
  const s3 = new S3Client({ region: region });

  const response = await s3.send(
    new GetObjectCommand({ Bucket: bucket, Key: key })
  );

  if (!response.Body) {
    throw new Error("Empty S3 response body");
  }

  const zipStream = (response.Body as NodeJS.ReadableStream)
    .pipe(unzipper.Parse({ forceStream: true }));

  const commentMap = new Map<string, string>();
  const targets: { id: string; targetText: string }[] = [];

  for await (const entry of zipStream) {
    if (entry.path === "word/comments.xml") {
      await parseCommentsXml(entry, commentMap);
    } else if (entry.path === "word/document.xml") {
      await parseDocumentXml(entry, targets);
    } else {
      entry.autodrain();
    }
  }

  return targets.map(t => ({
    commentId: t.id,
    commentText: commentMap.get(t.id) ?? "",
    targetText: t.targetText,
  }));
}

export const parseCommentsXml = (
  stream: NodeJS.ReadableStream,
  commentMap: Map<string, string>
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const parser = sax.createStream(true);

    let currentId: string | null = null;
    let buffer = "";

    parser.on("opentag", node => {
      if (node.name === "w:comment") {
        currentId = node.attributes["w:id"] as string;
        buffer = "";
      }
    });

    parser.on("text", text => {
      if (currentId) buffer += text;
    });

    parser.on("closetag", name => {
      if (name === "w:comment" && currentId) {
        commentMap.set(currentId, buffer.trim());
        currentId = null;
      }
    });

    parser.on("end", resolve);
    parser.on("error", reject);

    stream.pipe(parser);
  });
}

export const parseDocumentXml = (
  stream: NodeJS.ReadableStream,
  targets: { id: string; targetText: string }[]
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const parser = sax.createStream(true);

    let activeCommentId: string | null = null;
    let buffer = "";

    parser.on("opentag", node => {
      if (node.name === "w:commentRangeStart") {
        activeCommentId = node.attributes["w:id"] as string;
        buffer = "";
      }
    });

    parser.on("text", text => {
      if (activeCommentId) buffer += text;
    });

    parser.on("closetag", name => {
      if (name === "w:commentRangeEnd" && activeCommentId) {
        targets.push({
          id: activeCommentId,
          targetText: buffer.trim(),
        });
        activeCommentId = null;
      }
    });

    parser.on("end", resolve);
    parser.on("error", reject);

    stream.pipe(parser);
  });
}
