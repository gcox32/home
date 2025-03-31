import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import UnauthorizedPost from './unauthorized-post';
import { getPostTags, getBlogPostBySlug } from '@/utils/blog';
import SubscribeCallToAction from '@/components/Blog/SubscribeCallToAction';
import { calculateReadTime } from '@/utils/readTime';

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.'
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishDate,
      images: post.featuredImage ? [
        {
          url: post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : [],
    },
    twitter: {
      card: post.featuredImage ? 'summary_large_image' : 'summary',
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : [],
    }
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const matchingPost = await getBlogPostBySlug(params.slug);

  if (!matchingPost) {
    notFound();
  }

  if (matchingPost.status !== 'published') {
    return <UnauthorizedPost status={matchingPost.status} />;
  }

  const tags = await getPostTags(matchingPost.id);

  return (
    <div className="mx-auto px-6 py-12 max-w-7xl">
      <article>
        <header className="mb-8">
          <h1 className="mb-4 font-bold text-foreground text-4xl">{matchingPost.title}</h1>
          <div className="flex items-center gap-4 mb-4 text-muted-foreground text-sm">
            <time dateTime={matchingPost.publishDate}>
              {new Date(matchingPost.publishDate).toLocaleDateString()}
            </time>
            <span>•</span>
            <span>{calculateReadTime(matchingPost.content, matchingPost.featuredImage ? 1 : 0)} min read</span>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link
                  key={tag.id}
                  href={`/blog/tags/${tag.slug}`}
                  className="bg-accent/10 hover:bg-accent px-3 py-1 rounded-full text-accent text-sm transition-colors hover:text-accent-foreground"
                >
                  {tag.name}
                </Link>
              ))}
            </div>
          )}
        </header>

        {matchingPost.featuredImage && (
          <>
            <div className="relative mb-1 rounded-lg w-full aspect-[16/9] overflow-hidden">
              <Image
                src={matchingPost.featuredImage}
                alt={matchingPost.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                className="object-cover"
              />
            </div>
            {matchingPost.featuredImageSource && (
              <p className="mb-4 ml-2 text-foreground text-sm italic">
                {matchingPost.featuredImageSource}
              </p>
            )}
          </>
        )}

        <div
          className="[&>code]:bg-[var(--color-prose-code-bg)] [&>pre]:bg-[var(--color-prose-code-bg)] [&>blockquote]:border-[var(--color-prose-quote-borders)] max-w-none [&>*]:text-[var(--color-prose-text)] [&>a]:text-[var(--color-prose-links)] [&>blockquote]:text-[var(--color-prose-quotes)] [&>code]:text-[var(--color-prose-code)] [&>h1]:text-[var(--color-prose-headings)] [&>h2]:text-[var(--color-prose-headings)] [&>h3]:text-[var(--color-prose-headings)] [&>h4]:text-[var(--color-prose-headings)] [&>strong]:text-[var(--color-prose-bold)] prose"
          dangerouslySetInnerHTML={{ __html: matchingPost.content }}
        />
        <SubscribeCallToAction source={matchingPost.slug} />
      </article>
    </div>
  );
}
