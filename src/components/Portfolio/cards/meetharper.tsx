import BasePortfolioCard from './BasePortfolioCard';

export default function MeetHarper() {

    const title = 'MeetHarper.com';
    const description = 'A library of content we took from customized to customizable';
    const technologies = [
        'TypeScript', 'Vue.js', 'Go', 'MySQL', 'AWS', 'Docker',
    ];
    const siteUrl = 'https://meetharper.com';
    const foregroundImage = 'https://assets.letmedemo.com/public/home/portfolio/harper-hero.png';
    const backgroundImage = 'https://assets.letmedemo.com/public/home/portfolio/harper-hero-color.png';
    const foregroundPosition = '85% 50%';
    const backgroundColor = 'rgb(0, 153, 196)';
    const textColor = 'white';

    const renderChildren = () => {
        return (
          <>
            <div className="w-2/3">
              <h4 className="mb-2 font-medium text-white">Key Responsibilities</h4>
              <ul className="space-y-1 text-white list-disc list-inside">
                <li>Assumed full ownership of a third-party-built platform and rapidly came up to speed on unfamiliar tech (Vue.js and Go)</li>
                <li>Diagnosed and fixed bugs across the stack while delivering new features to meet evolving client needs</li>
                <li>Maintained infrastructure and code quality while balancing short-term support with long-term stability</li>
                <li>Provided direct technical support to clients, often debugging issues live and guiding them through solutions</li>
              </ul>
            </div>
      
            <div className="w-2/3">
              <h4 className="mb-2 font-medium text-white">Impact</h4>
              <ul className="space-y-1 text-white list-disc list-inside">
                <li>Stabilized a critical platform under active use without needing a full rebuild</li>
                <li>Improved turnaround time on support issues, reducing average resolution time by more than half</li>
                <li>Earned trust from both internal stakeholders and clients through technical ownership and clear communication</li>
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
            foregroundImage={foregroundImage}
            foregroundPosition={foregroundPosition}
            backgroundColor={backgroundColor}
            textColor={textColor}
        >
            {renderChildren()}
        </BasePortfolioCard>
    );
}