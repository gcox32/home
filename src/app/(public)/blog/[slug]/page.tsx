'use client';

import { useEffect, useState, use } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Skeleton from '@/components/Common/Skeleton';
import UnauthorizedPost from './unauthorized-post';
import { BlogPost, BlogTag } from '@/types';
import { getPostTags, getBlogPostBySlug } from '@/utils/blog';

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [tags, setTags] = useState<BlogTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [postStatus, setPostStatus] = useState<'draft' | 'published' | 'archived' | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const matchingPost = await getBlogPostBySlug(resolvedParams.slug);
        
        if (!matchingPost) {
          notFound();
        }

        if (matchingPost.status !== 'published') {
          setPostStatus(matchingPost.status);
          setLoading(false);
          return;
        }

        setPost(matchingPost);
        setPostStatus(matchingPost.status);

        const postTags = await getPostTags(matchingPost.id);
        setTags(postTags);
      } catch (error) {
        console.error('Error fetching blog post:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [resolvedParams.slug]);

  if (loading) {
    return (
      <div className="mx-auto px-6 py-12 max-w-4xl">
        <Skeleton variant="single" />
      </div>
    );
  }

  if (postStatus && postStatus !== 'published') {
    return <UnauthorizedPost status={postStatus} />;
  }

  if (!post) return null;

  return (
    <div className="mx-auto px-6 py-12 max-w-7xl">
      <article>
        <header className="mb-8">
          <h1 className="mb-4 font-bold text-foreground text-4xl">{post.title}</h1>
          <div className="mb-4 text-muted-foreground text-sm">
            <time dateTime={post.publishDate}>
              {new Date(post.publishDate).toLocaleDateString()}
            </time>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link
                  key={tag.id}
                  href={`/blog/tags/${tag.slug}`}
                  className="bg-accent/10 hover:bg-accent px-3 py-1 rounded-full text-accent text-sm transition-colors hover:text-accent-foreground"
                >
                  {tag.name}
                </Link>
              ))}
            </div>
          )}
        </header>

        {post.featuredImage && (
          <div className="relative mb-8 rounded-lg w-full aspect-[16/9] overflow-hidden">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              className="object-cover"
            />
          </div>
        )}

        <div
          className="dark:prose-invert max-w-none prose"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}
