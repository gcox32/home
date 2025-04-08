'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Pencil, Plus, Eye } from 'lucide-react';
import DeleteButton from '@/components/Common/DeleteButton';
import { listBlogPosts, deleteBlogPost } from '@/utils/blog';
import { BlogPost } from '@/types';
import Skeleton from '@/components/Common/Skeleton';

export default function BlogManagementPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [sortField, setSortField] = useState<'publishDate' | 'updatedAt'>('publishDate');

  const fetchPosts = useCallback(async () => {
    try {
      const allPosts = await listBlogPosts();
      sortPosts(allPosts, sortField, sortDirection);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  }, [sortField, sortDirection]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  function sortPosts(
    postsToSort: BlogPost[], 
    field: 'publishDate' | 'updatedAt' = sortField, 
    direction: 'asc' | 'desc' = sortDirection
  ) {
    const sortedPosts = [...postsToSort].sort((a, b) => {
      const dateA = a[field] ? new Date(a[field]).getTime() : 0;
      const dateB = b[field] ? new Date(b[field]).getTime() : 0;
      return direction === 'desc' ? dateB - dateA : dateA - dateB;
    });
    setPosts(sortedPosts);
  }

  function toggleSort(field: 'publishDate' | 'updatedAt') {
    const newDirection = field === sortField 
      ? (sortDirection === 'desc' ? 'asc' : 'desc')
      : 'desc';
    setSortDirection(newDirection);
    setSortField(field);
    sortPosts(posts, field, newDirection);
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
      <div className="mx-auto p-8 max-w-7xl">
        <Skeleton variant="list" count={3} />
      </div>
    );
  }

  return (
    <div className="mx-auto p-8 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <h1 className="m-0 font-semibold text-[var(--color-foreground)] text-3xl">Blog Management</h1>
          <Link 
            href="/blog" 
            className="hover:bg-[var(--color-hover-background)] px-4 py-2 border border-[var(--color-accent)] rounded text-[var(--color-foreground)] text-sm transition-colors"
            target="_blank"
          >
            View Public Blog
          </Link>
        </div>
        <Link 
          href="/manage/blog/new"
          className="flex items-center gap-2 bg-[var(--color-accent)] px-3 py-1.5 rounded-lg transition-colors text-[var(--color-accent-foreground)] hover:bg-[var(--color-accent-dark)]"
        >
          <Plus size={20} />
          New Post
        </Link>
      </div>

      <div className="bg-[var(--color-background)] shadow-sm border border-[var(--color-border-base)] rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[var(--color-background-secondary)]">
              <th className="px-6 py-3 font-medium text-[var(--color-muted-foreground)] text-xs text-left uppercase tracking-wider cursor-default">Title</th>
              <th className="px-6 py-3 font-medium text-[var(--color-muted-foreground)] text-xs text-left uppercase tracking-wider cursor-default">Status</th>
              <th className="px-6 py-3 font-medium text-[var(--color-muted-foreground)] text-xs text-left uppercase tracking-wider cursor-pointer">
                <button 
                  onClick={() => toggleSort('publishDate')}
                  className="flex items-center gap-1 hover:text-[var(--color-foreground)] uppercase cursor-pointer"
                >
                  Published
                  {sortField === 'publishDate' && (
                    <span className="text-xs">
                      {sortDirection === 'desc' ? '↓' : '↑'}
                    </span>
                  )}
                </button>
              </th>
              <th className="px-6 py-3 font-medium text-[var(--color-muted-foreground)] text-xs text-left uppercase tracking-wider cursor-pointer">
                <button 
                  onClick={() => toggleSort('updatedAt')}
                  className="flex items-center gap-1 hover:text-[var(--color-foreground)] uppercase cursor-pointer"
                >
                  Last Updated
                  {sortField === 'updatedAt' && (
                    <span className="text-xs">
                      {sortDirection === 'desc' ? '↓' : '↑'}
                    </span>
                  )}
                </button>
              </th>
              <th className="px-6 py-3 font-medium text-[var(--color-muted-foreground)] text-xs text-center uppercase tracking-wider cursor-default">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-[var(--color-border-base)] divide-y">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-[var(--color-hover-background)]">
                <td className="px-6 py-4">
                  <span className="cursor-default">
                    {post.title}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex py-1 text-xs font-medium rounded-full cursor-default
                    ${post.status === 'published' ? 'bg-[var(--color-success-light)] text-[var(--color-success)]' : ''}
                    ${post.status === 'draft' ? 'bg-[var(--color-warning-light)] text-[var(--color-warning)]' : ''}
                  `}>
                    {post.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-[var(--color-muted-foreground)] text-sm cursor-default">
                  {new Date(post.publishDate).toLocaleString() !== 'Invalid Date' ? new Date(post.publishDate).toLocaleString().replace(',', '') : '--'}
                </td>
                <td className="px-6 py-4 text-[var(--color-muted-foreground)] text-sm cursor-default">
                  {new Date(post.updatedAt).toLocaleString().replace(',', '')}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center items-center gap-3">
                    <Link
                      href={`/manage/blog/${post.id}/edit`}
                      className="hover:bg-[var(--color-hover-background)] p-2 rounded-full text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-dark)]"
                    >
                      <Pencil size={18} />
                    </Link>
                    <Link
                      href={`/blog/${post.slug}/preview`}
                      target="_blank"
                      className="hover:bg-[var(--color-hover-background)] p-2 rounded-full text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-dark)]"
                    >
                      <Eye size={18} />
                    </Link>
                    <DeleteButton
                      onDelete={() => handleDeletePost(post.id)}
                      buttonClassName="text-[var(--color-destructive)] hover:text-[var(--color-destructive-foreground)]"
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