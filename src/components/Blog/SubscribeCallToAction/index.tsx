import SubscribeForm from './SubscribeForm';

export default function SubscribeCallToAction({ source }: { source: string }) {
  return (
    <div className="mt-16 p-8 bg-border border border-[var(--color-border-base)] rounded-lg text-center">
      <h2 className="mb-4 font-semibold text-[var(--color-foreground)] text-2xl">
        Stay Updated
      </h2>
      <p className="mb-6 text-[var(--color-muted-foreground)]">
        Want to read more content like this? Stay updated on future posts.
      </p>
      <SubscribeForm source={source} />
    </div>
  );
}
