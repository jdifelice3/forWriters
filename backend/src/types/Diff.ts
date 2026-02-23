export type Block = {
  id: string;
  order: number;
  type: "paragraph" | "heading" | "quote";
  text: string;
};

export type SentenceStatus = "unchanged" | "added" | "deleted" | "modified";

export type DiffBlock =
  | { type: "unchanged"; text: string }
  | { type: "added"; text: string }
  | { type: "deleted"; text: string }
  | { type: "modified"; oldText: string; newText: string }

export type ManuscriptDiff = {
  fromVersionId: string
  toVersionId: string
  summary: {
    added: number
    deleted: number
    modified: number
  }
  blocks: DiffBlock[]
}

export type DiffParagraph = {
  id: string;
  order: number;
  status: "unchanged" | "added" | "deleted" | "modified";
  sentences: {
    text: string;
    status: string;//"unchanged" | "added" | "deleted";
  }[];
};

