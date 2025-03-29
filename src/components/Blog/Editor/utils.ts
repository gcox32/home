import { Editor } from '@tiptap/react';

export async function handleImageUpload(editor: Editor, blogId: string, slug: string) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';

  input.onchange = async (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    try {
      // Clean the filename and create the new name
      const cleanFileName = file.name.toLowerCase().replace(/[^a-z0-9.]/g, '-');
      const fileName = `${blogId}-${cleanFileName}`;

      // Get the signed URL
      const response = await fetch('/api/upload/blog-image', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName,
          fileType: file.type,
          slug: slug
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get upload URL');
      }

      const { uploadUrl, publicUrl } = await response.json();

      // Upload the file
      await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type
        }
      });

      // Insert the image into the editor
      editor.commands.setResizableImage({ 
        src: publicUrl,
        width: 300
      });
    } catch (error) {
      console.error('Image upload error:', error);
      alert('Failed to upload image');
    }
  };

  input.click();
}