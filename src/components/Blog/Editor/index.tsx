'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { SplitContent } from './extensions/SplitContent';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { Divider } from './extensions/Divider';
import { useCallback, useState } from 'react';
import { Editor as TipTapEditor } from '@tiptap/core';
import { Node } from '@tiptap/core';
import { Plugin } from 'prosemirror-state';
import LinkInput from './LinkInput';
import './styles.css';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  Image as ImageIcon,
  Heading1,
  Heading2,
  Code,
  LayoutTemplate,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Minus
} from 'lucide-react';


interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  blogId: string;
}

const TrailingNode = Node.create({
  name: 'trailingNode',
  priority: 1000,
  addProseMirrorPlugins() {
    return [
      new Plugin({
        appendTransaction: (transactions, oldState, newState) => {
          // Only proceed if the content has changed
          if (!transactions.some(tr => tr.docChanged)) return null;

          const { doc, tr } = newState;
          const lastNode = doc.lastChild;

          // If the last node isn't a paragraph, append one
          if (lastNode && lastNode.type.name !== 'paragraph') {
            const transaction = tr.insert(doc.content.size, newState.schema.nodes.paragraph.create());
            return transaction;
          }

          return null;
        },
      }),
    ];
  },
});

export default function Editor({ value, onChange, blogId }: EditorProps) {
  const [linkInputPosition, setLinkInputPosition] = useState<{ x: number; y: number } | null>(null);

  const handleEditorUpdate = useCallback(({ editor }: { editor: TipTapEditor }) => {
    try {
      onChange(editor.getHTML());
    } catch (error) {
      console.error('Editor update error:', error);
    }
  }, [onChange]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: {
          HTMLAttributes: {
            class: 'rounded-md bg-slate-900 p-5 font-mono text-slate-50 my-4 overflow-x-auto border border-slate-800 shadow-lg'
          }
        }
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-accent hover:text-accent-dark underline'
        }
      }),
      Underline,
      SplitContent.configure({
        HTMLAttributes: {
          class: 'split-content'
        }
      }),
      Placeholder.configure({
        placeholder: 'Write your content here...'
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph', 'blockquote'],
        alignments: ['left', 'center', 'right', 'justify'],
        defaultAlignment: 'left',
      }),
      Divider,
      TrailingNode
    ],
    content: value,
    onUpdate: handleEditorUpdate,
    onCreate: ({ editor }) => {
      editor.storage.splitContent = { blogId };
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none'
      },
      handleKeyDown: (view, event) => {
        // Prevent form submission on common editor shortcuts
        if (
          (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) ||
          (event.key === '>' && event.ctrlKey) ||
          (event.key === '`' && event.ctrlKey)
        ) {
          event.preventDefault();
          return true;
        }
        return false;
      }
    },
    immediatelyRender: false
  });

  if (!editor) {
    return null;
  }

  const addLink = () => {
    // Get the current selection coordinates
    const { from } = editor.state.selection;
    const coords = editor.view.coordsAtPos(from);
    
    setLinkInputPosition({
      x: coords.left,
      y: coords.top
    });
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="flex flex-wrap gap-2 p-2 border-b">
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''
          }`}
          title="Heading 1"
          type="button"
        >
          <Heading1 size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''
          }`}
          title="Heading 2"
          type="button"
        >
          <Heading2 size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive('bold') ? 'bg-gray-200' : ''
          }`}
          title="Bold"
          type="button"
        >
          <Bold size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive('italic') ? 'bg-gray-200' : ''
          }`}
          title="Italic"
          type="button"
        >
          <Italic size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive('underline') ? 'bg-gray-200' : ''
          }`}
          title="Underline"
          type="button"
        >
          <UnderlineIcon size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive('bulletList') ? 'bg-gray-200' : ''
          }`}
          title="Bullet List"
          type="button"
        >
          <List size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive('orderedList') ? 'bg-gray-200' : ''
          }`}
          title="Numbered List"
          type="button"
        >
          <ListOrdered size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive('blockquote') ? 'bg-gray-200' : ''
          }`}
          title="Quote"
          type="button"
        >
          <Quote size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive('codeBlock') ? 'bg-gray-200' : ''
          }`}
          title="Code Block"
          type="button"
        >
          <Code size={20} />
        </button>
        <button
          onClick={addLink}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive('link') ? 'bg-gray-200' : ''
          }`}
          title="Add Link"
          type="button"
        >
          <LinkIcon size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().setSplitContent('image-left').run()}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive('splitContent', { position: 'image-left' }) ? 'bg-gray-200' : ''
          }`}
          title="Add Image Left Layout"
          type="button"
        >
          <LayoutTemplate size={20} className="rotate-180" />
        </button>
        <button
          onClick={() => editor.chain().focus().setSplitContent('image-right').run()}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive('splitContent', { position: 'image-right' }) ? 'bg-gray-200' : ''
          }`}
          title="Add Image Right Layout"
          type="button"
        >
          <LayoutTemplate size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().setDivider().run()}
          className="hover:bg-gray-200 p-2 rounded"
          title="Add Divider"
          type="button"
        >
          <Minus size={20} />
        </button>
        <div className="border-l h-6" />
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''
          }`}
          title="Align Left"
          type="button"
        >
          <AlignLeft size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''
          }`}
          title="Align Center"
          type="button"
        >
          <AlignCenter size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''
          }`}
          title="Align Right"
          type="button"
        >
          <AlignRight size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive({ textAlign: 'justify' }) ? 'bg-gray-200' : ''
          }`}
          title="Justify"
          type="button"
        >
          <AlignJustify size={20} />
        </button>
        <div className="border-l h-6" />
        <button
          onClick={() => editor.chain().focus().undo().run()}
          className="hover:bg-gray-200 ml-auto p-2 rounded"
          title="Undo"
          type="button"
        >
          <Undo size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          className="hover:bg-gray-200 p-2 rounded"
          title="Redo"
          type="button"
        >
          <Redo size={20} />
        </button>
      </div>
      
      <EditorContent 
        editor={editor} 
        className="p-4 max-w-none min-h-[500px] prose prose-lg editor-content"
      />

      {linkInputPosition && (
        <LinkInput
          editor={editor}
          onClose={() => setLinkInputPosition(null)}
          position={linkInputPosition}
        />
      )}
    </div>
  );
} 