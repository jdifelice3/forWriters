export type UpgradeFeature =
  | "compare"
  | "revisionHistory"
  | "pdfExport";

export const upgradeContent: Record<UpgradeFeature, {
  title: string;
  description: string;
  bullets: string[];
}> = {
  compare: {
    title: "See exactly how your draft changed.",
    description:
      "Compare versions with sentence-level precision and track rewrites in context.",
    bullets: [
      "Sentence-level change detection",
      "Highlight additions and removals",
      "Clear revision breakdown"
    ]
  },
  revisionHistory: {
    title: "Track your manuscript’s evolution.",
    description:
      "Visualize growth across drafts with revision trend graphs.",
    bullets: [
      "Word count over time",
      "Revision intensity analysis",
      "Paragraph and sentence deltas"
    ]
  },
  pdfExport: {
    title: "Export professional feedback reports.",
    description:
      "Download formatted comment reports for editors, agents, or archives.",
    bullets: [
      "Clean PDF formatting",
      "Grouped by paragraph or reviewer",
      "Professional presentation"
    ]
  }
};
