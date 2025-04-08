'use client';

import { ReadingListItem } from '@/types';
import Modal from '@/components/Common/Modal';
import { Book, Calendar, Star, ExternalLink } from 'lucide-react';

interface BookModalProps {
    item: ReadingListItem;
    isOpen: boolean;
    onClose: () => void;
}

export default function BookModal({ item, isOpen, onClose }: BookModalProps) {
    const renderTitleSubtitle = () => {
        return (
            <div className="flex flex-col items-start gap-2">
                <span className="text-[var(--color-foreground)]">{item.title}</span>
                <span className="text-[var(--color-muted-foreground)] text-sm italic">{item.subtitle}</span>
            </div>
        );
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={renderTitleSubtitle()}
        >
            <div className="space-y-6">

                <div className="flex items-center gap-2">
                    <Book size={18} className="text-[var(--color-accent)]" />
                    <span className="text-[var(--color-foreground)]">
                        by{' '}
                        {item.authorUrl ? (
                            <a
                                href={item.authorUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-[var(--color-accent)] transition-colors"
                            >
                                {item.author}
                            </a>
                        ) : (
                            item.author
                        )}
                    </span>
                </div>

                {item.description && (
                    <p className="text-[var(--color-foreground)]">{item.description}</p>
                )}

                <div className="flex justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <Calendar size={18} className="text-[var(--color-accent)]" />
                        <span className="text-[var(--color-foreground)]">
                            {item.startedAt ? `Started: ${new Date(item.startedAt).toLocaleDateString()}` : 'Not started yet'}
                        </span>
                    </div>
                    {item.finishedAt && (
                        <div className="flex items-center gap-2">
                            <Calendar size={18} className="text-[var(--color-accent)]" />
                            <span className="text-[var(--color-foreground)]">
                                Finished: {new Date(item.finishedAt).toLocaleDateString()}
                            </span>
                        </div>
                    )}
                </div>

                {item.rating > 0 && (
                    <div className="flex justify-center items-center gap-2">
                        {Array.from({ length: item.rating }, (_, index) => (
                            <Star key={index} size={18} className="fill-[var(--color-accent)] text-[var(--color-accent)]" />
                        ))}
                    </div>
                )}

                {item.review && (
                    <div className="pt-4 border-t border-[var(--color-border-base)]">
                        <h3 className="mb-2 font-medium text-[var(--color-foreground)]">Review</h3>
                        <p className="text-[var(--color-muted-foreground)]">{item.review}</p>
                    </div>
                )}

                {item.url && (
                    <div className="flex justify-end mt-0">
                        <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[var(--color-accent)] px-4 py-2 rounded text-white transition-colors hover:bg-[var(--color-accent-dark)]"
                        >
                            <ExternalLink size={16} />
                        </a>
                    </div>
                )}
            </div>
        </Modal>
    );
}