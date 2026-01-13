import { Editor } from '@tiptap/react';
import { useEffect, useState } from 'react';

export function useTextSelection(editor: Editor | null) {
  const [selection, setSelection] = useState<{
    from: number;
    to: number;
  } | null>(null);

  useEffect(() => {
    if (!editor) return;

    const update = () => {
      const { from, to, empty } = editor.state.selection;
      if (empty) {
        setSelection(null);
      } else {
        setSelection({ from, to });
      }
    };

    editor.on('selectionUpdate', update);
    editor.on('blur', () => setSelection(null));

    return () => {
      editor.off('selectionUpdate', update);
    };
  }, [editor]);

  return selection;
}