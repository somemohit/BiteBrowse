import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {recipe} from '../modules/ApiLinks';
import axios from 'axios';
import {FaExternalLinkAlt} from 'react-icons/fa';
import {FaPlay} from 'react-icons/fa';

const Recipe = () => {
  const [loading, setLoading] = useState('');
  const [recipeInfo, setRecipeInfo] = useState('');

  const {id} = useParams();

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
  }, [id]);

  return (
    <>
      <div className="flex items-center justify-center my-12">
        <div className="flex flex-col gap-4 p-4 shadow-new rounded-md w-8/12">
          <div className="flex items-center h-auto w-full text-gray-500 font-poppins">
            <div className="w-2/5 h-full">
              <img
                src={recipeInfo?.strMealThumb || 'no-img.jpg'}
                className="w-full h-full object-cover object-center rounded-md"
                alt="meal-img"
              />
            </div>
            <div className="w-3/5 flex flex-col gap-6 p-6">
              <p className="text-2xl">{recipeInfo?.strMeal}</p>
              <p className="text-sm">{recipeInfo?.strInstructions}</p>
              <p className="text-base">{recipeInfo?.strTags}</p>
            </div>
          </div>

          <div className='flex flex-col gap-4'>
            <div className="flex gap-4 items-center">
              <p className="text-gray-500">
                <span className="font-bold">Area: </span>
                {recipeInfo?.strArea}
              </p>
              <p className="text-gray-500">
                <span className="font-bold">Category: </span>
                {recipeInfo?.strCategory}
              </p>
            </div>
            <div className="flex gap-4 items-center">
              {recipeInfo?.strSource ? (
                <a
                  href={recipeInfo?.strSource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-2 text-sm duration-300 text-gray-500 hover:text-white bg-transparent hover:bg-gray-500 rounded-md ring-2 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
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
                  className="inline-flex items-center px-3 py-2 text-sm duration-300 text-gray-500 hover:text-white bg-transparent hover:bg-red-500 rounded-md ring-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                  Watch video
                  <FaPlay className="ml-2 h-4 w-4" />
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Recipe;
