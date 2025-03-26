export default function VisitButton({ siteUrl }: { siteUrl: string }) {
    return (
        <a
            href={siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black/[.25] hover:bg-black/[.5] dark:bg-white/[.3] dark:hover:bg-white/[.6] px-3 py-1.5 rounded-lg hover:text-primary transition-colors"
            style={{ color: 'var(--text-white)' }}
        >
            Visit
        </a>
    );
}