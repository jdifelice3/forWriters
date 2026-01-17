import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";

export type CommentRange = {
  commentId: string;
  from: number;
  to: number;
};

export const CommentHighlightKey = new PluginKey<CommentRange[]>("comment-highlight");

export const CommentHighlightExtension = Extension.create<{
  onClickComment?: (id: string) => void;
}>({
  name: "commentHighlight",

  addOptions() {
    return {
      onClickComment: undefined,
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: CommentHighlightKey,

        state: {
          init: () => [],
          apply(tr, prev) {
            const meta = tr.getMeta(CommentHighlightKey);
            return meta ?? prev;
          },
        },

        props: {
          decorations(state) {
            const ranges = CommentHighlightKey.getState(state) ?? [];
            if (!ranges.length) return null;

            return DecorationSet.create(
              state.doc,
              ranges.map((r) =>
                Decoration.inline(r.from, r.to, {
                  class: "comment-highlight",
                  "data-comment-id": r.commentId,
                })
              )
            );
          },

          handleClick: (_view, _pos, event) => {
            const el = event.target as HTMLElement;
            const id = el.getAttribute("data-comment-id");
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
