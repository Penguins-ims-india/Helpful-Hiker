import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './Home.jsx';
import Hikes from './hikes/Hikes.jsx';
import Login from './Login.jsx';
import Plants from './plants/Plants.jsx';
import PackingList from './packing/PackingList.jsx';
import PackingListItem from './packing/PackingListItem.jsx';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/plants' element={<Plants />} />
        <Route path='/hike' element={<Hikes />} />
        <Route path='/packing-lists' element={<PackingList />} />
        <Route path='/packing-lists/:packingListId' element={<PackingListItem />} />
      </Routes>
    </>
  );
};

export default App;
