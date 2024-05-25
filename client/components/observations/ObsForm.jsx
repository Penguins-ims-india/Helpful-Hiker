import React, { useState, useRef } from 'react';
import axios from 'axios';
import {
  Button,
  Typography,
  Checkbox,
  TextField,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ToggleButton,
  Box,
  ToggleButtonGroup,
} from '@mui/material';

const safe = () => {
  if (safe) {
    return '🌳';
  } else {
    return '🚫';
  }
};

const ObsForm = ({ getObservations, handleClose }) => {
  // const [isSafe, setIsSafe] = useState();
  const [message, setMessage] = useState('');

  const createObservation = () => {
    // const { message, isSafe } = observation;
    axios
      .post(`/api/observations`, { observation: { message, isSafe: true } })
      .then(() => {
        getObservations();
      })
      .then(() => {
        setMessage('');
      })
      .catch((err) => {
        console.error('Failed to Create Observation:', err);
      });
  };

  return (
    <>
      <DialogTitle>Reviews</DialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>
        <Typography></Typography>
        <Box height={100} width={400}>
          <TextField
            fullWidth
            autoFocus
            required
            value={message}
            margin='dense'
            id='message'
            name='message'
            label='Tell us about your last adventure'
            variant='standard'
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            // onSubmit={safe}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button variant='contained' type='submit' onClick={createObservation}>
          Submit
        </Button>
      </DialogActions>
    </>
  );
};

export default ObsForm;
