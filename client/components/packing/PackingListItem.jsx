import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Typography, TextField, List, ListItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

const PackingListItem = ({ packingListId }) => {
  // packingItems = variable that holds the current state aka empty array
  // setPackingItems = used to update packingItems
  const [packingItems, setPackingItems] = useState([]);
  // newItemName = variable that holds the current state aka empty string
  // setNewItemName = used to update newItemName
  const [newItemName, setNewItemName] = useState('');

  useEffect(() => {

  }, []);

  const getPackingItems = () => {

  };

  const handleAddItem = () => {

  };

  const handleDeleteItem = (itemId) => {

  };

  const handleUpdateItem = (itemId, newName) => {

  };

  return (
    <Box>
      <Typography variant='h4'>Packing List Items</Typography>
    </Box>
  )
}

export default PackingListItem;