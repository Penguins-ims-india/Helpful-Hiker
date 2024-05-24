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

const EditObs = ({ observation, deleteObservation, getObservations }) => {
  const [open, setOpen] = useState(false);
  const [isSafe, setIsSafe] = useState(false);
  const [message, setMessage] = useState('');

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
          message: message,
          isSafe: !observation.isSafe,
        },
      })
      .then(getObservations)
      .catch((err) => console.error('Failed to Patch safe:', err));
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
      <Box sx={{ gap: 20, justifyContent: 'space-evenly' }}>
        <Typography align='left' variant='contained'>
          <Button size='small' variant='contained' onClick={deleteObservation}>
            🔥
          </Button>

          <ToggleButtonGroup
            value={isSafe}
            exclusive
            onChange={handleIsSafe}
            aria-label='safe-selection'
            onSubmit={(e) => {
              setIsSafe(e.target.value);
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
        </Typography>
        <Typography align='right' variant='contained' gutterBottom>
          {observation.message}
        </Typography>

        <Typography align='left' variant='contained' gutterBottom>
          {/* {observation.isSafe} places a 1 or 0 for true or false */}
        </Typography>
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
          {/* <Button variant='outlined' onClick={handleEdit}>
            Edit
          </Button> */}
          <Button size='small' variant='contained' onClick={deleteObservation}>
            🔥
          </Button>
          <Typography align='right' variant='contained' gutterBottom>
            {observation.message}
          </Typography>
          {/* {observation.message} */}
          <TextField
            autoFocus
            required
            value={message}
            margin='dense'
            name='message'
            label={observation.message}
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

export default EditObs;
