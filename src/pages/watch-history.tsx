import {useContext} from 'react';
import {watchHistoryContext} from '../App';

const WatchHistory = () => {
  const {watchHistory} = useContext(watchHistoryContext);
  return (
    <>
      <div>
        {watchHistory?.map((data) => {
          return (
            <>
              <p>{data?.strMeal}</p>
            </>
          );
        })}
      </div>
    </>
  );
};

export default WatchHistory;
