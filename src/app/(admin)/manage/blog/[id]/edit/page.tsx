'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Skeleton from '@/components/Common/Skeleton';
import CollapsibleSection from '@/components/Common/CollapsibleSection';
import FeaturedImageUpload from '@/components/Blog/FeaturedImageUpload';
import { getBlogPost, updateBlogPost, getPostTags, createTag, getTagByName, createBlogPostTag } from '@/utils/blog';
import { BlogPostTagFormData } from '@/types';

const Editor = dynamic(() => import('@/components/Blog/Editor'), { ssr: false });

export default function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tagInput, setTagInput] = useState('');
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

  useEffect(() => {
    async function fetchPost() {
      try {
        const post = await getBlogPost(resolvedParams.id);

        if (!post) {
          throw new Error('Post not found');
        }

        // Fetch associated tags
        const tags = await getPostTags(resolvedParams.id);
        const tagNames = tags.map(tag => tag.name);

        setFormData({
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          featuredImage: post.featuredImage,
          featuredImageSource: post.featuredImageSource,
          status: post.status,
          tags: tagNames
        });
      } catch (error) {
        console.error('Error fetching blog post:', error);
        router.push('/manage/blog');
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [resolvedParams.id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Update the blog post
      const updatedPost = await updateBlogPost(resolvedParams.id, {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        content: formData.content,
        featuredImage: formData.featuredImage,
        featuredImageSource: formData.featuredImageSource,
        status: formData.status
      });

      if (!updatedPost) {
        throw new Error('Failed to update blog post');
      }

      // Fetch current tags to compare with new tags
      const currentTags = await getPostTags(resolvedParams.id);
      const currentTagNames = new Set(currentTags.map(tag => tag.name));

      // Add tags that are new
      const tagsToAdd = formData.tags.filter(tagName => !currentTagNames.has(tagName));

      // Handle new tags
      const tagPromises = tagsToAdd.map(async (tagName) => {
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
          blogPostId: resolvedParams.id,
          tagId: tag.id
        });
      });

      await Promise.all(tagPromises);
      router.push('/manage/blog');
    } catch (error) {
      console.error('Error updating blog post:', error);
      setSaving(false);
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

  if (loading) {
    return (
      <div className="mx-auto p-6 max-w-4xl">
        <Skeleton variant="single"/>
      </div>
    );
  }

  return (
    <div className="mx-auto p-6 max-w-4xl">
      <h1 className="mb-6 font-semibold text-foreground text-2xl">Edit Blog Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <CollapsibleSection title="Post Details">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="font-medium text-foreground text-sm">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              onBlur={generateSlug}
              required
              className="bg-background px-3 py-2 border focus:border-accent border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
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
              className="bg-background px-3 py-2 border focus:border-accent border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
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
              className="bg-background px-3 py-2 border focus:border-accent border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
            />
          </div>

          <div className="flex flex-col gap-2">
            <FeaturedImageUpload
              value={formData.featuredImage}
              onChange={(url) => setFormData(prev => ({ ...prev, featuredImage: url }))}
              blogId={resolvedParams.id}
              slug={formData.slug}
              source={formData.featuredImageSource}
              onSourceChange={(source) => setFormData(prev => ({ ...prev, featuredImageSource: source }))}
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
              className="bg-background px-3 py-2 border focus:border-accent border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>

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
                className="bg-background px-3 py-2 border focus:border-accent border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
              />
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Content">
          <div className="flex flex-col gap-2">
            <Editor
              value={formData.content}
              onChange={handleEditorChange}
              blogId={resolvedParams.id}
            />
          </div>
        </CollapsibleSection>

        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="hover:bg-black/[.05] dark:hover:bg-white/[.06] px-4 py-2 border border-accent rounded hover:text-white text-sm transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="hover:bg-black/[.05] dark:hover:bg-white/[.06] disabled:opacity-50 px-4 py-2 border border-accent rounded hover:text-white text-sm transition-colors cursor-pointer disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
} 