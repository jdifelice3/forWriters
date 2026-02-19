export type ParagraphBlock = {
  order: number;
  text: string;
};

export type DocumentStats = {
  paragraphs: ParagraphBlock[];
  paragraphCount: number;
  wordCount: number;
  sentenceCount: number;
};