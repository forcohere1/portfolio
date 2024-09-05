import USER from '../../data/user.json';
import ThemeToggle from './ThemeToggle';
import AIChatButton
 from './AppChatButton';
const AppSide = () => (
  <div className="hidden md:flex justify-between fixed bottom-0 left-0 right-0 z-10 w-full px-3 md:px-10 2xl:px-20 max-w-[1905px] mx-auto">
    <aside className="flex flex-col items-center">
      <ul className="flex flex-col items-center w-6 space-y-4">
        {USER.contact.contents
          .filter((filteredItem) => filteredItem.category === 'Social Media')
          .map((item) => (
            <li key={item.id} className="w-max">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                title={item.name}
                aria-label={item.name}
              >
                <i
                  className={`${item.icon} text-2xl transition duration-300 text-gray dark:text-dark-light-gray hover:text-primary dark:hover:text-dark-primary transform hover:-translate-y-1`}
                />
              </a>
            </li>
          ))}
      </ul>
      <div className="h-28 w-[2px] bg-primary dark:bg-dark-primary mt-5" />
    </aside>
    <aside className="flex flex-col justify-end items-center">
      <AIChatButton />
      <ThemeToggle />
      {[USER.contact.contents.find((item) => item.category === 'Email')].map(
        (item) => (
          <a
            key={item.id}
            href={`mailto:${item.username}`}
            className="text-gray dark:text-dark-light-gray transition duration-300 hover:text-primary dark:hover:text-dark-primary tracking-widest"
            style={{ writingMode: 'tb-rl' }}
          >
            {item.username}
          </a>
        )
      )}
      <div className="h-28 w-[2px] bg-primary dark:bg-dark-primary mt-5" />
    </aside>
  </div>
);

export default AppSide;
