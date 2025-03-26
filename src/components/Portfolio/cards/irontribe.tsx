import BasePortfolioCard from './BasePortfolioCard';

export default function IronTribe() {

  const title = 'Iron Tribe Fitness';
  const description = 'Making data visible and actionable for a boutique fitness brand';
  const siteUrl = 'https://irontribefitness.com';

  const technologies = [
    'Next.js', 'TypeScript', 'SQLite', 'AWS'
  ];

  const backgroundImage = 'https://assets.letmedemo.com/public/home/portfolio/itf-hero-lines.png';
  const backgroundColor = '#000000';

  const renderChildren = () => {
    return (
      <>
        <div>
          <h4 className="mb-2 font-medium" style={{ color: 'var(--text-white)' }}>Key Responsibilities</h4>
          <ul className="space-y-1 list-disc list-inside" style={{ color: 'var(--text-white)' }}>

          </ul>
        </div>

        <div>
          <h4 className="mb-2 font-medium" style={{ color: 'var(--text-white)' }}>Impact</h4>
          <ul className="space-y-1 list-disc list-inside" style={{ color: 'var(--text-white)' }}>

          </ul>
        </div>
      </>
    )
  }

  return (
    <BasePortfolioCard
      title={title}
      description={description}
      technologies={technologies}
      siteUrl={siteUrl}
      backgroundImage={backgroundImage}
      backgroundColor={backgroundColor}
    >
      {renderChildren()}
    </BasePortfolioCard>
  );
}