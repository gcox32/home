import { Node, mergeAttributes, Editor } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { SplitContentView } from './SplitContentView';

export interface SplitContentOptions {
  HTMLAttributes: Record<string, string | number | boolean | null>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    splitContent: {
      setSplitContent: (position: 'image-left' | 'image-right') => ReturnType;
      updateSplitContentAttributes: (pos: number, attrs: Record<string, any>) => ReturnType;
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
      slug: {
        default: null,
        parseHTML: element => element.getAttribute('data-slug'),
        renderHTML: attributes => ({
          'data-slug': attributes.slug,
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
      }
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="split-content"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const isImageLeft = HTMLAttributes['data-position'] === 'image-left';
    const imageUrl = HTMLAttributes['data-image-url'];
    const source = HTMLAttributes['data-source'] || '';
    const containerClasses = `split-content ${isImageLeft ? 'image-left' : 'image-right'}`;

    return ['div', 
      mergeAttributes(HTMLAttributes, { 
        'data-type': 'split-content',
        class: containerClasses,
        'data-blog-id': HTMLAttributes['data-blog-id'],
        'data-slug': HTMLAttributes['data-slug'],
        'data-image-url': imageUrl,
        'data-source': source,
        'data-position': HTMLAttributes['data-position']
      }),
      ...(imageUrl ? [
        ['div', { 
          class: 'image-container',
          'data-source': source
        }, ['img', { 
          src: imageUrl, 
          alt: source || '', 
          title: source || '',
          class: 'split-content-image' 
        }]]
      ] : []),
      ['div', { class: 'content' }, 0]
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
          const success = commands.insertContent([
            {
              type: this.name,
              attrs: { 
                position,
                blogId: editor.storage.splitContent?.blogId,
                slug: editor.storage.splitContent?.slug
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
          const hasNextParagraph = $to.nodeAfter?.type.name === 'paragraph';

          // If no paragraph after, insert one
          if (!hasNextParagraph) {
            commands.insertContent({ type: 'paragraph' });
          }

          return success;
        },
      updateSplitContentAttributes:
        (pos, attrs) =>
        ({ tr, dispatch }) => {
          if (dispatch) {
            tr.setNodeMarkup(pos, undefined, {
              ...tr.doc.nodeAt(pos)?.attrs,
              ...attrs
            });
            return true;
          }
          return false;
        }
    };
  },

  addStorage() {
    return {
      blogId: null,
      slug: null
    }
  },

  onCreate() {
    this.editor.storage.splitContent.updateNodeAttributes = (pos: number, attrs: Record<string, any>) => {
      this.editor.view.dispatch(
        this.editor.view.state.tr.setNodeMarkup(pos, undefined, {
          ...this.editor.view.state.doc.nodeAt(pos)?.attrs,
          ...attrs
        })
      );
    };
  }
}); 