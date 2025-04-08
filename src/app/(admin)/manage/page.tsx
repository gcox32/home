import PageLayout from '@/components/Layout/PageLayout';
import Link from 'next/link';

export default function Management() {
  return (
    <PageLayout
      title="Admin Dashboard"
      description="Admin controls and management interface"
    >
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
        <Link 
          href="/manage/blog"
          className="bg-[var(--color-background-secondary)] hover:bg-[var(--color-hover-background)] p-6 rounded-lg transition-colors"
        >
          <h3 className="mb-2 font-semibold text-[var(--color-foreground)] text-xl">Blog</h3>
          <p className="text-[var(--color-muted-foreground)]">Create, edit, and manage blog posts</p>
        </Link>

        <Link
          href="/manage/subscribers"
          className="bg-[var(--color-background-secondary)] hover:bg-[var(--color-hover-background)] p-6 rounded-lg transition-colors"
        >
          <h3 className="mb-2 font-semibold text-[var(--color-foreground)] text-xl">Subscribers</h3>
          <p className="text-[var(--color-muted-foreground)]">View and manage subscribers</p>
        </Link>

        <Link 
          href="/manage/reading-list"
          className="bg-[var(--color-background-secondary)] hover:bg-[var(--color-hover-background)] p-6 rounded-lg transition-colors"
        >
          <h3 className="mb-2 font-semibold text-[var(--color-foreground)] text-xl">Reading List</h3>
          <p className="text-[var(--color-muted-foreground)]">Manage your reading list and book reviews</p>
        </Link>
      </div>
    </PageLayout>
  );
}
