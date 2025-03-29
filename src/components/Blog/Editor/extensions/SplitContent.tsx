import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { SplitContentView } from './SplitContentView';
import './styles.css';

export interface SplitContentOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    splitContent: {
      /**
       * Add a split content section
       */
      setSplitContent: (position: 'image-left' | 'image-right') => ReturnType;
    };
  }
}

export const SplitContent = Node.create<SplitContentOptions>({
  name: 'splitContent',

  group: 'block',

  content: '(paragraph | heading | bulletList | orderedList )+',

  defining: true,

  addAttributes() {
    return {
      position: {
        default: 'image-left',
        parseHTML: element => element.getAttribute('data-position'),
        renderHTML: attributes => ({
          'data-position': attributes.position,
        }),
      },
      blogId: {
        default: null,
        parseHTML: element => element.getAttribute('data-blog-id'),
        renderHTML: attributes => ({
          'data-blog-id': attributes.blogId,
        }),
      },
      imageUrl: {
        default: null,
        parseHTML: element => element.getAttribute('data-image-url'),
        renderHTML: attributes => ({
          'data-image-url': attributes.imageUrl,
        }),
      },
      source: {
        default: '',
        parseHTML: element => element.getAttribute('data-source'),
        renderHTML: attributes => ({
          'data-source': attributes.source,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="split-content"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes, node }) {
    const isImageLeft = HTMLAttributes['data-position'] === 'image-left';
    const imageUrl = HTMLAttributes['data-image-url'];
    const source = HTMLAttributes['data-source'] || '';
    const containerClasses = `split-content ${isImageLeft ? 'image-left' : 'image-right'}`;

    const children: any[] = [];

    if (imageUrl) {
      children.push(['div', { 
        class: 'image-container',
        'data-source': source
      }, ['img', { 
        src: imageUrl, 
        alt: '', 
        class: 'split-content-image' 
      }]]);
    }
    children.push(['div', { class: 'content' }, 0]);

    return ['div', 
      mergeAttributes(HTMLAttributes, { 
        'data-type': 'split-content',
        class: containerClasses 
      }),
      ...children
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(SplitContentView);
  },

  addCommands() {
    return {
      setSplitContent:
        (position) =>
        ({ commands, editor }) => {
          // Insert the split content
          const success = commands.insertContent([
            {
              type: this.name,
              attrs: { 
                position,
                blogId: editor.storage.splitContent?.blogId 
              },
              content: [
                {
                  type: 'paragraph',
                  content: [{ type: 'text', text: 'Add your content here...' }],
                },
              ],
            }
          ]);

          // Check if there's already a paragraph after
          const { state } = editor;
          const { selection } = state;
          const { $to } = selection;
          const pos = $to.pos;
          const hasNextParagraph = $to.nodeAfter?.type.name === 'paragraph';

          // If no paragraph after, insert one
          if (!hasNextParagraph) {
            commands.insertContent({ type: 'paragraph' });
          }

          return success;
        },
    };
  },
}); 