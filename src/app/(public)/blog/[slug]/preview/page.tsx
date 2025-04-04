'use client';

import { use } from 'react';
import PreviewBlogPost from '../PreviewBlogPost';

export default function PreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  return <PreviewBlogPost slug={resolvedParams.slug} />;
} 