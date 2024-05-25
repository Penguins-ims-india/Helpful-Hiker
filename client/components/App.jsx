import { Routes, Route, useLocation } from 'react-router-dom';
import React from 'react';
import Home from './Home.jsx';
import Hikes from './hikes/Hikes.jsx';
import Login from './Login.jsx';
import Plants from './plants/Plants.jsx';
import NavBar from './NavBar.jsx';

const App = () => {
  const location = useLocation();
  return (
    <>
    {location.pathname === '/' ? <></> : <NavBar /> }
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/plants' element={<Plants />} />
        <Route path='/hike' element={<Hikes />} />
      </Routes>
    </>
  );
};

export default App;
