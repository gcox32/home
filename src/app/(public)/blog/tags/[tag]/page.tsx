'use client';

import { useEffect, useState, use } from 'react';
import { notFound } from 'next/navigation';
import Skeleton from '@/components/Common/Skeleton';
import { BlogPost } from '@/types';
import { getTagBySlug, getBlogPostsByTagId } from '@/utils/blog';
import BlogPostCard from '@/components/Blog/BlogPostCard';

export default function TaggedBlogPostsPage({ params }: { params: Promise<{ tag: string }> }) {
  const resolvedParams = use(params);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        // First, find the tag by its slug
        const tag = await getTagBySlug(resolvedParams.tag);
        if (!tag) {
          notFound();
        }

        // Get all posts for this tag
        const publishedPosts = await getBlogPostsByTagId(tag.id);
        if (publishedPosts.length === 0) {
          notFound();
        }

        setPosts(publishedPosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [resolvedParams.tag]);

  if (loading) {
    return (
      <div className="mx-auto px-6 py-12 max-w-7xl">
        <div className="w-full">
          <Skeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto px-6 py-12 max-w-7xl">
      <div className="w-full">
        <header className="mb-12">
          <h1 className="mb-4 font-bold text-foreground text-3xl">
            {`Posts tagged with "${resolvedParams.tag}"`}
          </h1>
        </header>

        <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
