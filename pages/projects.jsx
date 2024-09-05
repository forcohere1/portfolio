import USER from '../data/user.json';
import AppHeader from '../components/organisms/AppHeader';
import AppShell from '../components/templates/AppShell';
import AppSection from '../components/molecules/AppSection';
import AppProject from '../components/atomics/AppProject';

const Project = () => (
  <AppShell
    title={`Vijay Chandar | ${USER.project.title}`}
    description={USER.project.description}
    keyword="project, projects, portfolio project, web development project, skill"
  >
    <AppHeader
      title={USER.project.title}
      description={USER.project.description}
    />
    <AppSection title="Personal Projects">
      {/* Vertical Stack for projects */}
      <div className="flex flex-col gap-12">
        {USER.project.contents.map((item, index) => (
          <AppProject key={item.id} project={item} isImageLeft={index % 2 === 0} />
        ))}
      </div>
    </AppSection>

  </AppShell>
);

export default Project;
