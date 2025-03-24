import PageLayout from '@/components/PageLayout';

export default function Contact() {
  return (
    <PageLayout 
      title="Contact"
      description="Get in touch with me"
    >
      <div className="space-y-6 mx-auto w-full max-w-lg">
        <a
          href="mailto:your.email@example.com"
          className="block bg-primary hover:bg-primary/90 px-4 py-3 rounded-lg w-full text-white text-center transition-colors"
        >
          Send me an email
        </a>
      </div>
    </PageLayout>
  );
}
