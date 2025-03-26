import BasePortfolioCard from './BasePortfolioCard';

export default function MeetHarper() {
    const technologies = [
        'React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL',
        'AWS', 'Stripe', 'SendGrid', 'Twilio'
    ];
    const foregroundImage = 'https://assets.letmedemo.com/public/home/portfolio/harper-hero.png';
    const backgroundImage = 'https://assets.letmedemo.com/public/home/portfolio/harper-hero-color.png';
    const foregroundPositionY = '50px';

    const renderChildren = () => {
        return (
            <>
                <div>
                    <h4 className="mb-2 font-medium text-white">Key Responsibilities</h4>
                    <ul className="space-y-1 text-white list-disc list-inside">
                        <li>Led the development of the client-facing scheduling system</li>
                        <li>Implemented secure payment processing with Stripe integration</li>
                        <li>Built automated email and SMS notification system</li>
                        <li>Optimized database queries and API performance</li>
                        <li>Maintained and scaled AWS infrastructure</li>
                    </ul>
                </div>

                <div>
                    <h4 className="mb-2 font-medium text-white">Impact</h4>
                    <ul className="space-y-1 text-white list-disc list-inside">
                        <li>Reduced scheduling conflicts by 95%</li>
                        <li>Increased client engagement by 60%</li>
                        <li>Automated 80% of administrative tasks</li>
                    </ul>
                </div>
            </>
        )
    }

    return (
        <BasePortfolioCard
            title="MeetHarper.com"
            description="A comprehensive platform for scheduling and managing therapy sessions"
            children={renderChildren()}
            technologies={technologies}
            siteUrl={`https://meetharper.com`}
            backgroundImage={backgroundImage}
            foregroundImage={foregroundImage}
            foregroundPositionY={foregroundPositionY}
            textColor="white"
        />
    );
}