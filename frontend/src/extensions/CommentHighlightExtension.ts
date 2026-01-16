// src/extensions/CommentHighlightExtension.ts
import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";

/* ---------- types ---------- */

export type CommentRange = {
  commentId: string;
  from: number;
  to: number;
};

export type CommentHighlightOptions = {
  ranges: CommentRange[];
  onClickComment?: (commentId: string) => void;
};

const CommentHighlightKey = new PluginKey<CommentRange[]>("commentHighlight");

/* ---------- extension ---------- */

export const CommentHighlightExtension = Extension.create<CommentHighlightOptions>({
  name: "commentHighlight",

  addOptions() {
    return {
      ranges: [],
      onClickComment: undefined,
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin<CommentRange[]>({
        key: CommentHighlightKey,

        state: {
          init: () => this.options.ranges,
          apply: (_tr, prev) => prev,
        },

        props: {
          decorations: (state) => {
            if (!this.options.ranges.length) return null;

            return DecorationSet.create(
              state.doc,
              this.options.ranges.map((r) =>
                Decoration.inline(r.from, r.to, {
                  class: "comment-highlight",
                  "data-comment-id": r.commentId,
                })
              )
            );
          },

          handleClick: (_view, _pos, event) => {
            const target = event.target as HTMLElement | null;
            const id = target?.getAttribute("data-comment-id");
            if (id && this.options.onClickComment) {
              this.options.onClickComment(id);
              return true;
            }
            return false;
          },
        },
      }),
    ];
  },
});
