import TechnologyBadge from './TechnologyBadge';
import VisitButton from './VisitButton';
interface BasePortfolioCardProps {
    title: string;
    description: string;
    children?: React.ReactNode;
    technologies: string[];
    siteUrl: string;
    backgroundImage: string;
    backgroundPosition?: string;
    backgroundColor?: string;
    foregroundImage?: string | null;
    foregroundPosition?: string | undefined;
    textColor?: string;
}

export default function BasePortfolioCard({ title, description, children, technologies, siteUrl, backgroundImage, backgroundPosition, backgroundColor = undefined, foregroundImage = null, foregroundPosition, textColor = 'var(--text-white)' }: BasePortfolioCardProps) {

    return (
        <div className="relative space-y-6 md:bg-[image:var(--bg-image)] bg-none p-6 border rounded-lg" style={{
            '--bg-image': `url(${backgroundImage})`,
            backgroundPosition: backgroundPosition,
            backgroundColor: backgroundColor
        } as React.CSSProperties}>
            {foregroundImage && (
                <div
                    className="hidden md:block absolute inset-0 md:bg-[image:var(--fg-image)] bg-no-repeat pointer-events-none"
                    style={{
                        '--fg-image': `url(${foregroundImage})`,
                        backgroundPosition: foregroundPosition
                    } as React.CSSProperties}
                />
            )}
            <div className="relative">
                <div className="flex justify-between items-start gap-4">
                    <div>
                        <h3 className="mb-2 font-semibold text-xl" style={{ color: textColor }}>{title}</h3>
                        <p style={{ color: textColor }}>
                            {description}
                        </p>
                    </div>
                    <VisitButton siteUrl={siteUrl} />
                </div>

                <div className="space-y-4">
                    {children}

                    <div>
                        <h4 className="mb-2 font-medium" style={{ color: textColor }}>Technologies Used</h4>
                        <div className="flex flex-wrap gap-2">
                            {technologies.map((tech) => (
                                <TechnologyBadge key={tech} name={tech} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}