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
    {/* <div className="hike-date-form">
        <TextField
          id="filled-basic"
          variant="filled"
          value={ date }
          onChange={ handleDateInput }
          type="text"
          placeholder="Start Date"
          />
        <TextField
          id="filled-basic"
          variant="filled"
          value={ date }
          onChange={ handleDateInput }
          type="text"
          placeholder="End Date"
          />
        <Button variant="outlined" type="button">Add</Button>
      </div> */}
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