'use client';

import Link from 'next/link';

export default function UnauthorizedPost({ status }: { status: 'draft' | 'archived' }) {
    console.log('UnauthorizedPost component level');
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Post Not Available</h1>
        <p className="text-lg text-muted-text mb-8">
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
