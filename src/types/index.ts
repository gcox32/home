export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    status: 'draft' | 'published' | 'archived';
    featuredImage: string;
    featuredImageSource: string;
    publishDate: string;
}

export interface BlogTag {
    id: string;
    name: string;
    slug: string;
}

// many-to-many bridge table
export interface BlogPostTag {
    id: string;
    blogPostId: string;
    blogTagId: string;
}

export interface BlogPostTagFormData {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featuredImage: string;
    featuredImageSource: string;
    status: 'draft' | 'published' | 'archived';
    tags: string[];
}