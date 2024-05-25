import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ToggleButton,
  Box,
  ToggleButtonGroup,
} from '@mui/material';

const ObservationEntry = ({ observation, getObservations }) => {
  const [isSafe, setIsSafe] = useState(0);
  const [message, setMessage] = useState('');

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleIsSafe = (event, newIsSafe) => {
    setIsSafe(newIsSafe);
  };

  const updateReview = () => {
    axios
      .patch(`/api/observations/${observation.id}`, {
        observation: {
          isSafe: !observation.isSafe,
        },
      })
      .then(getObservations)
      .catch((err) => console.error('Failed to Patch safe:', err));
  };

  const deleteObservation = () => {
    const { message, isSafe } = observation;
    axios
      .delete(`/api/observations/${observation.id}`, {
        observation: { message, isSafe },
      })
      .then(getObservations)
      .catch((err) => {
        console.error('Failed to DELETE observation:', err);
      });
  };

  const checkSafe = observation.isSafe > 0 ? '🌳' : '🚫';

  return (
    <Box sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
      <Box sx={{ gap: 20, justifyContent: 'space-evenly' }}>
        <Typography align='left' variant='contained'>
          <Button type='submit' onClick={handleClickOpen}>
            Edit
          </Button>
        </Typography>
        <Typography align='right' variant='contained' gutterBottom>
          {observation.message}
        </Typography>
        <Box>
          <Typography value align='left' variant='contained' gutterBottom>
            Recommend: {checkSafe}
          </Typography>
        </Box>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            handleClose();
          },
        }}
      >
        <DialogTitle>Reviews</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <ToggleButtonGroup
            value={isSafe}
            exclusive
            onChange={handleIsSafe}
            aria-label='safe-selection'
            onSubmit={() => {
              setIsSafe(checkSafe);
            }}
          >
            <ToggleButton
              value='safe'
              onClick={updateReview}
              aria-label='safe-tree'
            >
              🌳
            </ToggleButton>
            <ToggleButton
              value='not-safe'
              onClick={updateReview}
              aria-label='do-not-sign'
            >
              🚫
            </ToggleButton>
          </ToggleButtonGroup>
          <Button size='small' variant='contained' onClick={deleteObservation}>
            🔥
          </Button>
          <Typography align='right' variant='contained' gutterBottom>
            {observation.message}
          </Typography>
          {/* {observation.message} */}
          <TextField
            autoFocus
            value={message}
            margin='dense'
            id='name'
            name='message'
            label={observation.message}
            type='patch'
            fullWidth
            variant='standard'
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type='submit' onClick={updateReview}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ObservationEntry;
