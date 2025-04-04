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
  slug: string;
  postDetailsExpanded: boolean;
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

export default function Editor({ value, onChange, blogId, slug, postDetailsExpanded }: EditorProps) {

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
            class: 'rounded-md bg-slate-900 p-5 font-mono text-slate-50 my-2 overflow-x-auto border border-slate-800 shadow-lg'
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
      editor.storage.splitContent = { 
        blogId,
        slug 
      };
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
    
    // Adjust for the collapsed section height
    const detailsHeight = postDetailsExpanded ? 1215 : 0; // Approximate height when expanded

    setLinkInputPosition({
      x: coords.left,
      y: coords.top + detailsHeight
    });
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="flex flex-wrap gap-2 p-2 border-b">
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded cursor-pointer hover:bg-[var(--hover-background-soft)] ${
            editor.isActive('heading', { level: 1 }) ? 'bg-[var(--hover-background-intense)]' : ''
          }`}
          title="Heading 1"
          type="button"
        >
          <Heading1 size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded cursor-pointer hover:bg-[var(--hover-background-soft)] ${
            editor.isActive('heading', { level: 2 }) ? 'bg-[var(--hover-background-intense)]' : ''
          }`}
          title="Heading 2"
          type="button"
        >
          <Heading2 size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded cursor-pointer hover:bg-[var(--hover-background-soft)] ${
            editor.isActive('bold') ? 'bg-[var(--hover-background-intense)]' : ''
          }`}
          title="Bold"
          type="button"
        >
          <Bold size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded cursor-pointer hover:bg-[var(--hover-background-soft)] ${
            editor.isActive('italic') ? 'bg-[var(--hover-background-intense)]' : ''
          }`}
          title="Italic"
          type="button"
        >
          <Italic size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded cursor-pointer hover:bg-[var(--hover-background-soft)] ${
            editor.isActive('underline') ? 'bg-[var(--hover-background-intense)]' : ''
          }`}
          title="Underline"
          type="button"
        >
          <UnderlineIcon size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded cursor-pointer hover:bg-[var(--hover-background-soft)] ${
            editor.isActive('bulletList') ? 'bg-[var(--hover-background-intense)]' : ''
          }`}
          title="Bullet List"
          type="button"
        >
          <List size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded cursor-pointer hover:bg-[var(--hover-background-soft)] ${
            editor.isActive('orderedList') ? 'bg-[var(--hover-background-intense)]' : ''
          }`}
          title="Numbered List"
          type="button"
        >
          <ListOrdered size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded cursor-pointer hover:bg-[var(--hover-background-soft)] ${
            editor.isActive('blockquote') ? 'bg-[var(--hover-background-intense)]' : ''
          }`}
          title="Quote"
          type="button"
        >
          <Quote size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-2 rounded cursor-pointer hover:bg-[var(--hover-background-soft)] ${
            editor.isActive('codeBlock') ? 'bg-[var(--hover-background-intense)]' : ''
          }`}
          title="Code Block"
          type="button"
        >
          <Code size={20} />
        </button>
        <button
          onClick={addLink}
          className={`p-2 rounded cursor-pointer hover:bg-[var(--hover-background-soft)] ${
            editor.isActive('link') ? 'bg-[var(--hover-background-intense)]' : ''
          }`}
          title="Add Link"
          type="button"
        >
          <LinkIcon size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().setSplitContent('image-left').run()}
          className={`p-2 rounded cursor-pointer hover:bg-[var(--hover-background-soft)] ${
            editor.isActive('splitContent', { position: 'image-left' }) ? 'bg-[var(--hover-background-intense)]' : ''
          }`}
          title="Add Image Left Layout"
          type="button"
        >
          <LayoutTemplate size={20} className="rotate-180" />
        </button>
        <button
          onClick={() => editor.chain().focus().setSplitContent('image-right').run()}
          className={`p-2 rounded cursor-pointer hover:bg-[var(--hover-background-soft)] ${
            editor.isActive('splitContent', { position: 'image-right' }) ? 'bg-[var(--hover-background-intense)]' : ''
          }`}
          title="Add Image Right Layout"
          type="button"
        >
          <LayoutTemplate size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().setDivider().run()}
          className="hover:bg-[var(--hover-background-soft)] p-2 rounded"
          title="Add Divider"
          type="button"
        >
          <Minus size={20} />
        </button>
        <div className="opacity-50 my-auto border-l h-6" />
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`p-2 rounded cursor-pointer hover:bg-[var(--hover-background-soft)] ${
            editor.isActive({ textAlign: 'left' }) ? 'bg-[var(--hover-background-intense)]' : ''
          }`}
          title="Align Left"
          type="button"
        >
          <AlignLeft size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`p-2 rounded cursor-pointer hover:bg-[var(--hover-background-soft)] ${
            editor.isActive({ textAlign: 'center' }) ? 'bg-[var(--hover-background-intense)]' : ''
          }`}
          title="Align Center"
          type="button"
        >
          <AlignCenter size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`p-2 rounded cursor-pointer hover:bg-[var(--hover-background-soft)] ${
            editor.isActive({ textAlign: 'right' }) ? 'bg-[var(--hover-background-intense)]' : ''
          }`}
          title="Align Right"
          type="button"
        >
          <AlignRight size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={`p-2 rounded cursor-pointer hover:bg-[var(--hover-background-soft)] ${
            editor.isActive({ textAlign: 'justify' }) ? 'bg-[var(--hover-background-intense)]' : ''
          }`}
          title="Justify"
          type="button"
        >
          <AlignJustify size={20} />
        </button>
        <div className="opacity-50 my-auto border-l h-6" />
        <button
          onClick={() => editor.chain().focus().undo().run()}
          className="hover:bg-[var(--hover-background-soft)] ml-auto p-2 rounded cursor-pointer"
          title="Undo"
          type="button"
        >
          <Undo size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          className="hover:bg-[var(--hover-background-soft)] p-2 rounded cursor-pointer"
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