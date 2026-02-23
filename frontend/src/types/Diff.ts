export type DiffSentence = {
  text: string
  status: "added" | "deleted" | "unchanged"
}

export type DiffBlock = {
  id: string
  paragraphNumber: number
  status: "added" | "deleted" | "modified" | "unchanged"
  sentences: DiffSentence[]
}

export type DiffResponse = {
  fromVersion: number
  toVersion: number
  wordDelta: number
  sentenceDelta: number
  paragraphDelta: number
  addedCount: number
  deletedCount: number
  modifiedCount: number
  blocks: DiffBlock[]
}