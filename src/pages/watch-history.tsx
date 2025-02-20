import {useContext} from 'react';
import {watchHistoryContext} from '../App';
import {useNavigate} from 'react-router-dom';

const WatchHistory = () => {
  const navigate = useNavigate();
  const {watchHistory} = useContext(watchHistoryContext);

  const handleHistoryCardClick = (mealId) => {
    navigate(`/recipe/${mealId}`);
  };

  return (
    <>
      <div className="flex flex-col gap-4 items-center my-4">
        <h1 className="text-4xl font-bold font-poppins text-gray-500">
          Watch History
        </h1>
        <div className="pb-10 w-full mx-auto flex flex-col justify-center items-center gap-5">
          {watchHistory?.map((data) => {
            return (
              <>
                <div
                  onClick={() => handleHistoryCardClick(data?.idMeal)}
                  className="bg-gray-200 rounded-lg w-3/5 flex gap-4 items-center shadow-lg p-2 hover:scale-105 duration-200 cursor-pointer"
                >
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
                    <p className="truncate w-96">{data?.strMeal}</p>
                    <p className="text-xs text-gray-700">
                      Category: {data?.strCategory}
                    </p>
                    <p className="text-xs text-gray-700">
                      Area: {data?.strArea}
                    </p>
                  </div>
                  <iframe
                    className="ml-auto w-14 sm:w-16 md:w-20 lg:w-24 object-cover object-center rounded-lg h-14 sm:h-16 md:h-20 lg:h-24"
                    src={data?.strYoutube}
                    title="W3Schools Free Online Web Tutorials"
                  ></iframe>
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
