import React, { useState } from 'react';
import { Typography } from '@mui/material';
import Weather from '../Weather.jsx';
import HikeSearch from './HikeSearch.jsx';

const Hikes = () => {

  return (
    <div className="hikes">
      <Typography variant="h2" gutterBottom>
        Hikes
      </Typography>
      <div className="hike-search">
        <Typography variant="h5" gutterBottom>
          Search for trails near you:
        </Typography>
        <HikeSearch />
      </div>
    </div>
  )
}

export default Hikes;
