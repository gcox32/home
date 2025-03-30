'use client';

import Link from 'next/link';

export default function UnauthorizedPost({ status }: { status: 'draft' | 'archived' }) {
  return (
    <main className="mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center">
        <h1 className="mb-4 font-bold text-4xl">Post Not Available</h1>
        <p className="mb-8 text-muted-text text-lg">
          {status === 'draft' 
            ? 'This blog post is currently in draft and is not yet published.'
            : 'This blog post has been archived and is no longer available.'}
        </p>
        <Link 
          href="/blog"
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            backgroundColor: 'var(--accent-color)',
            color: 'white',
            borderRadius: '0.5rem',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-dark)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-color)'}
        >
          Return to Blog
        </Link>
      </div>
    </main>
  );
}
