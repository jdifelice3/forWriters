export type ThemeCategory =
  | "character"
  | "craft"
  | "thematic";

export interface CategorizedTheme {
  phrase: string;
  count: number;
  category: ThemeCategory;
}

const STOPWORDS = new Set([
  "the","a","an","and","or","but","if","then","so","to","of","in","on","for","with","as","at","by",
  "is","are","was","were","be","been","being",
  "it","this","that","these","those",
  "i","you","he","she","they","we","me","him","her","them","us","my","your","his","their","our",
  "not","no","yes",
  "very","really","just","also","too",
  "can","could","should","would","may","might","must",
  "there","here",
  "well","done","nice","great","good","interesting",
  "confusing","unclear","little","bit","maybe","try",
  "paragraph","line","sentence","chapter","scene",
  "again","still","lot","like"
]);

// 🔹 Static Category Mapping
const CATEGORY_KEYWORDS: Record<ThemeCategory, string[]> = {
  character: [
    "character arc",
    "emotional state",
    "mental health",
    "relationship dynamic",
    "parent conflict",
    "father figure",
    "mother figure"
  ],

  craft: [
    "pov shift",
    "point of view",
    "scene transition",
    "scene change",
    "showing telling",
    "structural clarity",
    "sequence issue",
    "pacing issue",
    "head hopping",
    "head-hopping"
  ],

  thematic: [
    "recurring motif",
    "symbolic thread",
    "perfection theme",
    "untethered idea",
    "core theme"
  ]
};

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9'\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(text: string): string[] {
  return normalize(text).split(" ").filter(Boolean);
}

function isUsefulToken(t: string): boolean {
  if (t.length < 3) return false;
  if (STOPWORDS.has(t)) return false;
  if (/^\d+$/.test(t)) return false;
  return true;
}

function categorizePhrase(phrase: string): ThemeCategory {
  const normalized = phrase.toLowerCase();

  for (const category of Object.keys(CATEGORY_KEYWORDS) as ThemeCategory[]) {
    for (const keyword of CATEGORY_KEYWORDS[category]) {

      // Exact phrase match
      if (normalized === keyword) {
        return category;
      }

      // Whole word phrase match
      const phraseWords = normalized.split(" ");
      const keywordWords = keyword.split(" ");

      if (
        keywordWords.every(word => phraseWords.includes(word))
      ) {
        return category;
      }
    }
  }

  return "thematic"; // safe fallback
}

export function extractCategorizedThemes(
  commentTexts: string[],
  maxThemes = 5
): CategorizedTheme[] {

  const counts = new Map<string, number>();

  for (const raw of commentTexts) {
    const normalized = normalize(raw);

    for (const category of Object.keys(CATEGORY_KEYWORDS) as ThemeCategory[]) {
      for (const keyword of CATEGORY_KEYWORDS[category]) {

        if (normalized.includes(keyword)) {
          counts.set(keyword, (counts.get(keyword) ?? 0) + 1);
        }
      }
    }
  }

  const results: CategorizedTheme[] = [];

  for (const [phrase, count] of counts.entries()) {

    const category = categorizePhrase(phrase);

    results.push({
      phrase,
      count,
      category
    });
  }

  return results
    .sort((a, b) => b.count - a.count)
    .slice(0, maxThemes);
}