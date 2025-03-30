import { ExternalLink } from 'lucide-react';

export default function VisitButton({ siteUrl }: { siteUrl: string }) {
    return (
        <a
            href={siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-[var(--color-background-secondary)] hover:bg-[var(--color-hover-background)] px-3 py-1.5 rounded-lg hover:text-primary transition-colors"
            style={{ color: 'var(--text-white)' }}
        >
            <ExternalLink size={16} />
        </a>
    );
}