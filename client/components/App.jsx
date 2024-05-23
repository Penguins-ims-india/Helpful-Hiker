import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './Home.jsx';
import Hikes from './hikes/Hikes.jsx';
import Login from './Login.jsx';
import Plants from './plants/Plants.jsx';
import PackingList from './packing/PackingList.jsx';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/plants' element={<Plants />} />
        <Route path='/hikes' element={<Hikes />} />
        <Route path='/packing-lists' element={<PackingList />} />
      </Routes>
    </>
  );
};

export default App;
