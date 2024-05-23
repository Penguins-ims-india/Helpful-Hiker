import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Typography, TextField, List, ListItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import LinkIcon from '@mui/icons-material/Link';
import { Link } from 'react-router-dom';

const PackingList = () => {
  // packingLists = variable that holds the current state
    // currently an empty array until setPackingLists is called with a new value
  // setPackingLists = used to update packingLists
    // when called, it will trigger a re-render of the component with updated state
  const [packingLists, setPackingLists] = useState([]);
  // newListName = variable that holds the current state aka empty string
  // setNewListName = used to update newListName
  const [newListName, setNewListName] = useState('');

  // useEffect = hook which is used to make a get request to /packingList
  // whatever passed in is executed after every render
  // get request is done when the component mounts and ONLY when it mounts
  // [] = dependency array
  useEffect(() => {
    axios.get('/packingList')
    // response object contains props: data, status, statusText, headers, config
    // we want the data prop and we want it to be assigned to packingLists
      .then((response) => {
        setPackingLists(response.data)
      })
      .catch((err) => {
        console.error('Error getting packing lists', err)
      })
  }, []);

  // add a new packing list and make sure the component's state is updated so the new list is shown
  const handleAdd = () => {
    // send post req to /packingList
    // req body contains object w prop name so we are setting it to newListName
    axios.post('/packingList', { name: newListName })
      .then(() => {
        // setNewListName is called to clear the newListName input
        // reset it to empty string
        setNewListName('');
        // after clearing newListName, get req is sent to /packingList to get the updated lists
        axios.get('/packingList')
          .then((response) => {
            // assign data prop to packingLists by using setPackingLists
            setPackingLists(response.data);
          })
          .catch((err) => {
            console.error('Error getting new packing lists', err);
          })
      })
      .catch((err) => {
        console.error('Error adding new packing list', err);
      })
  };

  // delete a packing list by its id
  const handleDelete = (id) => {
    // send delete req to /packingList/id
    // takes in the specific id of the list we wanna delete
    axios.delete(`/packingList/${id}`)
      .then(() => {
        // filter through the current packingLists
        // check each list's id and if the id does not match the id to delete, add that list to the filter function's array
        setPackingLists(packingLists.filter(list => list.id !== id));
      })
      .catch((err) => {
        console.error('Error deleting packing list', err);
      })
  };

  // update a packing list by its id
  const handleUpdate = (id, newName) => {
    // send put req to /packingList/id taking in the specific id of the list we wanna update
    // req body has a name prop which is set to newName
    axios.put(`/packingList/${id}`, { name: newName })
      .then(() => {
        // map through the current packingLists
        // check each list's id and see if its equal to the id given
        // if it is, create a new object where we make a copy of the current list and update the name property to newName
        // if its not true, leave the list alone
        setPackingLists(packingLists.map(list => list.id === id ? { ...list, name: newName } : list));
      })
      .catch((err) => {
        console.error('Error updating packing list', err);
      });
  };

  return (
    // use box as a wrapper for my styling
    <Box>
      <Typography variant='h4'>Packing Lists</Typography>
      {/* use box to wrap input field and add button */}
      <Box>
        <TextField
          label="New List"
          // set the value of input field to newListName
          value={newListName}
          // update newListName with the current input field value when it changes
          onChange={(event) => setNewListName(event.target.value)}
        />
        {/* call handleAdd function when button is clicked */}
        <Button onClick={handleAdd} variant='contained'>Add List</Button>
      </Box>
      <List>
        {/* map function to iterate over packingLists */}
        {packingLists.map((list) => (
          // give it a key because there will be an error in the browser if there isnt one
            <ListItem key={list.id}>
              {/* create a link to the specific packing list that will eventually hold all my packing list items */}
              <Link to={`/packing-lists/${list.id}`}>
                {/* the link to the specific packing list items will be used through the link icon */}
                <LinkIcon />
              </Link>
              <TextField
                // set value to current name of list
                value={list.name}
                // if the input value changes, call handleUpdate with the id of the list and the new value that was put in the text field aka whatever someone types
                onChange={(event) => handleUpdate(list.id, event.target.value)}
              />
              {/* if the trash can icon is clicked, call handleDelete on the list that was clicked */}
              <IconButton onClick={() => handleDelete(list.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
      </List>
    </Box>
  )
};

export default PackingList;