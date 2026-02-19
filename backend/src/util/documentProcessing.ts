import * as cheerio from "cheerio";
import { split } from "sentence-splitter";
import { DocumentStats, ParagraphBlock } from "../types/File";

function normalize(text: string): string {
  return text
    .replace(/\s+/g, " ")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .trim();
}

function splitSentences(text: string): string[] {
  const nodes = split(text);
  return nodes
    .filter((n) => n.type === "Sentence")
    .map((n) => n.raw.trim())
    .filter(Boolean);
}

export function processHtmlDocument(html: string): DocumentStats {
  const $ = cheerio.load(html);

  const paragraphs: ParagraphBlock[] = [];
  let totalWords = 0;
  let totalSentences = 0;

  $("p").each((idx, el) => {
    const text = normalize($(el).text());
    if (!text) return;

    const words = text.split(/\s+/).filter(Boolean);
    const sentences = splitSentences(text);

    totalWords += words.length;
    totalSentences += sentences.length;

    paragraphs.push({
      order: idx,
      text,
    });
  });

  return {
    paragraphs,
    paragraphCount: paragraphs.length,
    wordCount: totalWords,
    sentenceCount: totalSentences,
  };
}
