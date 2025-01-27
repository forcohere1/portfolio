import USER from '../../data/user.json';

const AppFooter = () => {
  const handleCopyrightYears = () => {
    const startYears = '2024';
    const nowYears = new Date().getFullYear();
    const rangeYears =
      startYears === nowYears.toString()
        ? startYears
        : `${startYears} - ${nowYears}`;
    return rangeYears;
  };

  return (
    <footer className="text-center text-xs md:text-md text-gray py-7">
      <p> &copy; {handleCopyrightYears()}</p>
    </footer>
  );
};

export default AppFooter;
