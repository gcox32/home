import { BlogSubscriber } from '@/types';

export async function exportSubscribers(subscribers: BlogSubscriber[]) {
  const csvContent = [
    ['Email', 'Subscribed Date', 'Source'],
    ...subscribers.map(subscriber => [
      subscriber.email,
      new Date(subscriber.subscribedAt).toLocaleDateString(),
      subscriber.source || 'Direct'
    ])
  ]
  .map(row => row.join(','))
  .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `subscribers_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
