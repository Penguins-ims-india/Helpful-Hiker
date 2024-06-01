import React from 'react';
import axios from 'axios';
import { Button, List, ListItem, ListItemText } from '@mui/material';
import Weather from '../Weather.jsx';

const HikeResult = ({ hike, getFavHikes }) => {

  const { description, location, rating } = hike;

  const addFavHike = () => {

    // post to the db
    axios.post('/api/hikes', {
      hike: {
        description,
        location,
        rating,
      }
    })
      .then(() => {
        getFavHikes();
      })
      .catch(() => {
        console.error('Failed to add favorite hike', err);
      });
  }
  const getLocation = () => {
    axios.get(`/api/weather/${location}`)
    .then(({data}) => {
    })
  }
  
  return (
    <div>
      <List>
        <ListItem>
          <Weather location={location}/>
        </ListItem>
        <ListItem>
          <ListItemText
            primary={`Name:  ${description}`}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={`Location:  ${location}`}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={`Rating:  ${rating}`}
          />
        </ListItem>
      </List>
      <Button variant="outlined" onClick={ addFavHike } type="button">Add Favorite</Button>
    </div>
  )
}

export default HikeResult;