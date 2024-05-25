import React, { useState } from 'react';
import { Typography, Box } from '@mui/material';
import Weather from '../Weather.jsx';
import HikeSearch from './HikeSearch.jsx';

const Hikes = () => {

  return (
    <Box className="hikes">
      <Typography variant="h2" gutterBottom>
        Hikes
      </Typography>
      <div className="hike-search">
        <Typography variant="h5" gutterBottom>
          Search for trails near you:
        </Typography>
        <HikeSearch />
      </div>
    </Box>
  )
}

export default Hikes;
