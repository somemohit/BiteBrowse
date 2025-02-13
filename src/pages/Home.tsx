import axios from 'axios';
import {useContext, useEffect, useState} from 'react';
import {randomMeal, searchMeal} from '../modules/ApiLinks';
import useDebounce from '../utils/customHooks/useDebounce';
import {watchHistoryContext} from '../App';
// import {MdOutlineSearch} from 'react-icons/md';
import {BiWorld} from 'react-icons/bi';
import {MdCategory} from 'react-icons/md';
import {FiExternalLink} from 'react-icons/fi';
import {homepageImages} from '../modules/constants';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState('');
  const [randomHomeImage, setRandomHomeImage] = useState('');
  const [randomRecipe, setRandomRecipe] = useState('');

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

  const fetchRandomRecipe = async () => {
    try {
      const response = await axios.get(randomMeal);
      setRandomRecipe(response?.data?.meals[0]);
      console.log(response, 'asfa');
    } catch (error) {
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

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * homepageImages.length);
    return setRandomHomeImage(homepageImages[randomIndex]);
  };

  useEffect(() => {
    if (debouncedSearchText) fetchRecipeData();
  }, [debouncedSearchText]);

  useEffect(() => {
    getRandomImage();
    fetchRandomRecipe();
  }, []);

  useEffect(() => {
    if (debouncedSearchText) fetchRecipeData();
  }, [debouncedSearchText]);

  return (
    <>
      <div className="bg-white min-h-screen">
        <div
          className="h-screen bg-cover bg-center w-full flex justify-center px-12 py-8"
          style={{
            backgroundImage: `url(${randomHomeImage})`,
          }}
        >
          <p className="text-8xl font-bold text-white mt-32 font-poppins drop-shadow-xl w-full text-center">
            Discover tasty recipes everyday
          </p>
        </div>

        <div className="flex flex-col gap-8 px-12 py-8 items-center text-gray-500">
          <p className="text-5xl font-bold font-poppins">
            Search Your Favourite Recipes
          </p>
          <div className="flex justify-center items-center border-2 border-gray-500 rounded-full w-10/11 sm:w-6/11">
            <input
              id="target-section"
              type="text"
              placeholder="Search..."
              className="outline-none px-6 w-full h-16 rounded-full"
              onChange={handleSearchChange}
            />
          </div>

          {!recipes?.length ? (
            <div>
              <p className="text-3xl font-poppins font-bold text-gray-500">
                Your culinary adventure starts with a simple search!
              </p>{' '}
            </div>
          ) : loading ? (
            <div className="flex flex-wrap justify-center items-start gap-5 sm:gap-7 md:gap-7 max-w-full sm:max-w-11/12 px-4 sm:px-4 py-4 sm:py-8">
              {[0, 0, 0, 0, 0, 0]?.map((r) => (
                <div
                  key={r?.idMeal}
                  className="relative cursor-pointer rounded-md shadow-new h-[450px] min-w-[150px] sm:min-w-[200px] md:min-w-[220px] lg:min-w-[320px]"
                >
                  <div className="bg-slate-300 animate-pulse w-full object-cover object-center rounded-tl-md rounded-tr-md h-3/5"></div>
                  <div className="p-4 flex flex-col gap-2 w-full">
                    <div className="bg-slate-300 animate-pulse h-4 w-2/3"></div>
                    <div className="flex justify-center gap-4 mx-auto w-full pt-6">
                      <div className="bg-slate-300 animate-pulse h-4 w-1/3"></div>
                      <div className="bg-slate-300 animate-pulse h-4 w-1/3"></div>
                    </div>
                    <div className="bg-slate-300 animate-pulse h-4 w-1/3 mx-auto"></div>
                    <div className="w-1/2 mx-auto rounded-md bg-slate-300 animate-pulse h-8"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap justify-center items-start gap-5 sm:gap-7 md:gap-7 max-w-full sm:max-w-11/12 px-4 sm:px-4 py-4 sm:py-8">
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

        <div className="w-full py-12 flex flex-col items-center justify-center gap-4">
          <p>Today's recipe</p>
          <div className="flex items-center h-fit min-h-[500px] shadow-new rounded-md w-8/12 text-gray-500 font-poppins">
            <img
              src={
                randomRecipe?.strMealThumb
                  ? randomRecipe?.strMealThumb
                  : 'no-img.jpg'
              }
              className="w-2/5 object-cover object-center rounded-tl-md rounded-bl-md h-full"
              alt="meal-img"
            />
            <div className="w-3/5 flex flex-col gap-6 p-6">
              <p className='text-2xl'>{randomRecipe?.strMeal}</p>
              <p className='text-sm'>{randomRecipe?.strInstructions}</p>
              <p className='text-base'>{randomRecipe?.strTags}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
