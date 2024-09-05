import Image from 'next/image';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { useEffect, useRef } from 'react';

// Static paths generation for each project
export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'data', 'project.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const { projects } = JSON.parse(jsonData);

  const paths = projects.map((project) => ({
    params: { id: project.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

// Static props for each project
export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'data', 'project.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const { projects } = JSON.parse(jsonData);

  const projectIndex = projects.findIndex((p) => p.id.toString() === params.id);
  const project = projects[projectIndex];
  const prevProject = projects[projectIndex - 1] || null;
  const nextProject = projects[projectIndex + 1] || null;

  return {
    props: {
      project,
      prevProject,
      nextProject,
    },
  };
}

// Marquee Animation Component with continuous scrolling and fade-out effect
const Marquee = () => {
  const marqueeRef = useRef(null);

  // Animation to continuously move the tech stack
  useEffect(() => {
    const marquee = marqueeRef.current;
    let animationFrame;
    let offset = 0;

    const animate = () => {
      offset += 1;
      marquee.style.transform = `translateX(-${offset}px)`;
      
      // Reset offset to zero when one full loop is completed
      if (offset > marquee.scrollWidth) {
        offset = 0;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="relative w-full overflow-hidden py-4 px-6">
      {/* Fade effect on the sides */}
      <div className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-black/80 to-transparent dark:from-white/80"></div>
      <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-black/80 to-transparent dark:from-white/80"></div>
      
      {/* Tech Stack Marquee */}
      <div className="flex space-x-6 animate-marquee" ref={marqueeRef}>
        <span className="bg-gray-700 text-white dark:bg-gray-300 dark:text-black px-4 py-2 rounded">Technology 1</span>
        <span className="bg-gray-700 text-white dark:bg-gray-300 dark:text-black px-4 py-2 rounded">Technology 2</span>
        <span className="bg-gray-700 text-white dark:bg-gray-300 dark:text-black px-4 py-2 rounded">Technology 3</span>
        <span className="bg-gray-700 text-white dark:bg-gray-300 dark:text-black px-4 py-2 rounded">Technology 4</span>
      </div>
    </div>
  );
};

const ProjectDetail = ({ project, prevProject, nextProject }) => {
  return (
    <div className="container mx-auto p-6">
      {/* Title and Internship Info */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">{project.name}</h1>
        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">{project.category}</p>
      </div>

      {/* Project Image */}
      <div className="flex justify-center mb-8">
        <Image
          src={project.image}
          alt={project.name}
          width={800}
          height={500}
          objectFit="cover"
          className="rounded-lg shadow-lg"
        />
      </div>

      {/* Scrolling Marquee Section */}
      <Marquee />

      {/* Project Details with two-column layout */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {/* Left Column: Headings */}
        <div className="space-y-8">
          {project.role && (
            <div>
              <h3 className="text-lg font-semibold mb-2">MY ROLE</h3>
              <ul className="space-y-1">
                {project.role.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {project.deliverables && (
            <div>
              <h3 className="text-lg font-semibold mb-2">DELIVERABLES</h3>
              <ul className="space-y-1">
                {project.deliverables.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {project.team && (
            <div>
              <h3 className="text-lg font-semibold mb-2">TEAM</h3>
              <ul className="space-y-1">
                {project.team.map((member, index) => (
                  <li key={index}>{member}</li>
                ))}
              </ul>
            </div>
          )}

          {project.year && (
            <div>
              <h3 className="text-lg font-semibold mb-2">YEAR</h3>
              <p>{project.year}</p>
            </div>
          )}
        </div>

        {/* Right Column: Descriptions */}
        <div className="space-y-8">
          {project.theWhat && (
            <div>
              <h3 className="text-lg font-semibold mb-2">THE WHAT</h3>
              <p>{project.theWhat}</p>
            </div>
          )}

          {project.theWhy && (
            <div>
              <h3 className="text-lg font-semibold mb-2">THE WHY</h3>
              <p>{project.theWhy}</p>
            </div>
          )}

          {project.theHow && (
            <div>
              <h3 className="text-lg font-semibold mb-2">THE HOW</h3>
              <p>{project.theHow}</p>
            </div>
          )}

          {project.challenges && (
            <div>
              <h3 className="text-lg font-semibold mb-2">CHALLENGES</h3>
              <p>{project.challenges}</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex justify-between mt-12">
        {prevProject && (
          <Link href={`/projects/${prevProject.id}`} className="text-primary hover:underline">
            ← {prevProject.name}
          </Link>
        )}
        {nextProject && (
          <Link href={`/projects/${nextProject.id}`} className="text-primary hover:underline">
            {nextProject.name} →
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
