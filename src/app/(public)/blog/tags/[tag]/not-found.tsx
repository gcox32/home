'use client';

import Link from 'next/link';

export default function TagNotFound() {
  return (
    <div className="not-found">
      <h1>No Posts Found</h1>
      <p>No blog posts were found with this tag.</p>
      <Link href="/blog" className="back-link">
        ← Back
      </Link>
    </div>
  );
} 