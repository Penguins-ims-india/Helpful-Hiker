
import React, { useState } from 'react';
import axios from 'axios';
import HikeFav from './HikeFav.jsx';
import { TextField, Button, Autocomplete, Box , Typography} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const HikeFavList = ({ favHikes, getFavHikes, allTags }) => {

  const [filter, setFilter] = useState('all');
  const [input, setInput] = useState('');

  const changeFilter = (newFilter) => {
    if (favHikes.hasOwnProperty(newFilter)) { setFilter(newFilter); }
  };

const HikeFavList = ({ favHikes, getFavHikes }) => {
  const [date, setDate] = useState('');
  const handleDateInput = (e) => {
    setDate(e.target.value);
  const handleChange = (e, newValue) => {
    setInput(newValue);
  };

  const handleSubmit = (e = {}) => {
    if (e.type === 'keydown' && e.which !== 13) { return }
    if (e.type === 'keydown' && e.which === 13) { handleSubmit() }
    changeFilter(input);
    setInput('');
  };

  const filteredHikes = favHikes[filter] || [];

  return (
    <div className="fav-hike-list">
      <Box sx={{width: 1/4, display: 'flex', flexDirection:'row', marginLeft: 3}}>
        <Autocomplete
          sx={{width: 9/10}}
          disablePortal
          options={allTags.map(tag => tag.name)}
          getOptionLabel={tag => tag}
          renderInput={(params) => (
            <TextField
              {...params}
              variant='filled'
              label="Search by Tag"
            />
          )}
          value={input}
          inputValue={input}
          onInputChange={handleChange}
          onKeyDown={handleSubmit}
          onChange={handleChange}
         />
        <Button variant='contained' sx={{backgroundColor:'lightgreen'}} onClick={() => {changeFilter(input)}}><SearchIcon sx={{color:'black'}} /></Button>
      </Box>
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
    </>
  )
}

export default HikeFavList;
