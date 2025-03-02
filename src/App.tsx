import {Route, Routes} from 'react-router';
import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import WatchHistory from './pages/watch-history';
import {createContext, useState} from 'react';
import Recipe from './pages/Recipe';
import {
  DarkModeContextType,
  RecipeInfoType,
  WatchHistoryContextType,
} from './modules/types';

const watchHistoryContext = createContext<WatchHistoryContextType | undefined>(
  undefined
);

const darkModeContext = createContext<DarkModeContextType | undefined>(
  undefined
);

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const storedTheme = localStorage.getItem('selectedTheme');
    return storedTheme ? JSON.parse(storedTheme) : false;
  });
  const [watchHistory, setWatchHistory] = useState<RecipeInfoType[]>(
    JSON.parse(localStorage.getItem('watchHistory') || '[]')
  );

  return (
    <>
      <watchHistoryContext.Provider value={{watchHistory, setWatchHistory}}>
        <darkModeContext.Provider value={{darkMode, setDarkMode}}>
          <div className={`${darkMode && 'dark'} bg-white dark:bg-slate-900`}>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/watch-history" element={<WatchHistory />} />
              <Route path="/recipe/:id" element={<Recipe />} />
            </Routes>
          </div>
        </darkModeContext.Provider>
      </watchHistoryContext.Provider>
    </>
  );
}

export default App;
// eslint-disable-next-line react-refresh/only-export-components
export {watchHistoryContext, darkModeContext};
