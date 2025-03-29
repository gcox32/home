import { useEffect, useRef, useState } from 'react';
import { Editor } from '@tiptap/react';
import styles from './styles.module.css';

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
    if (!text) {
      textInputRef.current?.focus();
    } else {
      urlInputRef.current?.focus();
    }
  }, []);

  const handleAdd = () => {
    if (!url) return;

    if (!text) {
      editor.chain().focus().setLink({ href: url }).run();
    } else if (editor.state.selection.empty) {
      editor.chain().focus().insertContent(`<a href="${url}">${text}</a>`).run();
    } else {
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
        className={styles.overlay}
        onClick={onClose}
      />
      <div 
        className={styles.container}
        style={{
          top: `${position.y}px`,
          left: `${Math.max(210, position.x + 20)}px`,
          transform: 'translate(-50%, -100%)',
        }}
      >
        <div className={styles.content}>
          <input
            ref={textInputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Link text..."
            className={styles.input}
          />
          <div className={styles.inputGroup}>
            <input
              ref={urlInputRef}
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter URL..."
              className={styles.input}
            />
            <button
              onClick={handleAdd}
              className="submit-button"
            >
              Apply
            </button>
          </div>
        </div>
        <div 
          className={styles.pointer}
          style={{
            left: `${Math.min(Math.max(10, position.x - Math.max(210, position.x + 20) + 150), 290)}px`
          }}
        />
      </div>
    </>
  );
}
