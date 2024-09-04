import Image from 'next/image';

const AppProject = ({ project }) => (
  <div className="bg-white dark:bg-black border border-light-gray dark:border-dark-light-gray rounded-lg px-4 pt-6 text-center overflow-hidden transition-colors duration-300">
    <div className="mb-3">
      <a href={project.url} target="_blank" rel="noopener noreferrer">
        <h3 className="text-black dark:text-dark-black text-base lg:text-xl font-semibold transition-colors duration-300 hover:text-primary dark:hover:text-dark-primary">
          {project.name}
        </h3>
      </a>
      <p className="text-gray dark:text-dark-light-gray text-xs">
        {project.stack}
      </p>
    </div>
    <div className="shadow-xl">
      <Image
        src={project.image}
        alt={project.name}
        layout="responsive"
        width={100}
        height={60}
        quality={10}
        placeholder="blur"
        blurDataURL={project.image}
        className="transition-transform duration-300 transform translate-y-5 hover:translate-y-0"
      />
    </div>
  </div>
);

export default AppProject;
