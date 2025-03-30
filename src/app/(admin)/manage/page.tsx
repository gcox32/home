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
          className="bg-black/[.05] hover:bg-black/[.08] dark:bg-white/[.05] dark:hover:bg-white/[.08] p-6 rounded-lg transition-colors"
        >
          <h3 className="mb-2 font-semibold text-xl">Blog</h3>
          <p className="text-foreground/60">Create, edit, and manage blog posts</p>
        </Link>

        <Link
          href="/manage/subscribers"
          className="bg-black/[.05] hover:bg-black/[.08] dark:bg-white/[.05] dark:hover:bg-white/[.08] p-6 rounded-lg transition-colors"
          >
            <h3 className="mb-2 font-semibold text-xl">Subscribers</h3>
            <p className="text-foreground/60">View and manage subscribers</p>
          </Link>
      </div>
    </PageLayout>
  );
}
