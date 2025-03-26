import BasePortfolioCard from './basePortfolioCard';

export default function FiberHomes() {
  const technologies = [
    'React', 'TypeScript', 'Node.js', 'Express', 'MongoDB',
    'AWS', 'Stripe', 'HubSpot', 'Google Maps API'
  ];


  const backgroundImage = 'https://assets.letmedemo.com/public/home/portfolio/fiberhomes-hero.png';
  const backgroundPosition = 'bottom';

  const renderChildren = () => {
    return (
      <>
        <div>
          <h4 className="mb-2 font-medium" style={{ color: 'var(--text-white)' }}>Key Responsibilities</h4>
          <ul className="space-y-1 list-disc list-inside" style={{ color: 'var(--text-white)' }}>
            <li>Developed and maintained the core mapping interface</li>
            <li>Built custom data visualization tools for network analytics</li>
            <li>Implemented real-time updates for field operations</li>
            <li>Created automated reporting and analytics dashboard</li>
            <li>Integrated with third-party APIs for data enrichment</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-2 font-medium" style={{ color: 'var(--text-white)' }}>Impact</h4>
          <ul className="space-y-1 list-disc list-inside" style={{ color: 'var(--text-white)' }}>
            <li>Reduced project planning time by 70%</li>
            <li>Improved field team efficiency by 45%</li>
            <li>Automated 90% of reporting processes</li>
          </ul>
        </div>
      </>
    )
  }
  return (
    <BasePortfolioCard
      title="FiberHomes.com"
      description="A platform for managing and tracking fiber optic infrastructure deployments"
      children={renderChildren()}
      technologies={technologies}
      siteUrl={`https://fiberhomes.com`}
      backgroundImage={backgroundImage}
      backgroundPosition={backgroundPosition}
      textColor="var(--text-white)"
    />
  );
}
