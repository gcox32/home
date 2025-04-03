import PageLayout from '@/components/Layout/PageLayout';
import ProjectCard from '@/components/Projects/ProjectCard';

const projects = [
  {
    title: 'JS GBC',
    description: 'A Game Boy Color emulator with save state support built for first generation Pokemon games.',
    image: 'https://assets.letmedemo.com/public/home/projects/js-gbc.png',
    technologies: ['TypeScript', 'Next.js', 'NoSQL'],
    link: '/projects/js-gbc',
    externalLink: 'https://gbc.letmedemo.com',
    githubLink: 'https://github.com/gcox32/gameboy',
    status: 'completed' as const,
    backgroundColor: 'rgb(139, 0, 0)'
  },
  {
    title: 'Neural Network Visualizer',
    description: 'An interactive visualization tool for understanding how neural networks process and transform data through different layers.',
    image: 'https://assets.letmedemo.com/public/home/projects/neural-net.png',
    technologies: ['Python', 'React', 'Vite'],
    link: '/projects/neural-net',
    githubLink: 'https://github.com/gcox32/neuralnet',
    status: 'in-beta' as const,
    backgroundColor: 'rgb(0, 67, 139)'
  },
  {
    title: 'Dunk Ape',
    description: 'I wanted a platform for tracking my lifting and dunk training.',
    image: 'https://assets.letmedemo.com/public/home/projects/dunk-ape.png',
    technologies: ['Next.js', 'Amplify', 'Tailwind'],
    link: '/projects/dunk-ape',
    externalLink: 'https://dunkape.com',
    status: 'completed' as const,
    backgroundColor: 'rgb(82, 0, 139)'
  },
  {
    title: 'Output Score',
    description: 'How can we distill our training down to a single meaningful number?',
    image: 'https://assets.letmedemo.com/public/home/projects/output-score.png',
    technologies: ['Next.js', 'Amplify', 'Tailwind'],
    link: '/projects/output-score',
    externalLink: 'https://unspammable.com',
    githubLink: 'https://github.com/gcox32/unspammable',
    status: 'completed' as const,
    backgroundColor: 'rgb(0, 139, 139)'
  },
  {
    title: 'Fundamental',
    description: `My brokerage didn't have a fundamental analysis tool, so I built my own.`,
    image: 'https://assets.letmedemo.com/public/home/projects/fundamental.png',
    technologies: ['Next.js', 'Amplify', 'APIs'],
    link: '/projects/fundamental',
    externalLink: 'https://fundamental.letmedemo.com',
    githubLink: 'https://github.com/gcox32/fundamentals',
    status: 'in-beta' as const,
    backgroundColor: 'rgb(139, 0, 0)'
  },
  {
    title: 'Dashboard Template',
    description: 'An open source template for your next dashboard.',
    image: 'https://assets.letmedemo.com/public/home/projects/dashboard-template.png',
    technologies: ['Git', 'React', 'CSS'],
    link: '/projects/dashboard-template',
    externalLink: 'https://dashboard-template-alpha.vercel.app',
    githubLink: 'https://github.com/gcox32/dashboard-template',
    status: 'in-beta' as const,
    backgroundColor: 'rgb(0, 139, 139)'
  }
];

export default function Projects() {
  return (
    <PageLayout 
      title="Projects"
      description="A collection of experimental projects and technical explorations. These range from game development to machine learning visualizations."
    >
      <div className="flex flex-col gap-12 w-full">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            {...project}
            imagePosition={index % 2 === 0 ? 'left' : 'right'}
          />
        ))}
      </div>
    </PageLayout>
  );
}
