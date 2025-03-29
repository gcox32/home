import { useEffect, useRef, useState } from 'react';
import { Editor } from '@tiptap/react';
import './styles.css';

interface LinkInputProps {
  editor: Editor;
  onClose: () => void;
  position: { x: number; y: number };
}

export default function LinkInput({ editor, onClose, position }: LinkInputProps) {
  const [text, setText] = useState(() => editor.state.selection.empty ? '' : editor.state.doc.textBetween(
    editor.state.selection.from,
    editor.state.selection.to,
  ));
  const [url, setUrl] = useState('');
  const textInputRef = useRef<HTMLInputElement>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the text input if empty, otherwise focus the URL input
    if (!text) {
      textInputRef.current?.focus();
    } else {
      urlInputRef.current?.focus();
    }
  }, [text]);

  const handleAdd = () => {
    if (!url) return;

    if (!text) {
      // If there's no text, just add the URL as a link
      editor.chain().focus().setLink({ href: url }).run();
    } else if (editor.state.selection.empty) {
      // If there's text but no selection, insert it as a new link
      editor.chain().focus().insertContent(`<a href="${url}">${text}</a>`).run();
    } else {
      // If there's selected text, replace it with our new text and make it a link
      editor.chain()
        .focus()
        .deleteSelection()
        .insertContent(`<a href="${url}">${text}</a>`)
        .run();
    }

    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <>
      <div 
        className="fixed inset-0" 
        onClick={onClose}
      />
      <div 
        className="z-50 absolute bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg"
        style={{
          top: `${position.y}px`,
          left: `${Math.max(210, position.x + 20)}px`,
          transform: 'translate(-50%, -100%)',
        }}
      >
        <div className="flex flex-col gap-2 p-2">
          <input
            ref={textInputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Link text..."
            className="dark:bg-gray-700 px-2 py-1 border dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-accent min-w-[200px] dark:text-white text-sm"
          />
          <div className="flex gap-2">
            <input
              ref={urlInputRef}
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter URL..."
              className="dark:bg-gray-700 px-2 py-1 border dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-accent min-w-[200px] dark:text-white text-sm"
            />
            <button
              onClick={handleAdd}
              className="whitespace-nowrap submit-button"
            >
              Apply
            </button>
          </div>
        </div>
        <div 
          className="bottom-0 absolute bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 border-r border-b w-2 h-2 rotate-45 translate-y-1/2 transform"
          style={{
            left: `${Math.min(Math.max(10, position.x - Math.max(210, position.x + 20) + 150), 290)}px`
          }}
        />
      </div>
    </>
  );
} 