'use client';

import { useEffect, useState } from 'react';
import { Book } from 'lucide-react';
import { ReadingListItem } from '@/types';
import { listReadingItems } from '@/utils/reading-list';

export default function ReadingListWidget() {
    const [currentlyReading, setCurrentlyReading] = useState<ReadingListItem[]>([]);
    const [recentlyRead, setRecentlyRead] = useState<ReadingListItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBooks() {
            try {
                const items = await listReadingItems();
                const reading = items.filter(item => item.status === 'reading');
                const read = items
                    .filter(item => item.status === 'read')
                    .sort((a, b) => new Date(b.finishedAt).getTime() - new Date(a.finishedAt).getTime())
                    .slice(0, 3);

                setCurrentlyReading(reading);
                setRecentlyRead(read);
            } catch (error) {
                console.error('Error fetching reading list:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchBooks();
    }, []);

    if (loading) return null;

    return (
        <div className="bg-[var(--color-background)] p-6 border border-[var(--color-border-base)] rounded-lg">
            <div className="flex items-center gap-2 mb-6">
                <Book className="text-[var(--color-accent)]" size={24} />
                <h2 className="font-semibold text-[var(--color-foreground)] text-xl">Reading List</h2>
            </div>

            <div className="space-y-6">
                {currentlyReading.length > 0 && (
                    <div>
                        <h3 className="mb-3 font-medium text-[var(--color-muted-foreground)] text-sm uppercase tracking-wider">
                            Currently Reading
                        </h3>
                        <div className="space-y-4">
                            {currentlyReading.map(book => (
                                <div key={book.id} className="flex flex-col">
                                    <span className="font-medium text-[var(--color-foreground)]">{book.title}</span>
                                    <span className="text-[var(--color-muted-foreground)] text-sm">by {book.author}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {recentlyRead.length > 0 && (
                    <div>
                        <h3 className="mb-3 font-medium text-[var(--color-muted-foreground)] text-sm uppercase tracking-wider">
                            Recently Read
                        </h3>
                        <div className="space-y-4">
                            {recentlyRead.map(book => (
                                <div key={book.id} className="flex flex-col">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-[var(--color-foreground)]">{book.title}</span>
                                        <span className="text-[var(--color-accent)] text-sm">★ {book.rating}/5</span>
                                    </div>
                                    <span className="text-[var(--color-muted-foreground)] text-sm">by {book.author}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}