import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Card, CardActionArea, Typography, Box, IconButton, Autocomplete} from '@mui/material';
import Tag from './Tag.jsx';
import AddIcon from '@mui/icons-material/Add';

const HikeFav = ({ favHike, getFavHikes }) => {

  const [newRating, setNewRating] = useState('');
  const [anchor, setAnchor] = useState(null)
  const open = Boolean(anchor)
  const { description, id } = favHike;

  const removeFavHike = () => {
    // delete req to the db
    axios.delete('/hikes', {
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
    axios.patch('/hikes', {
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

  const openTagMenu = (e) => {
    if (!open) {
      setAnchor(e.target)
    }
  };

  const closeTagMenu = () => {
    if (open) {
      setAnchor(null)
    }
  }

  const deleteTag = (tagID) => {
    axios.delete(`/hikes/${id}/tags/${tagID}`)
      .then(getFavHikes())
      .catch((err) => {console.error('Cannot delete tag: ', err)})
  };

  return (
    <Card variant='outlined' sx={{width: 3/4, borderColor: 'black'}}>
      <Typography variant='h4'>
        {favHike.description}
      </Typography>
      <Typography variant='p'>
        {favHike.location}
      </Typography>
      <Typography variant='h6' gutterBottom>
        {`Rating:  ${favHike.rating}`}
      </Typography>
      <CardActionArea sx={{marginBottom: 2, alignContent: 'space-evenly'}}>
        <Box>
          <TextField
            id="filled-basic"
            label="Rate this hike"
            variant="filled"
            value={ newRating }
            onChange={ handleNewRating }
            type="text"
            placeholder="up to 5"
          />
          <Button variant="contained" onClick={ rateFavHike } type="button">Rate</Button>
          <Button variant="contained" color='error' onClick={ removeFavHike } type="button">Remove</Button>
        </Box>
      </CardActionArea>
      <Box sx={{marginBottom: 1, flexDirection:'column'}}>
        {favHike.tags.map(tag => <Tag tag={tag} deleteTag={deleteTag}/>)}
        <Autocomplete
          multiple
          getOptionLabel={(option) => option.name}
          options={[{
                "id": 6,
                "name": "Beautiful",
                "color": "aquamarine",
                "createdAt": "2024-05-22T23:15:02.000Z",
                "updatedAt": "2024-05-22T23:15:02.000Z",
                "Hikes_Tags": {
                    "createdAt": "2024-05-22T23:15:02.000Z",
                    "updatedAt": "2024-05-22T23:15:02.000Z",
                    "HikeId": 1,
                    "tagId": 6
                }
            }]}
          renderInput={(params) => (<TextField {...params} placeholder='Tags' />)}
          />
        <IconButton size='small' sx={{backgroundColor: 'lightgrey'}} onClick={openTagMenu} ><AddIcon fontSize='small'/></IconButton>
      </Box>
    </Card>
  )
}

export default HikeFav;