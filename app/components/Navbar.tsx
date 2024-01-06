import ThemeSwitcher from './ThemSwitcher';

const Navbar = () => {
  return (
    <header className="h-5 w-full">
      <div className="container px-4 sm:px-6 py-4 flex justify-between items-center">
        <h2 className="font-bold text-3xl text-gray-900 dark:text-white">
          {/* Your logo or title */}
        </h2>
        {/* Theme Switcher */}
        <div className="flex items-center">
          {/* Push ThemeSwitcher to the right */}
          <div className="flex-grow"></div>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
