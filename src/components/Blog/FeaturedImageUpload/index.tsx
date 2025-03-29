import { ImageUpload } from '@/components/Blog/ImageUpload';
import styles from './styles.module.css';

interface FeaturedImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  blogId: string;
  slug: string;
  source: string;
  onSourceChange: (source: string) => void;
}

export default function FeaturedImageUpload({ 
  value, 
  onChange, 
  blogId, 
  slug,
  source, 
  onSourceChange 
}: FeaturedImageUploadProps) {
  return (
    <div className={styles.container}>
      <label className={styles.label}>Featured Image</label>
      <ImageUpload
        value={value}
        onChange={onChange}
        uploadEndpoint="/api/upload/blog-image"
        fileNamePrefix={`${blogId}-featured`}
        slug={slug}
        aspectRatio={16/9}
      >
        {value && (
          <input
            type="text"
            placeholder="Image source (optional)"
            value={source}
            onChange={(e) => onSourceChange(e.target.value)}
            className={styles.sourceInput}
          />
        )}
      </ImageUpload>
    </div>
  );
} 