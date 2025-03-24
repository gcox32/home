import PageLayout from '@/components/PageLayout';

export default function Blog() {
  return (
    <PageLayout 
      title="Blog"
      description="Thoughts, tutorials, and technical writings"
    >
      <div className="space-y-8 w-full">
        {/* Blog post previews will go here */}
        <p className="text-gray-600 dark:text-gray-400">Coming soon...</p>
      </div>
    </PageLayout>
  );
}
