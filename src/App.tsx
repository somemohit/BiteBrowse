import {Route, Routes} from 'react-router';
import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import WatchHistory from './pages/watch-history';
import {createContext, useState} from 'react';

const watchHistoryContext = createContext('');

function App() {
  const [watchHistory, setWatchHistory] = useState(
    JSON.parse(localStorage.getItem('watchHistory')) || []
  );

  return (
    <>
      <watchHistoryContext.Provider value={{watchHistory, setWatchHistory}}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watch-history" element={<WatchHistory />} />
        </Routes>
      </watchHistoryContext.Provider>
    </>
  );
}

export default App;
export {watchHistoryContext}
