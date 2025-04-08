'use client';

import { useState } from 'react';
import { useSnackbar } from '@/contexts/SnackbarContext';
import LoadingSpinner from '@/components/Common/LoadingSpinner';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const { showSnackbar } = useSnackbar();
    const [errors, setErrors] = useState<{
        name?: string;
        email?: string;
        message?: string;
    }>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            showSnackbar('Please fix the form errors', 'error');
            return;
        }
        
        setStatus('loading');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.errors && Array.isArray(data.errors)) {
                    // Map server errors to form fields if possible
                    const newErrors: typeof errors = {};
                    data.errors.forEach((error: string) => {
                        if (error.toLowerCase().includes('name')) {
                            newErrors.name = error;
                        } else if (error.toLowerCase().includes('email')) {
                            newErrors.email = error;
                        } else if (error.toLowerCase().includes('message')) {
                            newErrors.message = error;
                        }
                    });
                    setErrors(newErrors);
                    showSnackbar('Please fix the form errors', 'error');
                } else {
                    throw new Error(data.message || 'Failed to send message');
                }
                setStatus('error');
                return;
            }

            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setErrors({});
            showSnackbar('Message sent successfully!', 'success');
        } catch (error) {
            console.error('Contact form error:', error);
            setStatus('error');
            showSnackbar('Failed to send message. Please try again.', 'error');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateName = (name: string): boolean => {
        return name.trim().length >= 2 && name.trim().length <= 100;
    };

    const validateMessage = (message: string): boolean => {
        return message.trim().length >= 10 && message.trim().length <= 5000;
    };

    const validateForm = (): boolean => {
        const newErrors: typeof errors = {};

        if (!validateName(formData.name)) {
            newErrors.name = 'Name must be between 2 and 100 characters';
        }

        if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!validateMessage(formData.message)) {
            newErrors.message = 'Message must be between 10 and 5000 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block mb-1 font-medium text-sm">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`bg-[var(--color-background)] px-4 py-2 border ${errors.name ? 'border-[var(--color-destructive)]' : 'border-[var(--color-border-base)]'} rounded-lg focus:outline-none focus:ring-[var(--color-accent)] focus:ring-2 w-full`}
                />
                {errors.name && (
                    <p className="mt-1 text-[var(--color-destructive)] text-sm">{errors.name}</p>
                )}
            </div>

            <div>
                <label htmlFor="email" className="block mb-1 font-medium text-sm">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`bg-[var(--color-background)] px-4 py-2 border ${errors.email ? 'border-[var(--color-destructive)]' : 'border-[var(--color-border-base)]'} rounded-lg focus:outline-none focus:ring-[var(--color-accent)] focus:ring-2 w-full`}
                />
                {errors.email && (
                    <p className="mt-1 text-[var(--color-destructive)] text-sm">{errors.email}</p>
                )}
            </div>

            <div>
                <label htmlFor="message" className="block mb-1 font-medium text-sm">
                    Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={`bg-[var(--color-background)] px-4 py-2 border ${errors.message ? 'border-[var(--color-destructive)]' : 'border-[var(--color-border-base)]'} rounded-lg focus:outline-none focus:ring-[var(--color-accent)] focus:ring-2 w-full`}
                />
                {errors.message && (
                    <p className="mt-1 text-[var(--color-destructive)] text-sm">{errors.message}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-[var(--color-accent)] disabled:opacity-50 px-4 py-2 rounded-lg w-full transition-colors text-[var(--color-accent-foreground)] hover:bg-[var(--color-accent-dark)] cursor-pointer"
            >
                {status === 'loading' ? <LoadingSpinner /> : 'Send Message'}
            </button>
        </form>
    );
} 