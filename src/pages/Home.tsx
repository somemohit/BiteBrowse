import axios from 'axios';
import {useContext, useEffect, useState} from 'react';
import {searchMeal} from '../modules/ApiLinks';
import useDebounce from '../utils/customHooks/useDebounce';
import {watchHistoryContext} from '../App';
// import {MdOutlineSearch} from 'react-icons/md';
import {BiWorld} from 'react-icons/bi';
import {MdCategory} from 'react-icons/md';
import {FiExternalLink} from 'react-icons/fi';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState('');

  const {setWatchHistory} = useContext(watchHistoryContext);
  const debouncedSearchText = useDebounce(query, 500);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const fetchRecipeData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(searchMeal(debouncedSearchText));
      setLoading(false);
      setRecipes(response?.data?.meals);
      console.log(response);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleRecipeCardClick = (recipe) => {
    setWatchHistory((prev) => {
      const updatedHistory = [
        recipe,
        ...prev.filter((r) => r?.idMeal !== recipe?.idMeal),
      ].slice(0, 10);
      localStorage?.setItem('watchHistory', JSON.stringify(updatedHistory));
      return updatedHistory;
    });
  };

  useEffect(() => {
    if (debouncedSearchText) fetchRecipeData();
  }, [debouncedSearchText]);

  return (
    <>
      <div className="bg-white min-h-screen">
        <div className="h-screen bg-gray-300">test</div>
        <div className="h-screen bg-yellow-100">
          <p className="text-3xl font-bold">Search Recipes</p>
          <div className="h-10 flex justify-center items-center border border-gray-300 rounded-2xl w-10/11 sm:w-1/4">
            <input
              id="target-section"
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

          {loading ? (
            <div className="flex flex-wrap justify-start items-start gap-5 sm:gap-7 md:gap-7 max-w-full sm:max-w-11/12 px-4 sm:px-4 py-4 sm:py-8">
              {[0, 0, 0, 0, 0, 0]?.map((r) => (
                <div
                  key={r?.idMeal}
                  className="animate-pulse relative bg-slate-500 cursor-pointer rounded-md shadow-new h-[450px] min-w-[150px] sm:min-w-[200px] md:min-w-[220px] lg:min-w-[320px] hover:scale-110 ease-in-out duration-300"
                >
                  <div className="p-4 flex flex-col gap-2">
                    <div className="bg-slate-500 mx-auto h-8px w-2/3"></div>
                    <div className="border w-full"></div>
                    <div className="flex gap-4 mx-auto">
                      <div className="bg-slate-500 h-8px w-1/3"></div>
                      <div className="bg-slate-500 h-8px w-1/3"></div>
                    </div>
                    <div className="bg-slate-500 h-8px w-1/3"></div>
                    <div className="w-1/2 mx-auto rounded-md bg-slate-500 h-12px"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap justify-start items-start gap-5 sm:gap-7 md:gap-7 max-w-full sm:max-w-11/12 px-4 sm:px-4 py-4 sm:py-8">
              {recipes?.map((r) => (
                <div
                  key={r?.idMeal}
                  onClick={() => handleRecipeCardClick(r)}
                  className="relative cursor-pointer rounded-md shadow-new h-[450px] min-w-[150px] sm:min-w-[200px] md:min-w-[220px] lg:min-w-[320px] hover:scale-110 ease-in-out duration-300"
                >
                  <img
                    src={r?.strMealThumb ? r?.strMealThumb : 'no-img.jpg'}
                    className="w-full object-cover object-center rounded-tl-md rounded-tr-md h-3/5"
                    alt="meal-img"
                  />
                  <div className="p-4 flex flex-col gap-2">
                    <p className="text-gray-500 font-semibold mx-auto text-lg truncate w-[300px]">
                      {r?.strMeal}
                    </p>
                    <div className="border text-gray-200 w-full"></div>
                    <div className="flex gap-4 mx-auto">
                      <div className="flex gap-1 items-center text-gray-500">
                        <BiWorld /> <p className="text-sm">{r?.strArea}</p>
                      </div>
                      <div className="flex gap-1 items-center text-gray-500">
                        <MdCategory />{' '}
                        <p className="text-sm">{r?.strCategory}</p>
                      </div>
                    </div>
                    <a
                      href={r?.strSource}
                      className="text-sm text-gray-500 hover:text-gray-700 mx-auto flex gap-1 items-center"
                    >
                      <FiExternalLink /> Link
                    </a>
                    <button className="w-1/2 mx-auto text-xs rounded-md px-4 py-2 bg-gray-400 hover:bg-gray-500 duration-300 ease-in-out text-white">
                      View Recipe
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
