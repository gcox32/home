import PageLayout from '@/components/Layout/PageLayout';

export default function Projects() {
  return (
    <PageLayout 
      title="Projects"
      description="Personal projects and experiments I've built"
    >
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 w-full">
        {/* Project cards will go here */}
        <p className="col-span-full text-[var(--color-muted-foreground)]">Coming soon...</p>
      </div>
    </PageLayout>
  );
}
