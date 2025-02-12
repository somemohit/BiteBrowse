import {NavLink, useLocation, useNavigate} from 'react-router-dom';
// import {GiHamburgerMenu} from 'react-icons/gi';
import {Link} from 'react-router-dom';
import {IoSearch} from 'react-icons/io5';

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
      <div className="z-50 w-full bg-gray-700 text-white px-10 py-4">
        <div className="flex justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="font-bold flex justify-center gap-1 items-center"
          >
            <div className="flex text-xl sm:text-3xl">
              <p className="text-white">Bite</p>
              <p className="text-red-500">Browse</p>
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
                        ? 'text-red-500 scale-125'
                        : ''
                    } hover:text-red-500 text-xs sm:text-lg hover:scale-125 duration-300 ease-in-out`}
                  >
                    {pathObj?.pathName}
                  </NavLink>
                </>
              );
            })}
            <button onClick={handleScroll} className="">
              <IoSearch className="" />
            </button>
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
