import {useContext} from 'react';
import {watchHistoryContext} from '../App';
import {useNavigate} from 'react-router-dom';
import {FiExternalLink} from 'react-icons/fi';
import {FaPlay} from 'react-icons/fa';
import {Recipe} from '../modules/types';

const WatchHistory = () => {
  const navigate = useNavigate();
  const {watchHistory} = useContext(watchHistoryContext)!;

  const handleHistoryCardClick = (mealId: string) => {
    navigate(`/recipe/${mealId}`);
  };

  return (
    <>
      <div className="flex flex-col gap-4 items-center my-4">
        <h1 className="text-2xl sm:text-4xl font-bold font-poppins text-gray-500">
          Watch History
        </h1>
        <div className="pb-10 w-full mx-auto flex flex-col justify-center items-center gap-5">
          {watchHistory?.map((data: Recipe) => {
            return (
              <>
                <div
                  onClick={() => handleHistoryCardClick(data?.idMeal)}
                  className="bg-gray-200 rounded-lg w-11/12 sm:w-3/5 flex items-center justify-between shadow-lg p-2 hover:scale-105 duration-200 cursor-pointer"
                >
                  <div className="flex gap-4 items-center w-11/12">
                    <img
                      src={`${
                        data?.strMealThumb
                          ? `${data?.strMealThumb}`
                          : 'no-img.jpg'
                      }`}
                      className="w-14 sm:w-16 md:w-20 lg:w-24 object-cover object-center rounded-lg h-14 sm:h-16 md:h-20 lg:h-24"
                      alt="history-image"
                    />
                    <div>
                      <p className="truncate sm:w-96 text-sm sm:text-base">
                        {data?.strMeal}
                      </p>
                      <p className="text-xs text-gray-700">
                        Category: {data?.strCategory}
                      </p>
                      <p className="text-xs text-gray-700">
                        Area: {data?.strArea}
                      </p>
                    </div>
                  </div>

                  <div className="w-1/12 flex flex-col sm:flex-row justify-center gap-2 sm:gap-6 items-center sm:pr-10">
                    <a
                      href={data?.strYoutube}
                      onClick={(e) => e.stopPropagation()}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Watch recipe"
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FaPlay className="text-sm sm:text-xl" />
                    </a>
                    <a
                      href={data?.strSource}
                      onClick={(e) => e.stopPropagation()}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View Source"
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FiExternalLink className="text-sm sm:text-xl" />
                    </a>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default WatchHistory;
