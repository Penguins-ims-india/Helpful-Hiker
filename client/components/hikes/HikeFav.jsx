import React, { useState } from 'react';
import axios from 'axios';
import { Button, List, ListItem, ListItemText, TextField } from '@mui/material';
import Weather from '../Weather.jsx';

const HikeFav = ({ favHike, getFavHikes }) => {

  const [newRating, setNewRating] = useState('');

  const { description } = favHike;

  const removeFavHike = () => {

    // delete req to the db
    axios.delete('/api/hikes', {
      data: {
        description,
      }
    })
      .then(() => {
        getFavHikes();
      })
      .catch((err) => {
        console.error('Failed to remove favorite hike', err);
      })

  }

  const handleNewRating = (e) => {
    setNewRating(e.target.value);
  }

  const rateFavHike = () => {

    // patch req to the db
    axios.patch('/api/hikes', {
      hike: {
        description,
        rating: newRating,
      }
    })
      .then(() => {
        getFavHikes();
      })
      .then(() => { setNewRating('') })
      .catch((err) => {
        console.error('Failed to change rating', err);
      })
  }

  return (
    <div>
      <Weather />
      <List>
        <ListItem>
          <ListItemText
            primary={`Name:  ${favHike.description}`}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={`Location:  ${favHike.location}`}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={`Rating:  ${favHike.rating}`}
          />
        </ListItem>
      </List>
      <TextField 
        id="filled-basic"
        label="Rate this hike"
        variant="filled"
        value={ newRating }
        onChange={ handleNewRating }
        type="text"
        placeholder="up to 5"
      />
      <Button variant="outlined" onClick={ rateFavHike } type="button">Rate</Button>
      <Button variant="outlined" onClick={ removeFavHike } type="button">Remove</Button>
    </div>
  )
}

export default HikeFav;