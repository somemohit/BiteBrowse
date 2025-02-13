import {NavLink, useLocation, useNavigate} from 'react-router-dom';
// import {GiHamburgerMenu} from 'react-icons/gi';
import {Link} from 'react-router-dom';
import {IoSearch} from 'react-icons/io5';
import {FaUtensils} from 'react-icons/fa';

const Navbar = () => {
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

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

  console.log(location?.pathname, 'location');

  return (
    <>
      <div className="z-50 w-full text-gray-500 px-16 py-6">
        <div className="flex justify-between">
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
          <div className={`flex items-center space-x-6 sm:space-x-8 sm:flex`}>
            {pathNameArr?.map((pathObj, i) => {
              return (
                <>
                  <NavLink
                    key={i}
                    to={pathObj?.path}
                    className={`${
                      pathObj?.path === location?.pathname
                        ? 'text-red-500 scale-105'
                        : ''
                    } hover:text-red-500 text-xs sm:text-lg hover:scale-105 duration-300 ease-in-out font-poppins font-semibold`}
                  >
                    {pathObj?.pathName}
                  </NavLink>
                </>
              );
            })}
            {location?.pathname === '/' ? (
              <button onClick={handleScroll} className="">
                <IoSearch className="text-xl cursor-pointer" />
              </button>
            ) : null}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        {/* <div className="sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white"
            >
              <GiHamburgerMenu />
            </button>
          </div> */}
      </div>
    </>
  );
};

export default Navbar;
