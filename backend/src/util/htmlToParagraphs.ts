import * as cheerio from "cheerio";
import { normalizeText, ParagraphBlock } from "./revisionDiff";

export function htmlToParagraphs(html: string): ParagraphBlock[] {
  const $ = cheerio.load(html);

  const paragraphs: ParagraphBlock[] = [];

  $("p").each((idx, el) => {
    const text = normalizeText($(el).text());
    // Keep empty paragraphs if you want stable alignment; for now, drop empties:
    if (!text) return;

    paragraphs.push({ order: idx, text });
  });

  // Fallback: if mammoth produced no <p>, treat full text as one paragraph
  if (paragraphs.length === 0) {
    const text = normalizeText($.text());
    if (text) paragraphs.push({ order: 0, text });
  }

  return paragraphs;
}
