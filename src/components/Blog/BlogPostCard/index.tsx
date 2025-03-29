import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './styles.module.css';
import { BlogPost, BlogTag } from '@/types';
import { getPostTags } from '@/utils/blog';

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const [tags, setTags] = useState<BlogTag[]>([]);

  useEffect(() => {
    async function fetchTags() {
      try {
        const fetchedTags = await getPostTags(post.id);
        setTags(fetchedTags);
      } catch (error) {
        console.error('Error fetching tags for blog post:', error);
      }
    }

    fetchTags();
  }, [post.id]);

  return (
    <article className={styles.blogPost}>
      {post.featuredImage && (
        <div className={styles.featuredImage}>
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className={styles.postContent}>
        <Link href={`/blog/${post.slug}`}>
          <h2 className={styles.postTitle}>{post.title}</h2>
        </Link>
        <div className={styles.postMeta}>
          <time dateTime={post.publishDate}>
            {new Date(post.publishDate).toLocaleDateString()}
          </time>
        </div>
        {tags.length > 0 && (
          <div className={styles.postTags}>
            {tags.map((tag) => (
              <Link
                key={tag.id}
                href={`/blog/tags/${tag.slug}`}
                className={styles.tagLink}
              >
                {tag.name}
              </Link>
            ))}
          </div>
        )}
        <p>{post.excerpt}</p>
      </div>
    </article>
  );
} 