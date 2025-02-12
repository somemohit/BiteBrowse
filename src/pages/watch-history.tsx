import {useContext} from 'react';
import {watchHistoryContext} from '../App';

const WatchHistory = () => {
  const {watchHistory} = useContext(watchHistoryContext);
  return (
    <>
      <div className="flex flex-col gap-4 items-center my-4">
        <h1 className="text-3xl font-bold">Watch History</h1>
        {watchHistory?.map((data) => {
          return (
            <>
              <div className="bg-gray-200 rounded-lg w-3/5 flex gap-4 items-center shadow-lg p-2 hover:scale-105 duration-200 cursor-pointer">
                <img
                  src={`${
                    data?.strMealThumb ? `${data?.strMealThumb}` : 'no-img.jpg'
                  }`}
                  className="w-14 sm:w-16 md:w-20 lg:w-24 object-cover object-center rounded-lg h-14 sm:h-16 md:h-20 lg:h-24"
                  alt="movie-image"
                />
                <div>
                  <p className='truncate w-96'>{data?.strMeal}</p>
                  <p className="text-xs text-gray-700">
                    Category: {data?.strCategory}
                  </p>
                  <p className="text-xs text-gray-700">Area: {data?.strArea}</p>
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
    </>
  );
};

export default WatchHistory;
