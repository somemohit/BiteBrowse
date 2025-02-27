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
import {useNavigate} from 'react-router-dom';
import {RecipeInfoType, RecipeResponse} from '../modules/types';

const Home = () => {
  const [recipes, setRecipes] = useState<RecipeInfoType[]>([]);
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
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
      console.log(response);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const fetchRandomRecipe = async (): Promise<void> => {
    try {
      const response = await axios.get(randomMeal);
      setRandomRecipe(response?.data?.meals[0]);
      console.log(response, 'asfa');
    } catch (error) {
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
      <div className="bg-white min-h-screen">
        <div
          className="h-96 sm:h-screen bg-cover bg-center w-full flex flex-col items-center gap-16 justify-center px-12 py-8"
          style={{
            backgroundImage: `url(${randomHomeImage})`,
          }}
        >
          <p className="text-4xl sm:text-5xl md:text-8xl font-bold text-white  font-poppins drop-shadow-xl w-full text-center">
            Discover tasty recipes everyday
          </p>
          <button
            onClick={handleScrollToRecipe}
            className="w-2/3 sm:w-1/3 rounded-full bg-transparent hover:backdrop-blur-md cursor-pointer px-3 py-2 sm:py-4 text-sm sm:text-3xl duration-300 text-white hover:text-white ring-2 ring-white focus:outline-none"
          >
            Chef's Special
          </button>
        </div>

        <div className="flex flex-col gap-8 px-4 sm:px-8 md:px-12 py-8 items-center text-gray-500">
          <p className="text-xl sm:text-4xl md:text-5xl font-bold font-poppins">
            Search Your Favourite Recipes
          </p>
          <div className="flex justify-center items-center border-2 border-gray-500 rounded-full w-full sm:w-6/11">
            <input
              id="target-section"
              type="text"
              placeholder="Search..."
              className="outline-none px-6 w-full h-12 sm:h-14 md:h-16 rounded-full"
              onChange={handleSearchChange}
            />
          </div>

          {!recipes?.length && !loading ? (
            <div>
              <p className="text-lg sm:text-2xl md:text-3xl font-poppins text-gray-500 text-center">
                Your culinary adventure starts with a simple search!
              </p>
              <img
                src={'../src/assets/search-alt.png'}
                className="w-auto sm:w-2/5 object-cover object-center rounded-md h-44 sm:h-80 mx-auto my-0 sm:my-6"
                alt="meal-img"
              />
            </div>
          ) : loading ? (
            <div className="flex flex-wrap justify-center items-start gap-5 sm:gap-7 md:gap-7 max-w-full sm:max-w-11/12 px-4 sm:px-4 py-4 sm:py-8">
              {[0, 1, 2, 3, 4, 5]?.map((r) => (
                <div
                  key={r}
                  className="relative cursor-pointer rounded-md shadow-new h-[450px] min-w-full sm:min-w-[200px] md:min-w-[220px] lg:min-w-[320px]"
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
                      onClick={(e) => e.stopPropagation()}
                      target="_blank"
                      className="text-sm text-gray-500 hover:text-gray-700 mx-auto flex gap-1 items-center"
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
          <p className="text-gray-500 text-2xl sm:text-4xl md:text-5xl mb-2">
            Today's recipe
          </p>
          <div
            onClick={() => randomRecipe && handleRecipeCardClick(randomRecipe)}
            className="flex flex-col sm:flex-row items-center h-auto shadow-new rounded-md w-11/12 sm:w-8/12 text-gray-500 font-poppins cursor-pointer"
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
                {randomRecipe?.strInstructions}
              </p>
              <p className="text-sm sm:text-base">{randomRecipe?.strTags}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
