import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import {
  HashRouter, 
  Route,
  Routes
} from 'react-router-dom';

import './App.css';
import Header from './components/Header';
import AllCats from "./components/AllCats";
import FavCats from "./components/FavCats";

function App() {
  const cookies = new Cookies();

  const [cats, setCats] = useState(cookies.get('cookie-cats') ? cookies.get('cookie-cats') : []);
  useEffect( () => {cookies.set('cookie-cats', cats, {path: '/'})}, [] );

  const handleLikeCat = (id) => {
    const updateCats = cats.map(cat => { 
      if (cat.id !== id) {
        return cat;
      }

      return { ...cat, isLiked: cat.isLiked ? false : true };
    });
    setCats(updateCats);
  };

  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Header />}>
            <Route path='allcats' element={<AllCats handleLikeCat={handleLikeCat} cats={cats} setCats={setCats} cookies={cookies} />} />
            <Route path='favscats' element={<FavCats handleLikeCat={handleLikeCat} favCats={ cats.filter(cat => cat.isLiked) } />} />
          <Route 
            path='*'
            element={
              <main className='main'>
                <h1 className="descr">
                  There's nothing here!
                </h1>
              </main>
            }
          >
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;