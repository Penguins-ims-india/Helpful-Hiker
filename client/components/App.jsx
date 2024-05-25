import { Routes, Route, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
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
    <Box sx={{marginTop:12}}>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/plants' element={<Plants />} />
        <Route path='/hike' element={<Hikes />} />
      </Routes>
    </Box>
    </>
  );
};

export default App;
