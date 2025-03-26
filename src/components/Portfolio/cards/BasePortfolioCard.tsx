import TechnologyBadge from './TechnologyBadge';
import VisitButton from './VisitButton';
interface BasePortfolioCardProps {
    title: string;
    description: string;
    children: React.ReactNode;
    technologies: string[];
    siteUrl: string;
    backgroundImage: string;
    backgroundPosition?: string;
    backgroundColor?: string;
    foregroundImage?: string | null;
    foregroundPositionY?: string | undefined;
    textColor?: string;
}

export default function BasePortfolioCard({ title, description, children, technologies, siteUrl, backgroundImage, backgroundPosition = 'right', backgroundColor = undefined, foregroundImage = null, foregroundPositionY = undefined, textColor = 'var(--text-white)' }: BasePortfolioCardProps) {

    return (
        <div className="relative space-y-6 p-6 border rounded-lg" style={{ backgroundImage: `url(${backgroundImage})`, backgroundPosition: backgroundPosition, backgroundColor: backgroundColor }}>
            {foregroundImage && (
                <div 
                    className="absolute inset-0 bg-contain bg-no-repeat bg-right pointer-events-none" 
                    style={{ backgroundImage: `url(${foregroundImage})`, backgroundPositionY: foregroundPositionY }}
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