'use client';

import Link from 'next/link';

export default function Home() {
  const portfolioImage = 'https://assets.letmedemo.com/public/home/images/severance-ui';
  const projectsImage = 'https://assets.letmedemo.com/public/home/images/daddys-home';
  const blogImage = 'https://assets.letmedemo.com/public/home/images/lamp-post';

  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>, destination: string) => {
    e.preventDefault();
    
    // Get the background div and change its background to the animated GIF
    const projectsCard = e.currentTarget;
    projectsCard.style.backgroundImage = projectsCard.style.backgroundImage.replace('.png', '.gif');
    
    setTimeout(() => {
      window.location.href = destination;
    }, 2000);
  };

  return (
    <div className="justify-items-center items-center gap-16 grid grid-rows-[20px_1fr_20px] p-8 sm:p-20 pb-20 font-[family-name:var(--font-geist-sans)] content-height">
      <main className="flex flex-col items-center sm:items-start gap-[32px] row-start-2">
        <div className="gap-6 grid grid-cols-1 md:grid-cols-3 w-full max-w-7xl">
          {/* Portfolio Card */}
          <Link 
            href="/portfolio"
            onClick={(e) => handleCardClick(e, '/portfolio')}
            className="group relative border-[var(--color-border-hover)] border-2 hover:border-[var(--color-border-solid)] rounded-lg h-[300px] overflow-hidden transition-all"
            style={{
              backgroundImage: `url(${portfolioImage}.png), url(${portfolioImage}.gif)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors" />
            <div className="z-10 relative flex flex-col justify-end p-6 h-full">
              <h2 className="mb-2 font-semibold text-white text-2xl">Portfolio</h2>
              <p className="text-gray-200">View my professional work and experience</p>
            </div>
          </Link>

          {/* Projects Card */}
          <Link 
            href="/projects"
            onClick={(e) => handleCardClick(e, '/projects')}
            className="group relative border-[var(--color-border-hover)] border-2 hover:border-[var(--color-border-solid)] rounded-lg h-[300px] overflow-hidden transition-all"
            style={{
              backgroundImage: `url(${projectsImage}.png), url(${projectsImage}.gif)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors" />
            <div className="z-10 relative flex flex-col justify-end p-6 h-full">
              <h2 className="mb-2 font-semibold text-white text-2xl">Projects</h2>
              <p className="text-gray-200">Explore my personal projects and experiments</p>
            </div>
          </Link>

          {/* Blog Card */}
          <Link 
            href="/blog"
            onClick={(e) => handleCardClick(e, '/blog')}
            className="group relative border-[var(--color-border-hover)] border-2 hover:border-[var(--color-border-solid)] rounded-lg h-[300px] overflow-hidden transition-all"
            style={{
              backgroundImage: `url(${blogImage}.png), url(${blogImage}.gif)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors" />
            <div className="z-10 relative flex flex-col justify-end p-6 h-full">
              <h2 className="mb-2 font-semibold text-white text-2xl">Blog</h2>
              <p className="text-gray-200">Read my thoughts and tutorials</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
