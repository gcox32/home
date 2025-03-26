import BasePortfolioCard from './BasePortfolioCard';

export default function FiberHomes() {

  const title = 'FiberHomes.com';
  const description = 'Bringing fiber availability into the light';

  const technologies = [
    'Python', 'Django', 'Postgresql', 'AWS', 'Vanilla JS', 'CSS', 'OAuth', 'SendGrid'
  ];


  const backgroundImage = 'https://assets.letmedemo.com/public/home/portfolio/fiberhomes-hero.png';
  const backgroundPosition = 'bottom';
  const backgroundColor = 'rgb(21, 48, 73)';

  const renderChildren = () => {
    return (
      <>
        <div className="w-2/3">
          <h4 className="mb-2 font-medium text-white">Key Responsibilities</h4>
          <ul className="space-y-1 text-white list-disc list-inside">
            <li>Built and maintained a suite of data pipelines and dashboards tailored to diverse ISP needs</li>
            <li>Designed APIs and AWS-based infrastructure to facilitate data-sharing between ISPs, billing providers, and consumer platforms</li>
            <li>Led development of tools for transforming raw address and network data into actionable insights</li>
            <li>Acted as a bridge between business users and engineering, regularly translating vague ideas into implemented solutions</li>
          </ul>
        </div>
  
        <div className="w-2/3">
          <h4 className="mb-2 font-medium text-white">Impact</h4>
          <ul className="space-y-1 text-white list-disc list-inside">
            <li>Enabled ISPs to make faster, more informed business decisions with custom-built reporting tools</li>
            <li>Supported revenue growth by integrating directly with third-party platforms used by over 200 partners</li>
            <li>Built and sustained systems that ran reliably for years with minimal intervention</li>
          </ul>
        </div>
      </>
    )
  }
  
  return (
    <BasePortfolioCard
      title={title}
      description={description}
      children={renderChildren()}
      technologies={technologies}
      siteUrl={`https://fiberhomes.com`}
      backgroundImage={backgroundImage}
      backgroundPosition={backgroundPosition}
      backgroundColor={backgroundColor}
    />
  );
}
