import Image from 'next/image';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { useEffect, useRef } from 'react';

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
    <div className="container mx-auto px-6 py-12">
      {/* Title and Description */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">{project.name}</h1>
        <p className="text-lg font-medium text-gray-600 dark:text-gray-400">{project.description}</p>
      </div>

      {/* Project Image with Stylish Border */}
      <div className="flex justify-center mb-12">
        <div className="border-4 border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden shadow-lg">
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
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 mt-12">
        {/* Left Column */}
        <div className="space-y-12">
          <div>
            <h3 className="text-xl font-semibold mb-4">MY ROLE</h3>
            <ul className="space-y-2 text-lg">
              {project.role.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">DELIVERABLES</h3>
            <ul className="space-y-2 text-lg">
              {project.deliverables.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">TEAM</h3>
            <ul className="space-y-2 text-lg">
              {project.team.map((member, index) => (
                <li key={index}>{member}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">YEAR</h3>
            <p className="text-lg">{project.year}</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-12">
          {project.theWhat && (
            <div>
              <h3 className="text-xl font-semibold mb-4">THE WHAT</h3>
              <p className="text-lg">{project.theWhat}</p>
            </div>
          )}

          {project.theWhy && (
            <div>
              <h3 className="text-xl font-semibold mb-4">THE WHY</h3>
              <p className="text-lg">{project.theWhy}</p>
            </div>
          )}

          {project.theHow && (
            <div>
              <h3 className="text-xl font-semibold mb-4">THE HOW</h3>
              <p className="text-lg">{project.theHow}</p>
            </div>
          )}

          {project.challenges && (
            <div>
              <h3 className="text-xl font-semibold mb-4">CHALLENGES</h3>
              <p className="text-lg">{project.challenges}</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex justify-between mt-12">
        {prevProject ? (
          <Link href={`/projects/${prevProject.id}`} className="text-primary hover:underline">
            ← {prevProject.name}
          </Link>
        ) : (
          <div />  // Empty div to maintain layout
        )}
        {nextProject ? (
          <Link href={`/projects/${nextProject.id}`} className="text-primary hover:underline">
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
