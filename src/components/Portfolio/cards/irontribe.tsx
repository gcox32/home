import BasePortfolioCard from './BasePortfolioCard';

export default function IronTribe() {

  const technologies = [
    'React', 'TypeScript', 'Node.js', 'Express', 'MySQL',
    'AWS', 'Stripe', 'Mailchimp', 'Twilio'
  ];

  const backgroundImage = 'https://assets.letmedemo.com/public/home/portfolio/itf-hero-lines.png';
  const backgroundColor = '#000000';

  const renderChildren = () => {
    return (
      <>
        <div>
          <h4 className="mb-2 font-medium" style={{ color: 'var(--text-white)' }}>Key Responsibilities</h4>
          <ul className="space-y-1 list-disc list-inside" style={{ color: 'var(--text-white)' }}>
            <li>Developed member portal and class scheduling system</li>
            <li>Built automated billing and payment processing</li>
            <li>Created performance tracking and analytics dashboard</li>
            <li>Implemented automated marketing campaigns</li>
            <li>Integrated with wearable fitness devices</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-2 font-medium" style={{ color: 'var(--text-white)' }}>Impact</h4>
          <ul className="space-y-1 list-disc list-inside" style={{ color: 'var(--text-white)' }}>
            <li>Increased member retention by 35%</li>
            <li>Reduced administrative workload by 50%</li>
            <li>Improved class attendance by 40%</li>
          </ul>
        </div>
      </>
    )
  }

  return (
    <BasePortfolioCard
      title="Iron Tribe Fitness"
      description="A comprehensive gym management and member engagement platform"
      children={renderChildren()}
      technologies={technologies}
      siteUrl={`https://irontribe.com`}
      backgroundImage={backgroundImage}
      backgroundColor={backgroundColor}
    />
  );
}