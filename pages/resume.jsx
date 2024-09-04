import USER from '../data/user.json';
import AppHeader from '../components/organisms/AppHeader';
import AppSection from '../components/molecules/AppSection';
import AppTimeline from '../components/atomics/AppTimeline';
import AppShell from '../components/templates/AppShell';
import AppButton from '../components/atomics/AppButton';

const Resume = () => (
  <AppShell
    title={`Vijay Chandar | ${USER.resume.title}`}
    description={USER.resume.description}
    keyword="resume, education, course, skill"
  >
    <AppHeader
      title={USER.resume.title}
      description={USER.resume.description}
    />
    
    {/* Centered PDF Resume Button */}
    <div className="flex justify-center my-8">
      <a
        href="https://firebasestorage.googleapis.com/v0/b/portfolio-daf77.appspot.com/o/Vijay_Chandar_CV.pdf?alt=media&token=068b81bf-cf4c-45ec-8f9e-aade810f6a99"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block w-max p-2 mt-6 border border-light-gray dark:border-dark-light-gray"
      >
        <span
          className="inline-block min-w-[200px] text-xs lg:text-sm text-center font-bold py-3 px-9 bg-primary hover:bg-black dark:bg-dark-primary dark:hover:bg-dark-gray text-white hover:text-white transition duration-300"
        >
          View & Download PDF Resume
        </span>
      </a>
    </div>

    {USER.resume.contents.map((item) => (
      <AppSection key={item.id} title={item.title} className="py-0">
        {item.contents.map((subItem) => (
          <AppTimeline key={subItem.id} item={subItem}>
            {subItem.description}
            {subItem.list ? (
              <ul className="mt-4">
                {subItem.list.map((listItem) => (
                  <li key={listItem.id} className="list-disc list-inside mb-2">
                    <a
                      href={listItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black dark:text-primary hover:text-primary dark:hover:text-dark-primary"
                      title={listItem.level}
                    >
                      {listItem.name}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              ''
            )}
          </AppTimeline>
        ))}
      </AppSection>
    ))}
  </AppShell>
);

export default Resume;
