'use client';

import { useEffect, useState } from 'react';
import Rolodex from '@/components/Blog/Rolodex';
import Skeleton from '@/components/Common/Skeleton';
import { BlogTag } from '@/types';
import { listTags } from '@/utils/blog';

export default function Blog() {
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
      <div className="flex justify-center items-center h-[85vh]">
        <Skeleton />
      </div>
    );
  }

  const tagEntries = tags.map((tag, index) => ({
    tab: index.toString(),
    label: tag.name,
    tabSlot: index % 5,
    destination: `/blog/tags/${tag.slug}`
  }));

  // Mock entries to fill in if we don't have enough tags
  const mockEntries = [
    { tab: 'A', label: 'Tumwater', tabSlot: 4, destination: '/blog/tags/01_File' },
    { tab: 'B', label: 'Culpepper', tabSlot: 3, destination: '/blog/tags/Bellingham' },
    { tab: 'C', label: 'Cairns', tabSlot: 2, destination: '/blog/tags/Cicero' },
    { tab: 'D', label: 'Siena', tabSlot: 1, destination: '/blog/tags/Delacroix' },
    { tab: 'E', label: 'Cold Harbor', tabSlot: 0, destination: '/blog/tags/Eternity' },
  ];

  // Combine real tags with mock data if needed
  const entries = tagEntries.length >= 5 
    ? tagEntries 
    : [...tagEntries, ...mockEntries.slice(0, 5 - tagEntries.length)];

  return (
    <div className="flex justify-center bg-transparent mx-auto max-w-7xl h-[75vh] overflow-y-hidden">
      <Rolodex entries={entries} />
    </div>
  );
}
