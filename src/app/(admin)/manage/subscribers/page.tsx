'use client';

import { useEffect, useState, useCallback } from 'react';
import { Download } from 'lucide-react';
import DeleteButton from '@/components/Common/DeleteButton';
import { useSnackbar } from '@/contexts/SnackbarContext';
import { BlogSubscriber } from '@/types';
import { exportSubscribers } from '@/utils/export';

const ITEMS_PER_PAGE = 10;

export default function SubscriberManagementPage() {
  const [subscribers, setSubscribers] = useState<BlogSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { showSnackbar } = useSnackbar();

  const totalPages = Math.ceil(subscribers.length / ITEMS_PER_PAGE);
  const paginatedSubscribers = subscribers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const fetchSubscribers = useCallback(async () => {
    try {
      const response = await fetch('/api/blog/subscribers');
      if (!response.ok) throw new Error('Failed to fetch subscribers');
      const data = await response.json();
      setSubscribers(data);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      showSnackbar('Failed to load subscribers', 'error');
    } finally {
      setLoading(false);
    }
  }, [showSnackbar]);

  useEffect(() => {
    void fetchSubscribers();
  }, [fetchSubscribers]);

  async function handleDeleteSubscriber(email: string) {
    try {
      const response = await fetch('/api/blog/subscribers', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error('Failed to delete subscriber');
      
      await fetchSubscribers();
      showSnackbar('Subscriber deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting subscriber:', error);
      showSnackbar('Failed to delete subscriber', 'error');
    }
  }

  const handleExport = async () => {
    try {
      await exportSubscribers(subscribers);
      showSnackbar('Subscribers exported successfully', 'success');
    } catch (error) {
      console.error('Error exporting subscribers:', error);
      showSnackbar('Failed to export subscribers', 'error');
    }
  };

  if (loading) {
    return (
      <div className="mx-auto p-8 max-w-7xl">
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
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-bold text-2xl">Manage Subscribers</h1>
          <p className="text-muted-foreground">
            Total Subscribers: {subscribers.length}
          </p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 bg-accent hover:bg-accent/90 px-4 py-2 rounded-lg text-white transition-colors cursor-pointer"
        >
          <Download size={12} />
          Export
        </button>
      </div>

      <div className="bg-card shadow-sm border rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted">
              <th className="px-6 py-3 font-medium text-muted-foreground text-xs text-left uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 font-medium text-muted-foreground text-xs text-left uppercase tracking-wider">Subscribed Date</th>
              <th className="px-6 py-3 font-medium text-muted-foreground text-xs text-left uppercase tracking-wider">Source</th>
              <th className="px-6 py-3 font-medium text-muted-foreground text-xs text-left uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedSubscribers.map((subscriber) => (
              <tr key={subscriber.email} className="hover:bg-muted/50">
                <td className="px-6 py-4">{subscriber.email}</td>
                <td className="px-6 py-4 text-muted-foreground text-sm">
                  {new Date(subscriber.subscribedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-muted-foreground text-sm">
                  {subscriber.source || 'Direct'}
                </td>
                <td className="px-6 py-4">
                  <DeleteButton
                    onDelete={() => handleDeleteSubscriber(subscriber.email)}
                    buttonClassName="text-destructive hover:text-destructive-foreground"
                    confirmationText="Are you sure you want to remove this subscriber? This action cannot be undone."
                    iconSize={18}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {totalPages > 1 && (
          <div className="flex justify-between items-center px-6 py-3 border-t">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="hover:bg-muted disabled:opacity-50 px-3 py-1 rounded disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-muted-foreground text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="hover:bg-muted disabled:opacity-50 px-3 py-1 rounded disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
