'use client';

import { useEffect, useState } from 'react';
import { Book } from 'lucide-react';
import { ReadingListItem } from '@/types';
import { listReadingItems } from '@/utils/reading-list';
import BookModal from './BookModal';

export default function ReadingListWidget() {
    const [currentlyReading, setCurrentlyReading] = useState<ReadingListItem[]>([]);
    const [recentlyRead, setRecentlyRead] = useState<ReadingListItem[]>([]);
    const [toBeRead, setToBeRead] = useState<ReadingListItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState<ReadingListItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        async function fetchBooks() {
            try {
                const items = await listReadingItems();
                const reading = items.filter(item => item.status === 'reading');
                const read = items
                    .filter(item => item.status === 'read')
                    .sort((a, b) => new Date(b.finishedAt).getTime() - new Date(a.finishedAt).getTime())
                    .slice(0, 3);
                const toBeRead = items.filter(item => item.status === 'to-be-read');

                setCurrentlyReading(reading);
                setRecentlyRead(read);
                setToBeRead(toBeRead);
            } catch (error) {
                console.error('Error fetching reading list:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchBooks();
    }, []);

    const handleItemClick = (item: ReadingListItem) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    if (loading) return null;

    return (
        <>
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
                                    <button
                                        key={book.id}
                                        onClick={() => handleItemClick(book)}
                                        className="flex flex-col hover:bg-[var(--color-hover-background)] p-2 rounded w-full text-left transition-colors cursor-pointer"
                                    >
                                        <span className="font-medium text-[var(--color-foreground)]">{book.title}</span>
                                        <span className="text-[var(--color-muted-foreground)] text-sm">by {book.author}</span>
                                    </button>
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
                                    <button
                                        key={book.id}
                                        onClick={() => handleItemClick(book)}
                                        className="flex flex-col hover:bg-[var(--color-hover-background)] p-2 rounded w-full text-left transition-colors cursor-pointer"
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-[var(--color-foreground)]">{book.title}</span>
                                            <span className="text-[var(--color-accent)] text-sm">★ {book.rating}/5</span>
                                        </div>
                                        <span className="text-[var(--color-muted-foreground)] text-sm">by {book.author}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {toBeRead.length > 0 && (
                        <div>
                            <h3 className="mb-3 font-medium text-[var(--color-muted-foreground)] text-sm uppercase tracking-wider">
                                To Be Read
                            </h3>
                            <div className="space-y-4">
                                {toBeRead.map(book => (
                                    <button
                                        key={book.id}
                                        onClick={() => handleItemClick(book)}
                                        className="flex flex-col hover:bg-[var(--color-hover-background)] p-2 rounded w-full text-left transition-colors cursor-pointer"
                                    >
                                        <span className="font-medium text-[var(--color-foreground)]">{book.title}</span>
                                        <span className="text-[var(--color-muted-foreground)] text-sm">by {book.author}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {selectedItem && (
                <BookModal
                    item={selectedItem}
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedItem(null);
                    }}
                />
            )}
        </>
    );
}