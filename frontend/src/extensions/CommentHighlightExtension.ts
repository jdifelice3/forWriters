import { Extension } from '@tiptap/core';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { Plugin, PluginKey } from 'prosemirror-state';
import { CommentRange } from "../types/ReviewTypes";

export const CommentHighlightKey = new PluginKey('commentHighlight');

export interface CommentHighlightOptions {
  comments: CommentRange[];
  onHoverComment?: (commentId: string | null) => void;
  onClickComment?: (commentId: string) => void;
}

export const CommentHighlightExtension = Extension.create<CommentHighlightOptions>({
  name: 'commentHighlight',

  addOptions() {
    return {
      comments: [],
      onHoverComment: undefined,
      onClickComment: undefined,
    };
  },

  addProseMirrorPlugins() {
    const { onHoverComment, onClickComment } = this.options;

    return [
      new Plugin({
        key: CommentHighlightKey,

        state: {
          init: (_, { doc }) => {
            return DecorationSet.create(doc, []);
          },

          apply: (tr, oldDecorations, oldState, newState) => {
            // If document changed, remap decorations
            if (tr.docChanged) {
              return oldDecorations.map(tr.mapping, tr.doc);
            }
            return oldDecorations;
          },
        },

        props: {
          decorations: state => {
            const { comments } = this.options;
            if (!comments || comments.length === 0) {
              return null;
            }

            const decorations = comments.map(comment =>
              Decoration.inline(comment.from, comment.to, {
                class: 'comment-highlight',
                'data-comment-id': comment.commentId,
              })
            );

            return DecorationSet.create(state.doc, decorations);
          },

          handleDOMEvents: {
            mouseover: (view, event) => {
              const target = event.target as HTMLElement;
              const el = target.closest('[data-comment-id]') as HTMLElement | null;
              if (el && onHoverComment) {
                onHoverComment(el.dataset.commentId ?? null);
              }
              return false;
            },

            mouseout: (_, event) => {
              if (onHoverComment) {
                onHoverComment(null);
              }
              return false;
            },

            click: (_, event) => {
              const target = event.target as HTMLElement;
              const el = target.closest('[data-comment-id]') as HTMLElement | null;
              if (el && onClickComment) {
                onClickComment(el.dataset.commentId!);
                return true;
              }
              return false;
            },
          },
        },
      }),
    ];
  },
});
