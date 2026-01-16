// src/extensions/DraftHighlightExtension.ts
import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";

/* ---------- types ---------- */

export type DraftRange = { from: number; to: number } | null;

export const DraftHighlightKey = new PluginKey<DraftRange>("draftHighlight");

/* ---------- command typing ---------- */

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    draftHighlight: {
      setDraftRange: (range: { from: number; to: number }) => ReturnType;
      clearDraftRange: () => ReturnType;
    };
  }
}

/* ---------- extension ---------- */

export const DraftHighlightExtension = Extension.create({
  name: "draftHighlight",

  addCommands() {
    return {
      setDraftRange:
        (range: { from: number; to: number }) =>
        ({ tr, dispatch }) => {
          if (dispatch) {
            dispatch(tr.setMeta(DraftHighlightKey, range));
          }
          return true;
        },

      clearDraftRange:
        () =>
        ({ tr, dispatch }) => {
          if (dispatch) {
            dispatch(tr.setMeta(DraftHighlightKey, null));
          }
          return true;
        },
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin<DraftRange>({
        key: DraftHighlightKey,

        state: {
          init: () => null,
          apply(tr, prev) {
            const meta = tr.getMeta(DraftHighlightKey);
            return meta === undefined ? prev : meta;
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
