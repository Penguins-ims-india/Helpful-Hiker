import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Typography } from '@mui/material';

import HikeResults from './HikeResults.jsx';
import HikeFavList from './HikeFavList.jsx';

const HikeSearch = () => {

  const [input, setInput] = useState('');
  const [results, loadResults] = useState([]);
  const [favHikes, setFavHikes] = useState([]);
  const favHikesRef = useRef(favHikes)

  const handleInput = (e) => {
    setInput(e.target.value);
  }

  const searchHikes = () => {

    axios.post('/hikeSearch', {
      search: {
        location: input,
      }
    })
      .then((hikeResults) => {
        loadResults(hikeResults.data);
      })
      .catch((err) => {
        console.error('Failed to send post req to server', err);
      })
  }

  const getFavHikes = () => {
    axios.get('/hikes')
      .then(({ data }) => {
        setFavHikes(data);
      })
      .catch((err) => {
        console.error('Failed to get favorite hikes', err)
      })
  }

  useEffect(getFavHikes, [favHikesRef])

  return (
    <div className="hike-search">
      <div className="hike-search-form">
        <TextField
          id="filled-basic"
          variant="filled"
          value={ input }
          onChange={ handleInput }
          type="text"
          placeholder="city, state, or zip"
        />
        <Button variant="outlined" onClick={ searchHikes } type="button">Search</Button>
      </div>

      <div className="hike-search-results">
        <Typography variant="h5" gutterBottom>
          Nearby Results
        </Typography>
        <HikeResults results={ results } getFavHikes={ getFavHikes }/>
      </div>
      
      <div className="hike-favs">
        <Typography variant="h5" gutterBottom>
          Favorite Trails
        </Typography>
        <HikeFavList favHikes={ favHikes } getFavHikes={ getFavHikes }/>
      </div>
    </div>
  )
}

export default HikeSearch;