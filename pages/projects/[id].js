import Image from 'next/image';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { useEffect, useRef } from 'react';
import ThemeToggle from '../../components/atomics/ThemeToggle';
import Head from 'next/head';

// Static paths generation for each project
export async function getStaticPaths() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'project.json');
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      throw new Error("project.json file not found");
    }
    
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    
    // Parse the JSON data
    const parsedData = JSON.parse(jsonData);
    
    // Ensure 'projects' key exists and is an array
    const projects = Array.isArray(parsedData.projects) ? parsedData.projects : [];

    if (projects.length === 0) {
      throw new Error("No projects found");
    }

    // Create paths based on project ids
    const paths = projects.map((project) => ({
      params: { id: project.id.toString() },
    }));

    return {
      paths,
      fallback: false, // Change to 'blocking' if needed for fallback handling
    };
  } catch (error) {
    console.error("Error in getStaticPaths:", error);
    return {
      paths: [],
      fallback: false, // Handle the case when there's an error
    };
  }
}

// Static props for each project
export async function getStaticProps({ params }) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'project.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const { projects } = JSON.parse(jsonData);

    const projectIndex = projects.findIndex((p) => p.id.toString() === params.id);

    if (projectIndex === -1) {
      return {
        notFound: true,
      };
    }

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
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      notFound: true,
    };
  }
}


const Marquee = ({ stack }) => {
  const marqueeRef = useRef(null);
  const techStack = stack ? stack.split(", ") : [];

  useEffect(() => {
    const marquee = marqueeRef.current;
    let animationFrame;
    let offset = 0;

    const animate = () => {
      offset += 0.3;
      marquee.style.transform = `translateX(-${offset}px)`;

      if (offset >= marquee.scrollWidth / 2) {
        offset = 0;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="relative mx-auto w-11/12 md:w-3/4 overflow-hidden py-6 px-6">
      <div className="flex space-x-4" ref={marqueeRef} style={{ whiteSpace: 'nowrap' }}>
        {techStack.concat(techStack).map((tech, index) => (
          <div
            key={index}
            className="bg-gray-200 dark:bg-white text-black dark:text-black px-6 py-2 rounded-lg shadow-md dark:shadow-lg"
          >
            {tech}
          </div>
        ))}
      </div>
    </div>
  );
};

const ProjectDetail = ({ project, prevProject, nextProject }) => {
  return (
    <div className="container mx-auto px-6 py-16 relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      
      <Head>
        <title>Vijay Chandar | {project.name}</title>
        <meta name="description" content={project.name} />
      </Head>

      {/* Dark Mode Toggle */}
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      {/* Title and Description */}
      <div className="text-center mb-16 mt-8">
        <h1 className="text-5xl font-bold mb-6 text-black dark:text-white">{project.name}</h1>
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">{project.description}</p>
      </div>

      {/* Project Image with Stylish Border and Animation */}
      <div className="flex justify-center mb-16">
        <div className="border-8 border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-105">
          <Image
            src={project.image}
            alt={project.name}
            width={900}
            height={600}
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </div>

      {/* Marquee Section */}
      <Marquee stack={project.stack} />

{/* Project Details */}
<div className="max-w-6xl mx-auto mt-16">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {project.theWhat && (
      <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md text-center">
        <h3 className="text-2xl font-bold mb-4 text-primary">THE WHAT</h3>
        <p className="text-lg text-justify text-gray-800 dark:text-gray-300">{project.theWhat}</p>
      </div>
    )}

    {project.theWhy && (
      <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md text-center">
        <h3 className="text-2xl font-bold mb-4 text-primary">THE WHY</h3>
        <p className="text-lg text-justify  text-gray-800 dark:text-gray-300">{project.theWhy}</p>
      </div>
    )}

    {project.theHow && (
      <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md text-center">
        <h3 className="text-2xl font-bold mb-4 text-primary">THE HOW</h3>
        <p className="text-lg text-justify  text-gray-800 dark:text-gray-300">{project.theHow}</p>
      </div>
    )}

    {project.challenges && (
      <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md text-center">
        <h3 className="text-2xl font-bold mb-4 text-primary">CHALLENGES</h3>
        <p className="text-lg text-justify  text-gray-800 dark:text-gray-300">{project.challenges}</p>
      </div>
    )}

    {project.keyMotivators && (
      <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md text-center">
        <h3 className="text-2xl font-bold mb-4 text-primary">MOTIVATION</h3>
        <p className="text-lg text-justify  text-gray-800 dark:text-gray-300">{project.keyMotivators}</p>
      </div>
    )}

    {project.resultsAndLearning && (
      <div className="p-6 bg-gray-100 dark:bg-gray-500 rounded-lg shadow-md text-center">
        <h3 className="text-2xl font-bold mb-4 text-primary">Results and Learning</h3>
        <p className="text-lg text-justify text-gray-800 dark:text-gray-300">{project.resultsAndLearning}</p>
      </div>
    )}
  </div>
</div>



      {/* Navigation Links */}
      <div className="flex justify-between mt-16">
        {prevProject ? (
          <Link href={`/projects/${prevProject.id}`} className="text-primary hover:underline text-lg">
            ← {prevProject.name}
          </Link>
        ) : (
          <div />  // Empty div to maintain layout
        )}
        {nextProject ? (
          <Link href={`/projects/${nextProject.id}`} className="text-primary hover:underline text-lg">
            {nextProject.name} →
          </Link>
        ) : (
          <div />  // Empty div to maintain layout
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;

