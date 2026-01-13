import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import mammoth from "mammoth";
import { parse } from "node-html-parser";

export const loadDocxFromS3AsHtml = async(
  bucket: string,
  key: string,
  region: string
): Promise<string> => {
  const s3 = new S3Client({ region });

  const response = await s3.send(
    new GetObjectCommand({ Bucket: bucket, Key: key })
  );

  if (!response.Body) {
    throw new Error("Empty S3 response body");
  }

  const buffer = await streamToBuffer(
    response.Body as NodeJS.ReadableStream
  );

  const result = await mammoth.convertToHtml(
    { buffer },
    {
      styleMap: [
        "p[style-name='Title'] => h1",
        "p[style-name='Heading 1'] => h2",
        "p[style-name='Heading 2'] => h3",
        "i => em",
        "b => strong",
      ],
      includeDefaultStyleMap: true,
    }
  );

  return result.value; // clean HTML
}

const streamToBuffer = (stream: NodeJS.ReadableStream): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on("data", chunk => chunks.push(Buffer.from(chunk)));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
}

export function addParagraphIds(html: string): string {
  const root = parse(html);
  const paragraphs = root.querySelectorAll("p");

  paragraphs.forEach((p, index) => {
    p.setAttribute("data-paragraph-id", `p-${index + 1}`);
  });

  return root.toString();
}