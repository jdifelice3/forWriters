import React, { useEffect, useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface TipTapTextEditorProps {
  initialContent: string;
  editable?: boolean;
  onContentChange?: (content: string) => void;
}

const TipTapTextEditor: React.FC<TipTapTextEditorProps> = ({ initialContent, editable = true }) => {
  const [content, setContent] = useState<string>(initialContent);

  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editable,
    onUpdate: ({ editor }) => {
      const newContent = editor.getHTML();
      setContent(newContent);
    },
  });

  return <EditorContent editor={editor} />;
};

export default TipTapTextEditor;
