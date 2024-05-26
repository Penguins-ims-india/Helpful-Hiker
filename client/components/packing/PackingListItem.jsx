import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Typography, TextField, List, ListItem, IconButton, Checkbox, Paper, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from 'react-router-dom';

const PackingListItem = () => {
  // grabs packingListId from the url
  const { packingListId } = useParams();
  // packingItems = variable that holds the current state
    // currently an empty array until setPackingItems is called with a new value
  // setPackingItems = used to update packingLists
    // when called, it will trigger a re-render of the component with updated state
  const [packingItems, setPackingItems] = useState([]);
  // newItemName = variable that holds current state which is an empty string
  // setNewItemName = when called, will update state
  const [newItemName, setNewItemName] = useState('');
  // newItemQuantity = variable that holds current state which is an empty string
  // setNewItemQuantity = when called, will update state
  const [newItemQuantity, setNewItemQuantity] = useState('');

  // useEffect = hook
  // getPackingItems in is executed after every render
  // if packingListId changes run useEffect
  useEffect(() => {
    getPackingItems();
  }, [packingListId]);

  const getPackingItems = () => {
    // send get request to /packingListItem/whateverIdItIs
    axios.get(`/api/packingListItem/${packingListId}`)
      .then((response) => {
        // set packingItems to be the response.data
        setPackingItems(response.data);
      })
      .catch((err) => {
        console.error('Error getting packing list items', err);
      });
  };

  const handleAddItem = () => {
    // send post request to /packingListItem/whateverIdItIs
    axios.post(`/api/packingListItem/${packingListId}`, {
      // send this data with the post req
      name: newItemName,
      quantity: newItemQuantity,
      packed: false,
      packingListId
    })
    .then(() => {
      // call getPackingItems to update the state
      getPackingItems();
      // clear input fields
      setNewItemName('');
      setNewItemQuantity('');
    })
    .catch((err) => {
      console.error('Error adding new packing list item', err);
    });
  };

  const handleDeleteItem = (itemId) => {
    // send delete request req to /packingListItem/whateverIdItIs
    axios.delete(`/api/packingListItem/${itemId}`)
      .then(() => {
        // filter through the current packingItems
        // check each list's id and if the id does not match the id to delete, add that list to the filter function's array
        setPackingItems(packingItems.filter(item => item.id !== itemId));
      })
      .catch((err) => {
        console.error('Error deleting packing list item', err);
      });
  };

  const handleUpdateItem = (itemId, updatedName, updatedQuantity, updatedPacked) => {
    // empty string means 0 for quantity
    // if updatedQuantity is an empty string make it 0 if not just keep the same value
    const quantity = updatedQuantity === '' ? 0 : updatedQuantity
    // send delete request req to /packingListItem/whateverIdItIs
    axios.put(`/api/packingListItem/${itemId}`, {
      // send this data with the put req
      name: updatedName,
      quantity: quantity,
      packed: updatedPacked,
      packingListId
    })
      // call getPackingItems to update the state
      .then(() => {
        getPackingItems();
      })
      .catch((err) => {
        console.error('Error updating packing list item', err);
      });
  };

  return (
    <Box p={3}>
      <Typography variant='h4'>Packing List Items</Typography>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              // set label of text box to be New Item Name
              label='New Item Name'
              fullWidth
              // set the value of input field to newItemName
              value={newItemName}
              // update newItemName with the current input field value when it changes
              onChange={(event) => setNewItemName(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label='New Item Quantity'
              fullWidth
              value={newItemQuantity}
              onChange={(event) => setNewItemQuantity(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            {/* when Add Item button is clicked, call handleAddItem function */}
            <Button onClick={handleAddItem} variant='contained' fullWidth>Add Item</Button>
          </Grid>
        </Grid>
      </Paper>
      <List>
        {packingItems.map((item) => (
          <Paper key={item.id} elevation={3} sx={{ marginBottom: 2 }}>
            <ListItem>
              <Checkbox
                // if check box is checked, it is associated with the packed property
                checked={item.packed}
                // updates packed prop to whatever the checkbox marker is if it changes
                onChange={(event) => handleUpdateItem(item.id, item.name, item.quantity, event.target.checked)}
              />
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={5}>
                  <TextField
                    // input field is associated with the name property
                    value={item.name}
                    fullWidth
                    // updates name prop to whatever is put in the input field
                    onChange={(event) => handleUpdateItem(item.id, event.target.value, item.quantity, item.packed)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    // input field is associated with the quantity property
                    value={item.quantity}
                    fullWidth
                    // updates quantity prop to whatever is put in the input field
                    onChange={(event) => handleUpdateItem(item.id, item.name, event.target.value, item.packed)}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  {/* deletes item when delete icon is clicked */}
                  <IconButton onClick={() => handleDeleteItem(item.id)} sx={{ backgroundColor: 'lightgreen' }}>
                    <DeleteIcon sx={{ color: 'black' }} />
                  </IconButton>
                </Grid>
              </Grid>
            </ListItem>
          </Paper>
        ))}
      </List>
    </Box>
  );
};

export default PackingListItem;
