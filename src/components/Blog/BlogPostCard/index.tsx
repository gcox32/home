import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
    <Link 
      href={`/blog/${post.slug}`}
      className="group flex flex-col bg-black/[.02] dark:bg-white/[.02] border hover:border-white/[.5] dark:border-white/10 border-black/10 dark:hover:border-black/[.5] rounded-lg overflow-hidden transition-colors duration-200 cursor-pointer"
    >
      <article>
        {post.featuredImage && (
          <div className="relative w-full aspect-[16/9] overflow-hidden">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-200"
            />
          </div>
        )}
        <div className="flex flex-col flex-1 p-6">
          <h2 className="mb-2 font-semibold text-foreground text-2xl transition-colors">
            {post.title}
          </h2>
          <div className="mb-4 text-foreground text-sm">
            <time dateTime={post.publishDate}>
              {new Date(post.publishDate).toLocaleDateString()}
            </time>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.location.href = `/blog/tags/${tag.slug}`;
                  }}
                  className="bg-background-secondary hover:bg-primary px-3 py-1 border hover:border-white/[.5] rounded-full text-foreground text-xs transition-colors"
                >
                  {tag.name}
                </button>
              ))}
            </div>
          )}
          <p className="text-foreground">{post.excerpt}</p>
        </div>
      </article>
    </Link>
  );
} 