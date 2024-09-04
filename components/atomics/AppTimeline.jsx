const AppTimeline = ({ item, children }) => (
  <div className="py-7 px-5 border-l border-primary dark:border-dark-primary">
    <div className="relative">
      <span className="text-xs inline-block py-[3px] px-5 rounded-full border border-primary dark:border-dark-primary text-gray dark:text-dark-light-gray">
        {item.timestamp}
      </span>
      <span className="absolute w-3 h-3 bg-primary dark:bg-dark-primary rounded-full left-[-26.5px] bottom-1/2 transform translate-y-1/2" />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-x-12">
      <div className="my-2 col-span-2">
        <h3 className="text-base md:text-lg font-semibold">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            {item.name}{' '}
            <i className="fas fa-link text-xs text-gray dark:text-dark-light-gray hidden group-hover:inline" />
          </a>
        </h3>
        <h4 className="text-xs lg:text-sm text-primary dark:text-dark-primary">
          {item.info}
        </h4>
      </div>
      <div className="text-xs md:text-base text-gray dark:text-dark-light-gray col-span-3">
        {children}
      </div>
    </div>
  </div>
);

export default AppTimeline;
