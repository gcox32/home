'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Pencil, Plus } from 'lucide-react';
import DeleteButton from '@/components/Common/DeleteButton';
import { listBlogPosts, deleteBlogPost } from '@/utils/blog';
import { BlogPost } from '@/types';

export default function BlogManagementPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const allPosts = await listBlogPosts();
      // Sort posts by publish date (newest first)
      const sortedPosts = [...allPosts].sort((a, b) => {
        const dateA = a.publishDate ? new Date(a.publishDate).getTime() : 0;
        const dateB = b.publishDate ? new Date(b.publishDate).getTime() : 0;
        return dateB - dateA;
      });
      setPosts(sortedPosts);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeletePost(id: string) {
    try {
      const success = await deleteBlogPost(id);
      if (success) {
        await fetchPosts(); // Refresh the posts list after deletion
      } else {
        console.error('Failed to delete blog post');
      }
    } catch (error) {
      console.error('Error deleting blog post:', error);
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="bg-gray-200 dark:bg-gray-700 mb-6 rounded w-1/4 h-8" />
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-gray-200 dark:bg-gray-700 rounded h-12" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto p-8 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <h1 className="m-0 font-semibold text-foreground text-3xl">Blog Management</h1>
          <Link 
            href="/blog" 
            className="hover:bg-black/[.05] dark:hover:bg-white/[.06] px-4 py-2 border border-accent rounded text-sm transition-colors"
            target="_blank"
          >
            View Public Blog
          </Link>
        </div>
        <Link 
          href="/manage/blog/new"
          className="flex items-center gap-2 bg-accent hover:bg-black/[.05] dark:hover:bg-white/[.06] px-3 py-1.5 rounded-lg text-white hover:text-primary dark:text-foreground transition-colors"
        >
          <Plus size={20} />
          New Post
        </Link>
      </div>

      <div className="bg-card shadow-sm border rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted">
              <th className="px-6 py-3 font-medium text-muted-foreground text-xs text-left uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 font-medium text-muted-foreground text-xs text-left uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 font-medium text-muted-foreground text-xs text-left uppercase tracking-wider">Published Date</th>
              <th className="px-6 py-3 font-medium text-muted-foreground text-xs text-left uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-muted/50">
                <td className="px-6 py-4">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-accent hover:text-accent-foreground"
                    target="_blank"
                  >
                    {post.title}
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full
                    ${post.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : ''}
                    ${post.status === 'draft' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : ''}
                  `}>
                    {post.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-muted-foreground text-sm">
                  {new Date(post.publishDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/manage/blog/${post.id}/edit`}
                      className="text-accent hover:text-accent-foreground"
                    >
                      <Pencil size={18} />
                    </Link>
                    <DeleteButton
                      onDelete={() => handleDeletePost(post.id)}
                      buttonClassName="text-destructive hover:text-destructive-foreground"
                      confirmationText="Are you sure you want to delete this blog post? This action cannot be undone."
                      iconSize={18}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 