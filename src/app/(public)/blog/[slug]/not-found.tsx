'use client';

import Link from 'next/link';

export default function BlogPostNotFound() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
        <p className="text-lg text-muted-text mb-8">
          The blog post you're looking for doesn't exist or has been removed.
        </p>
        <Link 
          href="/blog"
          className="inline-block px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors"
        >
          Return to Blog
        </Link>
      </div>
    </main>
  );
} 