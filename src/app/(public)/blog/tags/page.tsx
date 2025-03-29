'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Skeleton from '@/components/Common/Skeleton';
import { BlogTag } from '@/types';
import { listTags } from '@/utils/blog';

export default function TagsPage() {
  const [tags, setTags] = useState<BlogTag[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTags() {
      try {
        const allTags = await listTags();
        setTags(allTags);
      } catch (error) {
        console.error('Error fetching tags:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTags();
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
            Tags
          </h1>
          <p className="text-muted-foreground">
            Browse blog posts by topic
          </p>
        </header>

        <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {tags.map((tag) => (
            <Link
              key={tag.id}
              href={`/blog/tags/${tag.slug}`}
              className="bg-black/[.02] hover:bg-black/[.05] dark:bg-white/[.02] dark:hover:bg-white/[.05] p-4 border hover:border-white/[.5] dark:border-white/10 dark:hover:border-black/[.5] rounded-lg transition-colors"
            >
              <h2 className="font-medium text-foreground">{tag.name}</h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
