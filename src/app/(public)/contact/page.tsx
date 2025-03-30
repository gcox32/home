import PageLayout from '@/components/Layout/PageLayout';

export default function Contact() {
  const email = 'grant@letmedemo.com';
  return (
    <PageLayout
      title=""
      description="Get in touch"
      align="center"
    >
      <div className="space-y-6 mx-auto w-[220px]">
        <a
          href={`mailto:${email}`}
          className="block hover:bg-[var(--color-hover-background)] px-4 py-3 border bg-[var(--color-border-base)] border-[var(--color-border-base)] rounded-lg text-[var(--color-foreground)] text-center transition-colors"
        >
          {email}
        </a>
      </div>
    </PageLayout>
  );
}
