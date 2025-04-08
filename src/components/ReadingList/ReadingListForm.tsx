'use client';

import { useState, useEffect } from 'react';
import { ReadingListItem } from '@/types';

interface ReadingListFormProps {
    item?: ReadingListItem;
    onSubmit: (data: Omit<ReadingListItem, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
    onCancel: () => void;
}

export default function ReadingListForm({ item, onSubmit, onCancel }: ReadingListFormProps) {
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        author: '',
        status: 'to-be-read',
        description: '',
        url: '',
        authorUrl: '',
        imageSrc: '',
        genre: '',
        review: '',
        rating: 0,
        startedAt: '',
        finishedAt: ''
    });

    useEffect(() => {
        if (item) {
            setFormData({
                title: item.title,
                subtitle: item.subtitle,
                author: item.author,
                status: item.status,
                description: item.description,
                url: item.url,
                authorUrl: item.authorUrl,
                imageSrc: item.imageSrc,
                genre: item.genre,
                review: item.review,
                rating: item.rating,
                startedAt: item.startedAt || '',
                finishedAt: item.finishedAt || ''
            });
        }
    }, [item]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'rating' ? Number(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(formData as Omit<ReadingListItem, 'id' | 'createdAt' | 'updatedAt'>);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <label htmlFor="title" className="font-medium text-sm">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="bg-[var(--color-background)] px-3 py-2 border border-[var(--color-border-base)] rounded-md focus:outline-none focus:ring-[var(--color-accent)] focus:ring-2"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="subtitle" className="font-medium text-sm">Subtitle (optional)</label>
                <input
                    type="text"
                    id="subtitle"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleChange}
                    className="bg-[var(--color-background)] px-3 py-2 border border-[var(--color-border-base)] rounded-md focus:outline-none focus:ring-[var(--color-accent)] focus:ring-2"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="url" className="font-medium text-sm">URL</label>
                <input
                    type="text"
                    id="url"
                    name="url"
                    value={formData.url}
                    onChange={handleChange}
                    className="bg-[var(--color-background)] px-3 py-2 border border-[var(--color-border-base)] rounded-md focus:outline-none focus:ring-[var(--color-accent)] focus:ring-2"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="imageSrc" className="font-medium text-sm">Image Source</label>
                <input
                    type="text"
                    id="imageSrc"
                    name="imageSrc"
                    value={formData.imageSrc}
                    onChange={handleChange}
                    className="bg-[var(--color-background)] px-3 py-2 border border-[var(--color-border-base)] rounded-md focus:outline-none focus:ring-[var(--color-accent)] focus:ring-2"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="author" className="font-medium text-sm">Author</label>
                <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    required
                    className="bg-[var(--color-background)] px-3 py-2 border border-[var(--color-border-base)] rounded-md focus:outline-none focus:ring-[var(--color-accent)] focus:ring-2"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="authorUrl" className="font-medium text-sm">Author URL</label>
                <input
                    type="text"
                    id="authorUrl"
                    name="authorUrl"
                    value={formData.authorUrl}
                    onChange={handleChange}
                    className="bg-[var(--color-background)] px-3 py-2 border border-[var(--color-border-base)] rounded-md focus:outline-none focus:ring-[var(--color-accent)] focus:ring-2"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="status" className="font-medium text-sm">Status</label>
                <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                    className="bg-[var(--color-background)] px-3 py-2 border border-[var(--color-border-base)] rounded-md focus:outline-none focus:ring-[var(--color-accent)] focus:ring-2"
                >
                    <option value="to-be-read">To Be Read</option>
                    <option value="reading">Currently Reading</option>
                    <option value="read">Read</option>
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="genre" className="font-medium text-sm">Genre</label>
                <input
                    type="text"
                    id="genre"
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    required
                    className="bg-[var(--color-background)] px-3 py-2 border border-[var(--color-border-base)] rounded-md focus:outline-none focus:ring-[var(--color-accent)] focus:ring-2"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="description" className="font-medium text-sm">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="bg-[var(--color-background)] px-3 py-2 border border-[var(--color-border-base)] rounded-md focus:outline-none focus:ring-[var(--color-accent)] focus:ring-2"
                />
            </div>

            {formData.status !== 'to-be-read' && (
                <div className="flex flex-col gap-2">
                    <label htmlFor="startedAt" className="font-medium text-sm">Started Reading</label>
                    <input
                        type="date"
                        id="startedAt"
                        name="startedAt"
                        value={formData.startedAt ? formData.startedAt.split('T')[0] : ''}
                        onChange={handleChange}
                        className="bg-[var(--color-background)] px-3 py-2 border border-[var(--color-border-base)] rounded-md focus:outline-none focus:ring-[var(--color-accent)] focus:ring-2"
                    />
                </div>
            )}

            {formData.status === 'read' && (
                <div className="flex flex-col gap-2">
                    <label htmlFor="finishedAt" className="font-medium text-sm">Finished Reading</label>
                    <input
                        type="date"
                        id="finishedAt"
                        name="finishedAt"
                        value={formData.finishedAt ? formData.finishedAt.split('T')[0] : ''}
                        onChange={handleChange}
                        className="bg-[var(--color-background)] px-3 py-2 border border-[var(--color-border-base)] rounded-md focus:outline-none focus:ring-[var(--color-accent)] focus:ring-2"
                    />
                </div>
            )}

            {formData.status === 'read' && (
                <>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="review" className="font-medium text-sm">Review</label>
                        <textarea
                            id="review"
                            name="review"
                            value={formData.review}
                            onChange={handleChange}
                            rows={3}
                            className="bg-[var(--color-background)] px-3 py-2 border border-[var(--color-border-base)] rounded-md focus:outline-none focus:ring-[var(--color-accent)] focus:ring-2"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="rating" className="font-medium text-sm">Rating (1-5)</label>
                        <input
                            type="number"
                            id="rating"
                            name="rating"
                            value={formData.rating}
                            onChange={handleChange}
                            min="1"
                            max="5"
                            className="bg-[var(--color-background)] px-3 py-2 border border-[var(--color-border-base)] rounded-md focus:outline-none focus:ring-[var(--color-accent)] focus:ring-2"
                        />
                    </div>
                </>
            )}

            <div className="flex justify-end gap-4 mt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="hover:bg-[var(--color-hover-background)] px-4 py-2 border border-[var(--color-border-base)] rounded text-sm"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="bg-[var(--color-accent)] px-4 py-2 rounded text-white text-sm hover:bg-[var(--color-accent-dark)]"
                >
                    {item ? 'Update' : 'Add'} Book
                </button>
            </div>
        </form>
    );
}