import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';

const AppProject = ({ project, isImageLeft }) => {
  const { theme } = useTheme(); // Light/Dark mode handling

  return (
    <div className={`relative flex flex-col md:flex-row ${isImageLeft ? 'md:flex-row-reverse' : ''} items-stretch mb-12 gap-4`}>
      {/* Image Container */}
      <div
        className={`relative z-10 flex-shrink-0 w-full md:w-1/3 h-auto overflow-hidden shadow-lg transition-transform duration-500 hover:shadow-xl
        ${isImageLeft ? 'rounded-r-lg md:rounded-l-none' : 'rounded-l-lg md:rounded-r-none'}
        ${theme === 'dark' ? 'border border-gray-700' : 'border border-gray-300'}
        `}
      >
        <div className="relative w-full h-full">
          <Image
            src={project.image}
            alt={project.name}
            layout="responsive"
            width={600}
            height={400}
            objectFit="cover"
            className="transition-transform duration-300 transform hover:scale-105"
          />
        </div>
      </div>

      {/* Content Container */}
      <div
        className={`relative z-10 w-full md:w-2/3 h-auto p-6 text-left flex flex-col justify-center transition-transform duration-500 hover:scale-105 hover:shadow-2xl
          ${theme === 'dark' ? 'border border-gray-700' : 'border border-gray-300'}
        ${isImageLeft ? 'rounded-l-lg md:rounded-r-none' : 'rounded-r-lg md:rounded-l-none'}
        `}
      >
        <Link href={project.url || '#'}>
          <div>
            <p className="text-sm font-semibold mb-2">{project.category}</p>
            <h3 className="text-2xl font-bold mb-4 hover:text-primary transition-colors duration-300">
              {project.name}
            </h3>
            <p className="text-gray-400 text-sm mb-4">{project.stack}</p>
            <div className="flex gap-6 text-sm font-semibold">
              <p>{project.metrics?.users}</p>
              <p>{project.metrics?.engagement}</p>
            </div>
          </div>
        </Link>
        <Link 
          href={`/projects/${project.id}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-4 ml-auto text-primary flex items-center hover:underline cursor-pointer"
        >
          <div>
            Learn More <span className="ml-2">→</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AppProject;
