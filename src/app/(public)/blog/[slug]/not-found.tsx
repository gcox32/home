'use client';

import Link from 'next/link';

export default function BlogPostNotFound() {
  return (
    <main className="mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center">
        <h1 className="mb-4 font-bold text-4xl">Blog Post Not Found</h1>
        <p className="mb-8 text-muted-text text-lg">
          {`The blog post you're looking for doesn't exist or has been removed.`}
        </p>
        <Link 
          href="/blog"
          className="inline-block bg-accent px-6 py-3 rounded-lg text-white transition-colors hover:bg-accent-dark"
        >
          Return to Blog
        </Link>
      </div>
    </main>
  );
} 