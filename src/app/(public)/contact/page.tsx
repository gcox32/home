import PageLayout from '@/components/Layout/PageLayout';
import ContactForm from '@/components/Contact/ContactForm';

export default function Contact() {
  const email = 'grant@letmedemo.com';
  
  return (
    <PageLayout
      title="Contact"
      description="Get in touch"
      align="center"
      textAlign="center"
    >
      <div className="space-y-12">
        {/* Contact Form Section */}
        <div className="mx-auto w-full max-w-md">
          <ContactForm />
        </div>

        {/* Direct Email Section */}
        <div className="mx-auto w-full max-w-md text-center">
          <div className="pt-8 border-t border-[var(--color-border-base)]">
            <h2 className="mb-4 font-medium text-lg">Or email me directly</h2>
            <a
              href={`mailto:${email}`}
              className="inline-block bg-[var(--color-background)] hover:bg-[var(--color-hover-background)] px-4 py-3 border border-[var(--color-border-base)] rounded-lg text-[var(--color-foreground)] transition-colors"
            >
              {email}
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
