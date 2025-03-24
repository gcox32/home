import PageLayout from '@/components/PageLayout';
import Link from 'next/link';

export default function Portfolio() {
  return (
    <PageLayout 
      title="Portfolio"
      description="A collection of my professional work and experiences"
    >
      <div className="space-y-8 w-full">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-2xl">Professional Experience</h2>
          <Link 
            href="/resume.pdf" 
            className="text-primary hover:underline"
            target="_blank"
          >
            View Resume
          </Link>
        </div>
        <div className="space-y-6">
          {/* Add your portfolio items here */}
          <p className="text-gray-600 dark:text-gray-400">Coming soon...</p>
        </div>
      </div>
    </PageLayout>
  );
}
