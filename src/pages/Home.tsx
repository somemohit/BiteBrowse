import axios from 'axios';
import {useContext, useEffect, useState} from 'react';
import {randomMeal, searchMeal} from '../modules/ApiLinks';
import useDebounce from '../utils/customHooks/useDebounce';
import {watchHistoryContext} from '../App';
// import {MdOutlineSearch} from 'react-icons/md';
import {BiWorld} from 'react-icons/bi';
import {MdCategory} from 'react-icons/md';
import {FiExternalLink} from 'react-icons/fi';
import {homepageImages, limitText} from '../modules/constants';
import {useNavigate} from 'react-router-dom';
import {RecipeInfoType, RecipeResponse} from '../modules/types';
import {motion} from 'framer-motion';

const Home = () => {
  const [recipes, setRecipes] = useState<RecipeInfoType[]>([]);
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [loadingRandomRecipe, setLoadingRandomRecipe] =
    useState<boolean>(false);
  const [randomHomeImage, setRandomHomeImage] = useState<string>('');
  const [randomRecipe, setRandomRecipe] = useState<RecipeInfoType | null>(null);

  const {setWatchHistory} = useContext(watchHistoryContext)!;
  const debouncedSearchText = useDebounce(query, 500);
  const navigate = useNavigate();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  const fetchRecipeData = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await axios.get<RecipeResponse>(
        searchMeal(debouncedSearchText)
      );
      setLoading(false);
      setRecipes(response?.data?.meals);
      if (!response?.data?.meals?.length) {
        setErrorMsg('No results found! Try with different search term.');
      } else {
        setErrorMsg('');
      }
      console.log(response);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const fetchRandomRecipe = async (): Promise<void> => {
    setLoadingRandomRecipe(true);
    try {
      const response = await axios.get(randomMeal);
      setRandomRecipe(response?.data?.meals[0]);
      setLoadingRandomRecipe(false);
      console.log(response, 'asfa');
    } catch (error) {
      setLoadingRandomRecipe(false);
      console.log(error);
    }
  };

  const handleRecipeCardClick = (recipe: RecipeInfoType) => {
    setWatchHistory((prev: RecipeInfoType[]) => {
      const updatedHistory = [
        recipe,
        ...prev.filter((r) => r?.idMeal !== recipe?.idMeal),
      ].slice(0, 10);
      localStorage?.setItem('watchHistory', JSON.stringify(updatedHistory));
      return updatedHistory;
    });
    navigate(`/recipe/${recipe?.idMeal}`);
  };

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * homepageImages.length);
    return setRandomHomeImage(homepageImages[randomIndex]);
  };

  const handleScrollToRecipe = (): void => {
    const element = document.getElementById('today-recipe');
    if (element) {
      element.scrollIntoView({behavior: 'smooth'});
    }
  };

  useEffect(() => {
    if (debouncedSearchText) fetchRecipeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchText]);

  useEffect(() => {
    getRandomImage();
    fetchRandomRecipe();
  }, []);

  return (
    <>
      <div className="bg-white min-h-screen dark:bg-slate-900">
        <div
          className="h-96 sm:h-screen bg-cover bg-center w-full flex flex-col items-center gap-16 justify-center px-12 py-8"
          style={{
            backgroundImage: `url(${randomHomeImage})`,
          }}
        >
          <motion.p
            className="text-4xl sm:text-5xl md:text-8xl font-bold text-white  font-poppins drop-shadow-xl w-full text-center"
            initial={{x: '-100%'}}
            animate={{x: 0, rotate: [0, -5, 5, -5, 0]}}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              delay: 0.5,
            }}
          >
            Discover tasty recipes everyday
          </motion.p>
          <button
            onClick={handleScrollToRecipe}
            className="relative w-2/3 sm:w-1/3 inline-flex overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full  px-3 py-2 sm:py-4 cursor-pointer items-center justify-center rounded-full bg-slate-950 hover:bg-slate-800 duration-300 text-sm sm:text-3xl font-medium text-white backdrop-blur-3xl">
              Chef's Special
            </span>
          </button>
        </div>

        <div className="flex flex-col gap-8 px-4 sm:px-8 md:px-12 py-8 items-center text-gray-500 dark:text-white">
          <p className="text-xl sm:text-4xl md:text-5xl font-bold font-poppins">
            Search Your Favourite Recipes
          </p>
          <div className="flex justify-center items-center border-2 border-gray-500 dark:border-white rounded-full w-full sm:w-6/11">
            <input
              id="target-section"
              type="text"
              placeholder="Search..."
              className="outline-none px-6 w-full h-12 sm:h-14 md:h-16 rounded-full dark:text-white"
              onChange={handleSearchChange}
            />
          </div>

          {errorMsg ? (
            <div className="text-sm sm:text-xl text-white">
              <p className="font-poppins text-gray-500 dark:text-white text-center">
                {errorMsg}
              </p>
            </div>
          ) : null}

          {!recipes?.length && !loading ? (
            <div>
              <p className="text-lg sm:text-2xl md:text-3xl font-poppins text-gray-500 dark:text-white text-center">
                Your culinary adventure starts with a simple search!
              </p>
              <img
                src={'/assets/search-alt.png'}
                className="w-auto sm:w-2/5 object-cover object-center rounded-md h-44 sm:h-80 mx-auto my-0 sm:my-6"
                alt="meal-img"
              />
            </div>
          ) : loading ? (
            <div className="flex flex-wrap justify-center items-start gap-5 sm:gap-7 md:gap-7 max-w-full sm:max-w-11/12 px-4 sm:px-4 py-4 sm:py-8">
              {[0, 1, 2, 3, 4, 5]?.map((r) => (
                <div
                  key={r}
                  className="dark:bg-slate-700 relative cursor-pointer rounded-md shadow-new h-[450px] min-w-full sm:min-w-[200px] md:min-w-[220px] lg:min-w-[320px]"
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
                  className="dark:bg-slate-700 relative cursor-pointer rounded-md shadow-new h-[450px] min-w-[150px] sm:min-w-[200px] md:min-w-[220px] lg:min-w-[320px] hover:scale-110 ease-in-out duration-300"
                >
                  <img
                    src={r?.strMealThumb ? r?.strMealThumb : 'no-img.jpg'}
                    className="w-full object-cover object-center rounded-tl-md rounded-tr-md h-3/5"
                    alt="meal-img"
                  />
                  <div className="p-4 flex flex-col gap-2">
                    <p className="text-gray-500 dark:text-white font-semibold mx-auto text-lg truncate w-[300px]">
                      {r?.strMeal}
                    </p>
                    <div className="border text-gray-200 dark:text-white w-full"></div>
                    <div className="flex gap-4 mx-auto">
                      <div className="flex gap-1 items-center text-gray-500 dark:text-white">
                        <BiWorld /> <p className="text-sm">{r?.strArea}</p>
                      </div>
                      <div className="flex gap-1 items-center text-gray-500 dark:text-white">
                        <MdCategory />{' '}
                        <p className="text-sm">{r?.strCategory}</p>
                      </div>
                    </div>
                    <a
                      href={r?.strSource}
                      onClick={(e) => e.stopPropagation()}
                      target="_blank"
                      className="text-sm text-gray-500 hover:text-gray-700 dark:text-white mx-auto flex gap-1 items-center"
                    >
                      <FiExternalLink /> Source
                    </a>
                    <button className="cursor-pointer w-1/2 mx-auto text-xs rounded-md px-4 py-2 bg-gray-400 hover:bg-gray-500 duration-300 ease-in-out text-white">
                      View Recipe
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          id="today-recipe"
          className="w-full pt-1 pb-4 sm:py-8 md:py-12 flex flex-col items-center justify-center gap-4"
        >
          <p className="text-gray-500 dark:text-white text-2xl sm:text-4xl md:text-5xl mb-0 sm:mb-6">
            Today's recipe
          </p>
          {loadingRandomRecipe ? (
            <div className="flex flex-col sm:flex-row items-center h-auto shadow-new rounded-md w-11/12 sm:w-8/12 text-gray-500 font-poppins cursor-pointer">
              <div className="bg-slate-300 animate-pulse w-full sm:w-2/5 h-96 rounded-tl-md rounded-tr-md sm:rounded-tr-none rounded-bl-none sm:rounded-bl-md"></div>
              <div className="w-full sm:w-3/5 flex flex-col gap-2 sm:gap-6 p-6">
                <p className="w-1/2 h-8 bg-slate-300 animate-pulse"></p>
                <p className="w-1/3 h-6 bg-slate-300 animate-pulse"></p>
                <p className="w-1/3 h-6 bg-slate-300 animate-pulse"></p>
              </div>
            </div>
          ) : (
            <div
              onClick={() =>
                randomRecipe && handleRecipeCardClick(randomRecipe)
              }
              className="flex flex-col sm:flex-row items-center h-auto shadow-new rounded-md w-11/12 sm:w-8/12 dark:bg-slate-700 text-gray-500 dark:text-white font-poppins cursor-pointer"
            >
              <div className="w-full sm:w-2/5 h-full">
                <img
                  src={randomRecipe?.strMealThumb || 'no-img.jpg'}
                  className="w-full h-full object-cover object-center rounded-tl-md rounded-tr-md sm:rounded-tr-none rounded-bl-none sm:rounded-bl-md"
                  alt="meal-img"
                />
              </div>
              <div className="w-full sm:w-3/5 flex flex-col gap-2 sm:gap-6 p-6">
                <p className="text-xl sm:text-2xl">{randomRecipe?.strMeal}</p>
                <p className="text-xs sm:text-sm">
                  {limitText(randomRecipe?.strInstructions, 100)}
                </p>
                <p className="text-sm sm:text-base truncate w-64 sm:w-80">
                  {randomRecipe?.strTags}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
