import {Route, Routes} from 'react-router';
import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import WatchHistory from './pages/watch-history';
import {createContext, useState} from 'react';
import Recipe from './pages/Recipe';
import {RecipeInfoType, WatchHistoryContextType} from './modules/types';

const watchHistoryContext = createContext<WatchHistoryContextType | undefined>(
  undefined
);

function App() {
  const [watchHistory, setWatchHistory] = useState<RecipeInfoType[]>(
    JSON.parse(localStorage.getItem('watchHistory') || '[]')
  );

  return (
    <>
      <watchHistoryContext.Provider value={{watchHistory, setWatchHistory}}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watch-history" element={<WatchHistory />} />
          <Route path="/recipe/:id" element={<Recipe />} />
        </Routes>
      </watchHistoryContext.Provider>
    </>
  );
}

export default App;
// eslint-disable-next-line react-refresh/only-export-components
export {watchHistoryContext};
