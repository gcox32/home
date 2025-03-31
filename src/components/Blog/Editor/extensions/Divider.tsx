import { Node } from '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    divider: {
      setDivider: () => ReturnType;
    };
  }
}

export const Divider = Node.create({
  name: 'divider',
  group: 'block',
  parseHTML() {
    return [
      { tag: 'hr' },
    ];
  },
  renderHTML() {
    return ['hr', { class: 'editor-divider' }];
  },
  addCommands() {
    return {
      setDivider:
        () =>
        ({ commands }) => {
          return commands.insertContent({ type: 'divider' });
        },
    };
  },
}); 