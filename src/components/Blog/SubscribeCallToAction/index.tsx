import { useState } from 'react';
import LoadingSpinner from '@/components/Common/LoadingSpinner';
import { useSnackbar } from '@/contexts/SnackbarContext';

type SubscriptionStatus = 'idle' | 'loading' | 'success' | 'error' | 'already-subscribed';

export default function SubscribeCallToAction({ source }: { source: string }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SubscriptionStatus>('idle');
  const { showSnackbar } = useSnackbar();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/blog/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, source }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to subscribe');
      }

      if (data.status === 'already-subscribed') {
        setStatus('already-subscribed');
        showSnackbar('You\'re already subscribed!', 'info');
      } else {
        setStatus('success');
        setEmail('');
        showSnackbar('Thanks for subscribing!', 'success');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setStatus('error');
      showSnackbar('Something went wrong. Please try again.', 'error');
    }
  };

  return (
    <div className="mt-16 p-8 bg-border border border-[var(--color-border-base)] rounded-lg text-center">
      <h2 className="mb-4 font-semibold text-[var(--color-foreground)] text-2xl">
        Stay Updated
      </h2>
      <p className="mb-6 text-[var(--color-muted-foreground)]">
        Want to read more content like this? Stay updated on future posts.
      </p>
      
      <form onSubmit={handleSubmit} className="mx-auto max-w-md">
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 bg-[var(--color-background)] px-4 py-2 border focus:border-[var(--color-accent)] border-[var(--color-border-base)] rounded-lg focus:outline-none focus:ring-[var(--color-accent)] focus:ring-2 text-[var(--color-foreground)]"
            disabled={status === 'loading' || status === 'success'}
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="bg-[var(--color-accent)] disabled:opacity-50 px-6 py-2 rounded-lg w-[120px] transition-colors text-[var(--color-accent-foreground)] hover:bg-[var(--color-accent-dark)] cursor-pointer disabled:cursor-not-allowed"
          >
            {status === 'loading' ? <LoadingSpinner /> : 'Subscribe'}
          </button>
        </div>
      </form>
    </div>
  );
}
