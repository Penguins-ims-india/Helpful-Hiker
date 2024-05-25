import React, {useState} from 'react';
import axios from 'axios';
import HikeFav from './HikeFav.jsx';
import { TextField, Button } from '@mui/material';

const HikeFavList = ({ favHikes, getFavHikes, allTags }) => {

  const [filter, setFilter] = useState('all');
  const [input, setInput] = useState('');

  const changeFilter = (newFilter) => {
    if (favHikes.hasOwnProperty(newFilter)) { setFilter(newFilter); }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    if (e.type === 'keydown' && e.which !== 13) { return }
    changeFilter(input);
    setInput('');
  };

  const filteredHikes = favHikes[filter] || [];

  return (
    <div className="fav-hike-list">
        <TextField
          value={input}
          placeholder='Search by tag'
          onChange={handleChange}
          onKeyDown={handleSubmit}
        />
        <Button onClick={() => {changeFilter(input)}}>Search</Button>
        {filter === 'all' ? <></> : <Button onClick={() => {changeFilter('all')}}>Clear Filter</Button>}
      {
        filteredHikes.map((favHike, i) => {
          return (
            <HikeFav
              favHike={ favHike }
              key={`${favHike}-${i}`}
              getFavHikes={ getFavHikes }
              allTags={allTags}
              changeFilter={changeFilter}
            />
          )
        })
      }
    </div>
  )
}

export default HikeFavList;