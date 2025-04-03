import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link: string;
  externalLink?: string;
  githubLink?: string;
  imagePosition: 'left' | 'right';
  status: 'planned' | 'in-progress' | 'in-beta' | 'completed' | 'on-hold' | 'mothballed';
  backgroundColor?: string;
}

export default function ProjectCard({
  title,
  description,
  image,
  technologies,
  link,
  externalLink,
  githubLink,
  imagePosition,
  status,
  backgroundColor = 'rgb(17, 17, 17)'
}: ProjectCardProps) {
  return (
    <div 
      className={`relative flex flex-col md:flex-row ${imagePosition === 'right' ? 'md:flex-row-reverse' : ''} gap-8 p-6 border rounded-lg overflow-hidden`}
      style={{ backgroundColor }}
    >
      {/* Image Section */}
      <div className="relative flex-1 rounded-lg min-h-[300px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 justify-center">
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-semibold text-white text-2xl">{title}</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              status === 'completed' ? 'bg-green-500/20 text-green-400' :
              status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-blue-500/20 text-blue-400'
            }`}>
              {status}
            </span>
          </div>
          <p className="text-gray-300">{description}</p>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="mb-2 font-medium text-white">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span 
                  key={tech}
                  className="bg-white/10 px-3 py-1 rounded-full text-white text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link 
              href={link}
              aria-disabled={true}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 opacity-50 px-4 py-2 rounded-lg text-white transition-colors pointer-events-none"
            >
              View Project
              <ArrowRight size={16} />
            </Link>
            {externalLink && (
              <a
                href={externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-white transition-colors"
              >
                Live Site
                <ExternalLink size={16} />
              </a>
            )}
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-white transition-colors"
              >
                GitHub
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 