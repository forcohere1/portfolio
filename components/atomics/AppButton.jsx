import PropTypes from 'prop-types';
import Link from 'next/link';

const AppButton = ({ title, href, className, type }) => (
  href ? (
    <Link
      href={href}
      className={`inline-block w-max p-2 mt-6 border border-light-gray dark:border-dark-gray ${className}`}
    >
      <span className="inline-block min-w-[200px] text-xs lg:text-sm text-center font-bold py-3 px-9 bg-primary dark:bg-dark-primary hover:bg-black dark:hover:bg-dark-gray text-white dark:text-dark-white hover:text-white dark:hover:text-dark-white transition duration-300">
        {title}
      </span>
    </Link>
  ) : (
    <button
      type={type}
      className={`inline-block w-max p-2 mt-6 border border-light-gray dark:border-dark-gray ${className}`}
    >
      <span className="inline-block min-w-[200px] text-xs lg:text-sm text-center font-bold py-3 px-9 bg-primary dark:bg-dark-primary hover:bg-black dark:hover:bg-dark-black text-white dark:text-dark-white hover:text-white dark:hover:text-dark-white transition duration-300">
        {title}
      </span>
    </button>
  )
);

AppButton.propTypes = {
  title: PropTypes.string,
  href: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']), // Validates acceptable types
};

AppButton.defaultProps = {
  title: 'BUTTON',
  href: null,
  className: '',
  type: 'button', // Sets the default type to 'button'
};

export default AppButton;
