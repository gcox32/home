'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import CollapsibleSection from '@/components/Common/CollapsibleSection';
import FeaturedImageUpload from '@/components/Blog/FeaturedImageUpload';
import { createBlogPost, createTag, getTagByName, createBlogPostTag } from '@/utils/blog';
import { BlogPostTagFormData } from '@/types';

const Editor = dynamic(() => import('@/components/Blog/Editor'), { ssr: false });

export default function NewBlogPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const tempBlogId = useMemo(() => crypto.randomUUID(), []);
  const [formData, setFormData] = useState<BlogPostTagFormData>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    featuredImageSource: '',
    status: 'draft',
    tags: []
  });
  const [isPostDetailsOpen, setIsPostDetailsOpen] = useState(true);

  const handleSubmit = async (e: React.FormEvent, closeAfterSave: boolean = true) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create the blog post
      const newPost = await createBlogPost({
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        content: formData.content,
        featuredImage: formData.featuredImage,
        featuredImageSource: formData.featuredImageSource,
        status: formData.status,
        publishDate: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString()
      });

      if (!newPost?.id) {
        throw new Error('Failed to create blog post');
      }

      // Handle tags
      const tagPromises = formData.tags.map(async (tagName) => {
        // Check if tag exists
        let tag = await getTagByName(tagName);
        
        if (!tag) {
          // Create new tag if it doesn't exist
          tag = await createTag(tagName, tagName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));

          if (!tag) {
            throw new Error('Failed to create tag');
          }
        }

        // Create the association between blog post and tag
        await createBlogPostTag({
          blogPostId: newPost.id,
          tagId: tag.id
        });
      });

      await Promise.all(tagPromises);
      
      if (closeAfterSave) {
        router.push('/manage/blog');
      } else {
        setLoading(false);
        // Reset form after successful creation if not closing
        setFormData({
          title: '',
          slug: '',
          excerpt: '',
          content: '',
          featuredImage: '',
          featuredImageSource: '',
          status: 'draft',
          tags: []
        });
      }
    } catch (error) {
      console.error('Error creating blog post:', error);
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditorChange = (content: string) => {
    setFormData(prev => ({
      ...prev,
      content
    }));
  };

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setFormData(prev => ({
      ...prev,
      slug
    }));
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === 'Tab' || e.key === ' ' || e.key === ',') && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()]
        }));
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <div className="mx-auto p-6 max-w-7xl">
      <h1 className="mb-6 font-semibold text-2xl">Create New Blog Post</h1>
      <form onSubmit={(e) => handleSubmit(e, true)} className="flex flex-col gap-6">
        <CollapsibleSection title="Post Details" defaultExpanded={true} onExpandedChange={setIsPostDetailsOpen}>
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="font-medium text-sm">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              onBlur={generateSlug}
              required
              className="bg-[var(--color-background)] px-3 py-2 border border-[var(--color-border-base)] rounded-md focus:outline-none focus:ring-[var(--color-accent)] focus:ring-2 text-[var(--color-foreground)]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="slug" className="font-medium text-foreground text-sm">Slug</label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              className="bg-[var(--color-background)] px-3 py-2 border border-[var(--color-border-base)] rounded-md focus:outline-none focus:ring-[var(--color-accent)] focus:ring-2 text-[var(--color-foreground)]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="excerpt" className="font-medium text-foreground text-sm">Excerpt</label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              required
              rows={3}
              className="bg-[var(--color-background)] px-3 py-2 border border-[var(--color-border-base)] rounded-md focus:outline-none focus:ring-[var(--color-accent)] focus:ring-2 text-[var(--color-foreground)]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="status" className="font-medium text-foreground text-sm">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="bg-[var(--color-background)] px-3 py-2 border border-[var(--color-border-base)] rounded-md focus:outline-none focus:ring-[var(--color-accent)] focus:ring-2 text-[var(--color-foreground)]"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <FeaturedImageUpload
            value={formData.featuredImage}
            onChange={(url) => setFormData({ ...formData, featuredImage: url })}
            blogId={tempBlogId}
            slug={formData.slug}
            source={formData.featuredImageSource}
            onSourceChange={(source) => setFormData({ ...formData, featuredImageSource: source })}
          />

          <div className="flex flex-col gap-2">
            <label htmlFor="tags" className="font-medium text-foreground text-sm">Tags</label>
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap gap-2">
                {formData.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center gap-1 bg-accent px-2 py-1 rounded-full text-white text-sm">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:opacity-80 transition-opacity"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Type a tag and press Enter, Space, or Comma"
                className="bg-[var(--color-background)] px-3 py-2 border border-[var(--color-border-base)] rounded-md focus:outline-none focus:ring-[var(--color-accent)] focus:ring-2 text-[var(--color-foreground)]"
              />
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Content" defaultExpanded={true} onExpandedChange={setIsPostDetailsOpen}>
          <div className="flex flex-col gap-2">
            <Editor
              value={formData.content}
              onChange={handleEditorChange}
              blogId={tempBlogId}
              slug={formData.slug}
              postDetailsExpanded={isPostDetailsOpen}
            />
          </div>
        </CollapsibleSection>

        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => router.push('/manage/blog')}
            className="hover:bg-[var(--color-hover-background)] px-4 py-2 border border-[var(--color-border-base)] rounded-md text-[var(--color-foreground)] text-sm transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={(e) => handleSubmit(e, false)}
            disabled={loading}
            className="bg-[var(--color-background-secondary)] hover:bg-[var(--color-background-soft)] disabled:opacity-50 px-4 py-2 border border-[var(--color-border-base)] rounded text-[var(--color-foreground)] text-sm transition-colors cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Post'}
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-[var(--color-accent)] disabled:opacity-50 px-4 py-2 rounded-md text-sm transition-colors text-[var(--color-accent-foreground)] hover:bg-[var(--color-accent-dark)] cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create & Close'}
          </button>
        </div>
      </form>
    </div>
  );
} 