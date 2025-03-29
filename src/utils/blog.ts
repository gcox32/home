import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { 
  DynamoDBDocumentClient, 
  GetCommand,
  PutCommand,
  QueryCommand,
  ScanCommand,
  UpdateCommand,
  DeleteCommand
} from '@aws-sdk/lib-dynamodb';
import { BlogPost, BlogTag, BlogPostTag } from '@/types';
import { deleteS3FolderContents } from '@/utils/s3';

// Configure AWS
const client = new DynamoDBClient({
  region: process.env.BLOG_REGION,
  credentials: {
    accessKeyId: process.env.ADMIN_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.ADMIN_SECRET_ACCESS_KEY || ''
  }
});

const dynamoDB = DynamoDBDocumentClient.from(client);

const BLOG_POST_TABLE = process.env.BLOG_POST_TABLE || '';
const BLOG_TAG_TABLE = process.env.BLOG_TAG_TABLE || '';
const BLOG_POST_TAG_TABLE = process.env.BLOG_POST_TAG_TABLE || '';

// Blog Post Operations
export async function getBlogPost(id: string): Promise<BlogPost | null> {
  const params = {
    TableName: BLOG_POST_TABLE,
    Key: { id }
  };

  try {
    const result = await dynamoDB.send(new GetCommand(params));
    return result.Item as BlogPost || null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function listBlogPosts(status?: 'draft' | 'published' | 'archived'): Promise<BlogPost[]> {
  const params: any = {
    TableName: BLOG_POST_TABLE
  };

  if (status) {
    params.FilterExpression = '#status = :status';
    params.ExpressionAttributeNames = { '#status': 'status' };
    params.ExpressionAttributeValues = { ':status': status };
  }

  try {
    const result = await dynamoDB.send(new ScanCommand(params));
    return (result.Items || []) as BlogPost[];
  } catch (error) {
    console.error('Error listing blog posts:', error);
    return [];
  }
}

export async function createBlogPost(post: Omit<BlogPost, 'id'>): Promise<BlogPost | null> {
  const id = crypto.randomUUID();
  const newPost: BlogPost = {
    ...post,
    id,
    publishDate: post.publishDate || new Date().toISOString()
  };

  const params = {
    TableName: BLOG_POST_TABLE,
    Item: newPost
  };

  try {
    await dynamoDB.send(new PutCommand(params));
    return newPost;
  } catch (error) {
    console.error('Error creating blog post:', error);
    return null;
  }
}

export async function updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
  const updateExpressions: string[] = [];
  const expressionAttributeNames: { [key: string]: string } = {};
  const expressionAttributeValues: { [key: string]: any } = {};

  Object.entries(updates).forEach(([key, value]) => {
    if (key !== 'id') {
      updateExpressions.push(`#${key} = :${key}`);
      expressionAttributeNames[`#${key}`] = key;
      expressionAttributeValues[`:${key}`] = value;
    }
  });

  const params = {
    TableName: BLOG_POST_TABLE,
    Key: { id },
    UpdateExpression: `SET ${updateExpressions.join(', ')}`,
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: 'ALL_NEW' as const
  };

  try {
    const result = await dynamoDB.send(new UpdateCommand(params));
    return result.Attributes as BlogPost || null;
  } catch (error) {
    console.error('Error updating blog post:', error);
    return null;
  }
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  try {
    // First get the post to get the slug (needed for S3 cleanup)
    const post = await getBlogPost(id);
    if (!post) {
      return false;
    }

    // Delete all associated images from S3
    const s3Prefix = `public/blog/${post.slug}/`;
    await deleteS3FolderContents(s3Prefix);

    // Delete all associated tag relationships
    const params = {
      TableName: BLOG_POST_TAG_TABLE,
      IndexName: 'blogPostId-index',
      KeyConditionExpression: 'blogPostId = :blogPostId',
      ExpressionAttributeValues: {
        ':blogPostId': id
      }
    };

    // Get all associations
    const result = await dynamoDB.send(new QueryCommand(params));
    const associations = result.Items as BlogPostTag[];

    // Delete each association
    const deletePromises = associations.map(assoc => 
      dynamoDB.send(new DeleteCommand({
        TableName: BLOG_POST_TAG_TABLE,
        Key: { id: assoc.id }
      }))
    );

    // Wait for all deletions to complete
    await Promise.all(deletePromises);

    // Finally delete the blog post itself
    await dynamoDB.send(new DeleteCommand({
      TableName: BLOG_POST_TABLE,
      Key: { id }
    }));

    return true;
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return false;
  }
}

// Tag Operations
export async function createTag(name: string, slug: string): Promise<BlogTag | null> {
  const id = crypto.randomUUID();
  const newTag: BlogTag = {
    id,
    name,
    slug
  };

  const params = {
    TableName: BLOG_TAG_TABLE,
    Item: newTag
  };

  try {
    await dynamoDB.send(new PutCommand(params));
    return newTag;
  } catch (error) {
    console.error('Error creating tag:', error);
    return null;
  }
}

export async function getTagBySlug(slug: string): Promise<BlogTag | null> {
  const params = {
    TableName: BLOG_TAG_TABLE,
    IndexName: 'slug-index',
    KeyConditionExpression: 'slug = :slug',
    ExpressionAttributeValues: {
      ':slug': slug
    }
  };

  try {
    const result = await dynamoDB.send(new QueryCommand(params));
    return (result.Items?.[0] as BlogTag) || null;
  } catch (error) {
    console.error('Error fetching tag by slug:', error);
    return null;
  }
}

export async function getTagByName(name: string): Promise<BlogTag | null> {
  const params = {
    TableName: BLOG_TAG_TABLE,
    IndexName: 'name-index',
    KeyConditionExpression: '#tagName = :tagName',
    ExpressionAttributeNames: {
      '#tagName': 'name'
    },
    ExpressionAttributeValues: {
      ':tagName': name
    }
  };

  try {
    const result = await dynamoDB.send(new QueryCommand(params));
    return (result.Items?.[0] as BlogTag) || null;
  } catch (error) {
    console.error('Error fetching tag by name:', error);
    return null;
  }
}

// Blog Post Tag Operations
export async function associatePostWithTag(blogPostId: string, blogTagId: string): Promise<BlogPostTag | null> {
  const id = crypto.randomUUID();
  const association: BlogPostTag = {
    id,
    blogPostId,
    blogTagId
  };

  const params = {
    TableName: BLOG_POST_TAG_TABLE,
    Item: association
  };

  try {
    await dynamoDB.send(new PutCommand(params));
    return association;
  } catch (error) {
    console.error('Error associating post with tag:', error);
    return null;
  }
}

export async function getPostTags(blogPostId: string): Promise<BlogTag[]> {
  const params = {
    TableName: BLOG_POST_TAG_TABLE,
    IndexName: 'blogPostId-index',
    KeyConditionExpression: 'blogPostId = :blogPostId',
    ExpressionAttributeValues: {
      ':blogPostId': blogPostId
    }
  };

  try {
    const result = await dynamoDB.send(new QueryCommand(params));
    const associations = result.Items as BlogPostTag[];
    
    // Fetch all tags
    const tagPromises = associations.map(assoc => 
      dynamoDB.send(new GetCommand({
        TableName: BLOG_TAG_TABLE,
        Key: { id: assoc.blogTagId }
      }))
    );

    const tagResults = await Promise.all(tagPromises);
    return tagResults
      .map(result => result.Item as BlogTag)
      .filter(tag => tag !== null);
  } catch (error) {
    console.error('Error fetching post tags:', error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const params = {
    TableName: BLOG_POST_TABLE,
    IndexName: 'slug-index',
    KeyConditionExpression: 'slug = :slug',
    ExpressionAttributeValues: {
      ':slug': slug
    }
  };

  try {
    const result = await dynamoDB.send(new QueryCommand(params));
    return (result.Items?.[0] as BlogPost) || null;
  } catch (error) {
    console.error('Error fetching blog post by slug:', error);
    return null;
  }
}

export async function createBlogPostTag(params: { blogPostId: string; tagId: string }): Promise<BlogPostTag | null> {
  const id = crypto.randomUUID();
  const association: BlogPostTag = {
    id,
    blogPostId: params.blogPostId,
    blogTagId: params.tagId
  };

  const dbParams = {
    TableName: BLOG_POST_TAG_TABLE,
    Item: association
  };

  try {
    await dynamoDB.send(new PutCommand(dbParams));
    return association;
  } catch (error) {
    console.error('Error creating blog post tag association:', error);
    return null;
  }
}

export async function getBlogPostsByTagId(tagId: string): Promise<BlogPost[]> {
  try {
    // Query the bridge table to get blog post IDs
    const params = {
      TableName: BLOG_POST_TAG_TABLE,
      IndexName: 'blogTagId-index',
      KeyConditionExpression: 'blogTagId = :tagId',
      ExpressionAttributeValues: {
        ':tagId': tagId
      }
    };

    const result = await dynamoDB.send(new QueryCommand(params));
    const postIds = (result.Items || []).map(item => item.blogPostId);

    if (postIds.length === 0) {
      return [];
    }

    // Fetch all posts in parallel
    const postsPromises = postIds.map(id => getBlogPost(id));
    const postsResponses = await Promise.all(postsPromises);

    // Filter out null responses and unpublished posts
    return postsResponses
      .filter((post): post is BlogPost => 
        post !== null && post.status === 'published'
      )
      .sort((a, b) => 
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      );
  } catch (error) {
    console.error('Error fetching blog posts by tag:', error);
    return [];
  }
}
