import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";

export const DraftHighlightKey = new PluginKey("draft-highlight");

export const DraftHighlightExtension = Extension.create({
  name: "draftHighlight",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: DraftHighlightKey,
        state: {
          init: () => null,
          apply(tr, value) {
            const meta = tr.getMeta(DraftHighlightKey);
            if (meta === null) return null;
            return meta;
          },
        },
        props: {
          decorations(state) {
            const range = DraftHighlightKey.getState(state);
            if (!range) return null;

            return DecorationSet.create(state.doc, [
              Decoration.inline(range.from, range.to, {
                class: "draft-highlight",
              }),
            ]);
          },
        },
      }),
    ];
  },
});
