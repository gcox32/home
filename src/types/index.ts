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
    createdAt: string;
    updatedAt: string;
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

export interface BlogSubscriber {
    email: string;
    subscribedAt: string;
    source: string;
}

export interface ReadingListItem {
    id: string;
    title: string;
    subtitle: string;
    url: string;
    author: string;
    authorUrl: string;
    status: 'read' | 'reading' | 'to-be-read';
    description: string;
    imageSrc: string;
    genre: string;
    review: string;
    rating: number; // 1-5
    startedAt: string;
    finishedAt: string;
    createdAt: string;
    updatedAt: string;

}