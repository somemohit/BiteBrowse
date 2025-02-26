import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {recipe} from '../modules/ApiLinks';
import axios from 'axios';
import {FaExternalLinkAlt} from 'react-icons/fa';
import {FaPlay} from 'react-icons/fa';
import {MdOutlineKeyboardBackspace} from 'react-icons/md';
import {RecipeInfoType} from '../modules/types';

const Recipe = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [recipeInfo, setRecipeInfo] = useState<RecipeInfoType>();

  const {id} = useParams();
  const navigate = useNavigate();

  const fetchRecipeData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(recipe(id));
      setLoading(false);
      setRecipeInfo(response?.data?.meals[0]);
      console.log(response, 'rec');
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRecipeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center my-6">
          <div className="flex flex-col gap-4 p-4 shadow-new rounded-md w-11/12 sm:w-8/12 text-gray-500">
            <div className="w-full h-80 bg-slate-300 animate-pulse rounded-md"></div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 justify-between items-center">
              <div className="flex gap-4 items-center">
                <p className="bg-slate-300 animate-pulse h-6 w-20 rounded-md"></p>
                <p className="bg-slate-300 animate-pulse h-6 w-20 rounded-md"></p>
              </div>
              <div className="flex gap-4 items-center">
                <div className="bg-slate-300 animate-pulse h-10 w-32 rounded-md"></div>
                <div className="bg-slate-300 animate-pulse h-10 w-32 rounded-md"></div>
              </div>
            </div>

            <div className="w-full flex flex-col gap-2">
              <p className="bg-slate-300 animate-pulse h-8 w-44 rounded-md"></p>
              <p className="bg-slate-300 animate-pulse h-4 w-full rounded-md"></p>
            </div>

            <p className="bg-slate-300 animate-pulse h-4 w-32 rounded-md"></p>
            <div className="space-y-2">
              <div className="bg-slate-300 animate-pulse h-4 w-44 rounded-md"></div>
              <div className="bg-slate-300 animate-pulse h-4 w-44 rounded-md"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative flex items-center justify-center my-3 sm:my-6">
          <button
            onClick={() => navigate(-1)}
            className="absolute -top-6 sm:top-0 left-2 sm:left-20 cursor-pointer text-3xl text-gray-500"
          >
            <MdOutlineKeyboardBackspace />
          </button>
          <div className="flex flex-col gap-4 p-4 shadow-new rounded-md w-11/12 sm:w-8/12 text-gray-500">
            <div className="w-full h-80">
              <img
                src={recipeInfo?.strMealThumb || 'no-img.jpg'}
                className="w-full h-full object-cover object-center rounded-md"
                alt="meal-img"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 justify-between items-center">
              <div className="flex gap-4 items-center">
                <p className="text-sm sm:text-base">
                  <span className="font-bold text-sm sm:text-base">Area: </span>
                  {recipeInfo?.strArea}
                </p>
                <p className=" text-sm sm:text-base">
                  <span className="font-bold text-sm sm:text-base">
                    Category:{' '}
                  </span>
                  {recipeInfo?.strCategory}
                </p>
              </div>
              <div className="flex gap-4 items-center">
                {recipeInfo?.strSource ? (
                  <a
                    href={recipeInfo?.strSource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-2 text-xs sm:text-sm duration-300 hover:text-white bg-transparent hover:bg-gray-500 rounded-md ring-2 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                  >
                    View Source
                    <FaExternalLinkAlt className="ml-2 h-4 w-4" />
                  </a>
                ) : null}

                {recipeInfo?.strYoutube ? (
                  <a
                    href={recipeInfo?.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-2 text-xs sm:text-sm duration-300 hover:text-white bg-transparent hover:bg-red-500 rounded-md ring-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                  >
                    Watch video
                    <FaPlay className="ml-2 h-4 w-4" />
                  </a>
                ) : null}
              </div>
            </div>

            <div className="w-full flex flex-col gap-2">
              <p className="text-base sm:text-2xl">{recipeInfo?.strMeal}</p>
              <p className="text-xs sm:text-sm">
                {recipeInfo?.strInstructions}
              </p>
              {recipeInfo?.strTags ? (
                <p className="text-base">
                  <span className="font-bold">Tags: </span>
                  {recipeInfo?.strTags}
                </p>
              ) : null}
            </div>

            <p className="font-bold">Ingredients</p>
            <div className="flex gap-4 text-sm">
              <ul>
                {Array.from({length: 20}, (_, i) => i + 1)
                  .map((i) => recipeInfo?.[`strIngredient${i}`])
                  .filter(Boolean)
                  .map((ingredient, index) => (
                    <li key={index}>{ingredient} :</li>
                  ))}
              </ul>
              <ul>
                {Array.from({length: 20}, (_, i) => i + 1)
                  .map((i) => recipeInfo?.[`strMeasure${i}`])
                  .filter(Boolean)
                  .map((measure, index) => (
                    <li key={index}>{measure}</li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Recipe;
