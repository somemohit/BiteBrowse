import {NavLink, useLocation} from 'react-router-dom';
// import {useNavigate} from 'react-router-dom';
// import {GiHamburgerMenu} from 'react-icons/gi';
import {Link} from 'react-router-dom';
import {IoSearch} from 'react-icons/io5';
import {FaUtensils} from 'react-icons/fa';
import {GiHamburgerMenu} from 'react-icons/gi';
import {useContext, useState} from 'react';
import {IoSunnyOutline} from 'react-icons/io5';
import {IoMoonOutline} from 'react-icons/io5';
import {darkModeContext} from '../App';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const location = useLocation();
  // const navigate = useNavigate();
  const {darkMode, setDarkMode} = useContext(darkModeContext)!;

  const pathNameArr = [
    {
      path: '/',
      pathName: 'Home',
    },
    {
      path: '/watch-history',
      pathName: 'Watch History',
    },
  ];

  const handleScroll = () => {
    const element = document.getElementById('target-section');
    if (element) {
      element.focus();
      element.scrollIntoView({behavior: 'smooth'});
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('selectedTheme', JSON.stringify(newDarkMode));
  };

  console.log(location?.pathname, 'location');

  return (
    <>
      <div className="z-50 w-full text-gray-500 px-6 py-6 sm:px-16 dark:bg-slate-900">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="font-bold flex justify-center gap-1 items-center"
          >
            <div className="flex text-xl sm:text-3xl items-center">
              <p className="text-red-500">Bite</p>
              <p className="text-red-500">Browse</p>
              <FaUtensils className="text-red-500" />
            </div>
          </Link>

          {/* Navbar Links */}
          <div className="hidden sm:flex items-center space-x-6 sm:space-x-8">
            {pathNameArr?.map((pathObj, i) => (
              <NavLink
                key={i}
                to={pathObj?.path}
                className={`${
                  pathObj?.path === location?.pathname
                    ? 'text-red-500 scale-105'
                    : ''
                } hover:text-red-500 dark:text-white text-xs sm:text-lg hover:scale-105 duration-300 ease-in-out font-poppins font-semibold`}
              >
                {pathObj?.pathName}
              </NavLink>
            ))}
            <button
              onClick={toggleDarkMode}
              title="theme"
              className="bg-transparent dark:bg-gray-500 p-2 rounded-md flex justify-center items-center text-white cursor-pointer outline-1 outline-gray-500"
            >
              {darkMode ? (
                <IoSunnyOutline />
              ) : (
                <IoMoonOutline className="text-gray-500" />
              )}
            </button>
            {location?.pathname === '/' ? (
              <button onClick={handleScroll} className="">
                <IoSearch className="text-xl cursor-pointer dark:text-white" />
              </button>
            ) : null}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="sm:hidden flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              title="theme"
              className="bg-transparent dark:bg-gray-500 p-1 rounded-md flex justify-center items-center text-white cursor-pointer outline-1 outline-gray-500"
            >
              {darkMode ? (
                <IoSunnyOutline />
              ) : (
                <IoMoonOutline className="text-gray-500" />
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-500 dark:text-white text-2xl"
            >
              <GiHamburgerMenu />
            </button>
          </div>
        </div>

        {/* Mobile Menu Items (Conditional) */}
        {isMobileMenuOpen && (
          <div className="sm:hidden flex flex-col space-y-4 py-4">
            {pathNameArr?.map((pathObj, i) => (
              <NavLink
                key={i}
                to={pathObj?.path}
                className={`${
                  pathObj?.path === location?.pathname
                    ? 'text-red-500 scale-105'
                    : ''
                } text-lg hover:text-red-500 dark:text-white font-poppins font-semibold text-center`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {pathObj?.pathName}
              </NavLink>
            ))}
            {location?.pathname === '/' ? (
              <button onClick={handleScroll} className="text-center mx-auto">
                <IoSearch className="text-xl cursor-pointer" />
              </button>
            ) : null}
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
