import axios from 'axios';
import {useContext, useEffect, useState} from 'react';
import {searchMeal} from '../modules/ApiLinks';
import useDebounce from '../utils/customHooks/useDebounce';
import { watchHistoryContext } from '../App';
// import {MdOutlineSearch} from 'react-icons/md';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('');

  const { setWatchHistory } = useContext(watchHistoryContext);
  const debouncedSearchText = useDebounce(query, 500);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const fetchRecipeData = async () => {
    try {
      const response = await axios.get(searchMeal(debouncedSearchText));
      setRecipes(response?.data?.meals);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRecipeCardClick = (recipe) => {
    setWatchHistory((prev) => {
      const updatedHistory = [
        recipe,
        ...prev.filter((r) => r?.idMeal !== recipe?.idMeal),
      ].slice(0, 5);
      localStorage?.setItem('watchHistory', JSON.stringify(updatedHistory));
      return updatedHistory;
    });
  };

  useEffect(() => {
    if (debouncedSearchText) fetchRecipeData();
  }, [debouncedSearchText]);

  return (
    <>
      <div className="bg-gray-500">
        <p className="text-3xl font-bold">Search Recipes</p>
        <div className="h-10 flex justify-center items-center border border-gray-300 rounded-2xl w-10/11 sm:w-1/4">
          <input
            type="text"
            placeholder="Search..."
            className="outline-none px-4 w-full"
            onChange={handleSearchChange}
            //   onKeyDown={(e) => {
            //     if (e.key === 'Enter') {
            //       handleSearchClick();
            //     }
            //   }}
          />
          {/* <button
              onClick={handleSearchClick}
            className="h-full ml-2 px-4 bg-transparent text-white rounded-2xl cursor-pointer"
          >
            <MdOutlineSearch className="text-xl" />
          </button> */}
        </div>

        <div className="flex flex-wrap justify-start items-start gap-5 sm:gap-7 md:gap-7 max-w-full sm:max-w-11/12 px-4 sm:px-4 py-4 sm:py-8">
          {recipes?.map((r) => {
            return (
              <>
                <div
                  onClick={() => handleRecipeCardClick(r)}
                  className="relative cursor-pointer hover:border-2 rounded-lg shadow-xl bg-gray-800 h-fit min-w-[150px] sm:min-w-[200px] md:min-w-[220px] lg:min-w-[260px] hover:scale-110 ease-in-out duration-300"
                >
                  <p className="text-white">{r?.strMeal}</p>
                  <img
                    src={`${
                      r?.strMealThumb ? `${r?.strMealThumb}` : 'no-img.jpg'
                    }`}
                    className="w-full object-cover object-center rounded-lg h-56 sm:h-64 md:h-72 lg:h-[380px]"
                    alt="movie-image"
                  />
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
