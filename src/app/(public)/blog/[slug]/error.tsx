'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function BlogPostError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Blog post error:', error);
  }, [error]);

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Something Went Wrong</h1>
        <p className="text-lg text-muted-text mb-8">
          We encountered an error while loading this blog post.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={reset}
            className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors"
          >
            Try Again
          </button>
          <Link 
            href="/blog"
            className="px-6 py-3 border border-accent text-accent rounded-lg hover:bg-accent/10 transition-colors"
          >
            Return to Blog
          </Link>
        </div>
      </div>
    </main>
  );
} 