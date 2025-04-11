'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import BlogPostCard from '@/components/Blog/BlogPostCard';
import Skeleton from '@/components/Common/Skeleton';
import { BlogPost } from '@/types';
import { listBlogPosts } from '@/utils/blog';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const allPosts = await listBlogPosts('published');
        // Sort by publish date, newest first
        const sortedPosts = allPosts.sort((a, b) => 
          new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
        );
        setPosts(sortedPosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

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
            Blog
          </h1>
          <div className="flex items-center gap-4">
            <p className="text-muted-foreground">
              Browse through my latest thoughts and experiences
            </p>
            <Link 
              href="/blog/tags"
              className="bg-accent/10 hover:bg-accent px-3 py-1 rounded-full text-accent text-sm transition-colors hover:text-accent-foreground"
            >
              Browse Tags
            </Link>
          </div>
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
