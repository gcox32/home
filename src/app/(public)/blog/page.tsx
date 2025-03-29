'use client';

import { useEffect, useState } from 'react';
import Rolodex from '@/components/Blog/Rolodex';
import Skeleton from '@/components/Common/Skeleton';
import { BlogPost } from '@/types';
import { listBlogPosts } from '@/utils/blog';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const publishedPosts = await listBlogPosts('published');
        
        // Sort posts by publish date (newest first)
        const sortedPosts = [...publishedPosts].sort((a, b) =>
          b.publishDate.localeCompare(a.publishDate)
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
      <div className="flex justify-center items-center h-[85vh]">
        <Skeleton />
      </div>
    );
  }

  const _ = posts.map((post, index) => ({
    tab: post.title[0].toUpperCase(),
    label: post.title,
    tabSlot: index % 5,
    destination: `/blog/${post.slug}`
  }));

  const entries = [
    { tab: 'A', label: 'Tumwater', tabSlot: 0, destination: '/blog/tags/01_File' },
    { tab: 'B', label: 'Culpepper', tabSlot: 1, destination: '/blog/tags/Bellingham' },
    { tab: 'C', label: 'Cairns', tabSlot: 2, destination: '/blog/tags/Cicero' },
    { tab: 'D', label: 'Siena', tabSlot: 3, destination: '/blog/tags/Delacroix' },
    { tab: 'E', label: 'Cold Harbor', tabSlot: 4, destination: '/blog/tags/Eternity' },
  ]


  return (
    <div className="flex justify-center bg-transparent mx-auto max-w-7xl h-[85vh]">
      <Rolodex entries={entries} />
    </div>
  );
}
