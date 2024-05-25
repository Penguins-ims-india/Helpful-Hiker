import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import HikeFav from './HikeFav.jsx';

const HikeFavList = ({ favHikes, getFavHikes }) => {
  const [date, setDate] = useState('');
  const handleDateInput = (e) => {
    setDate(e.target.value);
  }

  return (
    <>
      <div >
      {
        favHikes.map((favHike, i) => {
          return (
            <HikeFav
            favHike={ favHike }
            key={`${favHike}-${i}`}
            getFavHikes={ getFavHikes }
            />
          )
        })
      }
    </div>
    </>
  )
}

export default HikeFavList;