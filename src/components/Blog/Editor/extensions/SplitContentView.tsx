import { NodeViewContent, NodeViewWrapper, NodeViewProps } from '@tiptap/react';
import { Image as ImageIcon, Loader } from 'lucide-react';
import './styles.css';
import { useState } from 'react';

export function SplitContentView({ node, selected, editor }: NodeViewProps) {
  const [isUploading, setIsUploading] = useState(false);
  const isImageLeft = node.attrs.position === 'image-left';
  const hasImage = node.attrs.imageUrl;

  const handleImageClick = async () => {
    if (!editor) return;

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      setIsUploading(true);
      try {
        const response = await fetch('/api/upload/blog-image', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName: `${node.attrs.blogId}-${file.name.toLowerCase().replace(/[^a-z0-9.]/g, '-')}`,
            fileType: file.type,
            slug: node.attrs.slug
          })
        });

        if (!response.ok) throw new Error('Failed to get upload URL');
        const { uploadUrl, publicUrl } = await response.json();

        await fetch(uploadUrl, {
          method: 'PUT',
          body: file,
          headers: { 'Content-Type': file.type }
        });

        editor.commands.updateAttributes('splitContent', {
          imageUrl: publicUrl
        });
      } catch (error) {
        console.error('Image upload error:', error);
      } finally {
        setIsUploading(false);
      }
    };

    input.click();
  };

  const handleSourceChange = (e: React.FocusEvent<HTMLInputElement>) => {
    if (editor) {
      editor.commands.updateAttributes('splitContent', {
        source: e.target.value || ''
      });
    }
  };

  const ImageSection = () => (
    <div className="image-section">
      {hasImage ? (
        <>
          <div className="image-container" onClick={handleImageClick}>
            <img src={node.attrs.imageUrl} alt="" className="split-content-image" />
            <div className="image-overlay">
              <span className="text-white text-sm">Click to replace image</span>
            </div>
          </div>
          <input
            type="text"
            placeholder="Add source..."
            defaultValue={node.attrs.source || ''}
            onBlur={handleSourceChange}
            className="source-input"
          />
        </>
      ) : (
        <div className="image-placeholder" onClick={handleImageClick}>
          {isUploading ? (
            <>
              <Loader size={48} className="text-gray-400 animate-spin" />
              <span className="text-gray-500 text-sm">Uploading image...</span>
            </>
          ) : (
            <>
              <ImageIcon size={48} className="text-gray-400" />
              <span className="text-gray-500 text-sm">Click to add image</span>
            </>
          )}
        </div>
      )}
    </div>
  );

  return (
    <NodeViewWrapper className="split-content-wrapper">
      <div
        className={`split-content ${selected ? 'selected' : ''} ${
          isImageLeft ? 'image-left' : 'image-right'
        }`}
      >
        {isImageLeft ? (
          <>
            <ImageSection />
            <div className="content">
              <NodeViewContent className="content-editable" />
            </div>
          </>
        ) : (
          <>
            <div className="content">
              <NodeViewContent className="content-editable" />
            </div>
            <ImageSection />
          </>
        )}
      </div>
    </NodeViewWrapper>
  );
} 