import BasePortfolioCard from './BasePortfolioCard';

export default function IronTribe() {

  const title = 'Iron Tribe Fitness';
  const description = `A boutique fitness brand with data they couldn't reach`;
  const technologies = [
    'Next.js', 'TypeScript', 'SQLite', 'AWS'
  ];
  const siteUrl = 'https://irontribefitness.com';
  const backgroundImage = 'https://assets.letmedemo.com/public/home/portfolio/itf-hero-lines.png';
  const backgroundColor = '#000000';

  const renderChildren = () => {
    return (
      <>
        <div>
          <h4 className="mb-2 font-medium" style={{ color: 'var(--text-white)' }}>Key Responsibilities</h4>
          <ul className="space-y-1 list-disc list-inside" style={{ color: 'var(--text-white)' }}>
            <li>Stood in the gap between the client and the development team</li>
            <li>Presented novel solutions that drew on my knowledge of and my experience in the fitness industry</li>
            <li>Wrote both proof-of-concept and scalable, production-ready code</li>
            <li>Delivered a full-stack platform that could be used to make data-driven decisions</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-2 font-medium" style={{ color: 'var(--text-white)' }}>Impact</h4>
          <ul className="space-y-1 list-disc list-inside" style={{ color: 'var(--text-white)' }}>
            <li>We may never know.</li>
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