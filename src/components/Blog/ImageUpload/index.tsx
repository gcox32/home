import { useState } from 'react';
import { ImageIcon, Loader } from 'lucide-react';
import styles from './styles.module.css';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  uploadEndpoint: string;
  fileNamePrefix: string;
  slug: string;
  aspectRatio?: number;
  maxSize?: number; // in MB
  children?: React.ReactNode;
  renderPreview?: (imageUrl: string) => React.ReactNode;
  className?: string;
}

export function ImageUpload({
  value,
  onChange,
  uploadEndpoint,
  fileNamePrefix,
  slug,
  aspectRatio = 16/9,
  maxSize = 5,
  children,
  renderPreview,
  className = ""
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageClick = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }

      // Validate file size
      if (file.size > maxSize * 1024 * 1024) {
        setError(`File size must be less than ${maxSize}MB`);
        return;
      }

      setIsUploading(true);
      setError(null);

      try {
        const response = await fetch(uploadEndpoint, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName: `${fileNamePrefix}-${file.name.toLowerCase().replace(/[^a-z0-9.]/g, '-')}`,
            fileType: file.type,
            slug: slug
          })
        });

        if (!response.ok) throw new Error('Failed to get upload URL');
        const { uploadUrl, publicUrl } = await response.json();

        await fetch(uploadUrl, {
          method: 'PUT',
          body: file,
          headers: { 'Content-Type': file.type }
        });

        onChange(publicUrl);
      } catch (error) {
        console.error('Image upload error:', error);
        setError('Failed to upload image');
      } finally {
        setIsUploading(false);
      }
    };

    input.click();
  };

  return (
    <div className={styles.container}>
      <div 
        className={`${styles.uploadArea} ${className}`}
        style={{ aspectRatio: aspectRatio }}
        onClick={handleImageClick}
      >
        {value && renderPreview ? (
          renderPreview(value)
        ) : value ? (
          <div className={styles.preview}>
            <img src={value} alt="Preview" />
            <div className={styles.overlay}>
              <span>Click to replace image</span>
            </div>
          </div>
        ) : (
          <div className={styles.placeholder}>
            {isUploading ? (
              <>
                <Loader className={styles.loadingIcon} />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <ImageIcon className={styles.icon} />
                <span>Click to add image</span>
              </>
            )}
          </div>
        )}
      </div>
      {error && <p className={styles.error}>{error}</p>}
      {children}
    </div>
  );
} 