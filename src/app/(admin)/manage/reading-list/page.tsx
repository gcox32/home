'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil } from 'lucide-react';
import DeleteButton from '@/components/Common/DeleteButton';
import { listReadingItems, deleteReadingListItem, createReadingListItem, updateReadingListItem } from '@/utils/reading-list';
import { ReadingListItem } from '@/types';
import Skeleton from '@/components/Common/Skeleton';
import Modal from '@/components/Common/Modal';
import ReadingListForm from '@/components/ReadingList/ReadingListForm';
import { useSnackbar } from '@/contexts/SnackbarContext';

export default function ReadingListManagementPage() {
    const [items, setItems] = useState<ReadingListItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<ReadingListItem | undefined>();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState<ReadingListItem[]>([]);
    const { showSnackbar } = useSnackbar();

    useEffect(() => {
        fetchItems();
    }, []);

    useEffect(() => {
        const filtered = items.filter(item => 
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.subtitle && item.subtitle.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setFilteredItems(filtered);
    }, [items, searchTerm]);

    async function fetchItems() {
        try {
            const allItems = await listReadingItems();
            setItems(allItems);
        } catch (error) {
            console.error('Error fetching reading list items:', error);
        } finally {
            setLoading(false);
        }
    }

    async function handleDeleteItem(id: string) {
        try {
            const success = await deleteReadingListItem(id);
            if (success) {
                await fetchItems();
            } else {
                console.error('Failed to delete reading list item');
            }
        } catch (error) {
            console.error('Error deleting reading list item:', error);
        }
    }

    const handleEdit = (item: ReadingListItem) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setSelectedItem(undefined);
        setIsModalOpen(true);
    };

    const handleSubmit = async (data: Omit<ReadingListItem, 'id' | 'createdAt' | 'updatedAt'>) => {
        try {
            if (selectedItem) {
                await updateReadingListItem(selectedItem.id, data);
                showSnackbar('Book updated successfully', 'success');
            } else {
                await createReadingListItem(data);
                showSnackbar('Book added successfully', 'success');
            }
            await fetchItems();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error saving reading list item:', error);
            showSnackbar('Failed to save book', 'error');
        }
    };

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
                <h1 className="m-0 font-semibold text-[var(--color-foreground)] text-3xl">Reading List</h1>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 bg-[var(--color-accent)] px-3 py-1.5 rounded-lg transition-colors text-[var(--color-accent-foreground)] hover:bg-[var(--color-accent-dark)]"
                >
                    <Plus size={20} />
                    Add Book
                </button>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by title or author..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-[var(--color-background)] px-4 py-2 border border-[var(--color-border-base)] rounded-lg focus:outline-none focus:ring-[var(--color-accent)] focus:ring-2 w-full text-[var(--color-foreground)]"
                />
            </div>

            <div className="bg-[var(--color-background)] shadow-sm border border-[var(--color-border-base)] rounded-lg overflow-hidden">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-[var(--color-background-secondary)]">
                            <th className="px-6 py-3 font-medium text-[var(--color-muted-foreground)] text-xs text-left uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 font-medium text-[var(--color-muted-foreground)] text-xs text-left uppercase tracking-wider">Author</th>
                            <th className="px-6 py-3 font-medium text-[var(--color-muted-foreground)] text-xs text-left uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 font-medium text-[var(--color-muted-foreground)] text-xs text-left uppercase tracking-wider">Started</th>
                            <th className="px-6 py-3 font-medium text-[var(--color-muted-foreground)] text-xs text-left uppercase tracking-wider">Finished</th>
                            <th className="px-6 py-3 font-medium text-[var(--color-muted-foreground)] text-xs text-left uppercase tracking-wider">Rating</th>
                            <th className="px-6 py-3 font-medium text-[var(--color-muted-foreground)] text-xs text-center uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-[var(--color-border-base)] divide-y">
                        {filteredItems.map((item) => (
                            <tr key={item.id} className="hover:bg-[var(--color-hover-background)]">
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="text-[var(--color-foreground)]">{item.title}</span>
                                        {item.subtitle && (
                                            <span className="text-[var(--color-muted-foreground)] text-sm italic">
                                                {item.subtitle}
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-[var(--color-muted-foreground)]">{item.author}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full
                    ${item.status === 'read' ? 'bg-[var(--color-success-light)] text-[var(--color-success)]' : ''}
                    ${item.status === 'reading' ? 'bg-[var(--color-warning-light)] text-[var(--color-warning)]' : ''}
                    ${item.status === 'to-be-read' ? 'bg-[var(--color-info-light)] text-[var(--color-info)]' : ''}
                  `}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-[var(--color-muted-foreground)]">
                                    {item.startedAt ? new Date(item.startedAt).toLocaleDateString() : '--'}
                                </td>
                                <td className="px-6 py-4 text-[var(--color-muted-foreground)]">
                                    {item.finishedAt ? new Date(item.finishedAt).toLocaleDateString() : '--'}
                                </td>
                                <td className="px-6 py-4 text-[var(--color-muted-foreground)]">
                                    {item.rating ? `${item.rating}/5` : '--'}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-center items-center gap-3">
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="hover:bg-[var(--color-hover-background)] p-2 rounded-full text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-dark)]"
                                        >
                                            <Pencil size={18} />
                                        </button>
                                        <DeleteButton
                                            onDelete={() => handleDeleteItem(item.id)}
                                            buttonClassName="text-[var(--color-destructive)] hover:text-[var(--color-destructive-foreground)]"
                                            confirmationText="Are you sure you want to delete this reading list item? This action cannot be undone."
                                            iconSize={18}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={selectedItem ? 'Edit Book' : 'Add New Book'}
            >
                <ReadingListForm
                    item={selectedItem}
                    onSubmit={handleSubmit}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
        </div>
    );
}
