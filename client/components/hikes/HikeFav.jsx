import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Card, Typography, Box, IconButton, Menu, MenuItem, Divider} from '@mui/material';
import Weather from '../Weather.jsx';
import Tag from './Tag.jsx';
import AddIcon from '@mui/icons-material/Add';

const HikeFav = ({ favHike, getFavHikes, allTags, changeFilter }) => {

  const [newRating, setNewRating] = useState('');
  const [newTag, setNewTag] = useState('');
  const [anchor, setAnchor] = useState(null);
  const open = Boolean(anchor);
  const { description, id } = favHike;

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

  const deleteTag = (tagID) => {
    axios.delete(`/api/hikes/${id}/tags/${tagID}`)
      .then(getFavHikes)
      .catch((err) => {console.error('Cannot delete tag: ', err)})
  };

  const addTag = (tag) => {
    axios.post(`/api/hikes/${favHike.id}/tags`, {tag})
      .then(getFavHikes)
      .catch((err) => {
        console.error('Could not add tag to hike ', err)
      })
  }

  const handleClick = (e) => {
    setAnchor(e.target);
  };

  const handleClose = () => {
    setAnchor(null)
  }

  const handleInput = (e) => {
    setNewTag(e.target.value);
  }

  return (
    <Card variant='outlined' sx={{width: 3/4, borderColor: 'black'}}>
      <Typography variant='h4'>
        {favHike.description}
      </Typography>
      <Typography variant='p'>
        {favHike.location}
      </Typography>
      <Box sx={{display:'flex', flexDirection:'row'}}>
        <Typography variant='h6' gutterBottom>
          {`Rating:  ${favHike.rating}`}
        </Typography>
            <TextField
              id="filled-basic"
              label="Rate this hike"
              variant="filled"
              value={ newRating }
              onChange={ handleNewRating }
              type="text"
              placeholder="up to 5"
            />
            <Button variant="contained" onClick={ rateFavHike }>Rate</Button>
            <Button variant="contained" color='error' onClick={ removeFavHike }>Remove</Button>
      </Box>
      <Box>
        {favHike.tags.map(tag => <Tag tag={tag} deleteTag={deleteTag} changeFilter={changeFilter} key={tag.id}/>)}
        <IconButton size='small' sx={{backgroundColor: 'lightgrey'}} onClick={handleClick}><AddIcon fontSize='small' /></IconButton>
        <Menu
          anchorEl={anchor}
          open={open}
          onClose={handleClose}
          sx={{maxHeight: 400}}
        >
          {allTags.map(tag => (
            <div key={tag.id}><Tag tag={tag} handleClick={addTag}/></div>
          ))}
          <Divider sx={{margin: 1}} />
          <TextField
            placeholder='New Tag'
            value={newTag}
            onChange={handleInput}
          />
          <MenuItem onClick={() => {addTag({name: newTag})}}>+</MenuItem>
        </Menu>
      </Box>
    </Card>
  )
}

export default HikeFav;