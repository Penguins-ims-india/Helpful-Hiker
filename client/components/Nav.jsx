import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Box } from '@mui/material';

const Nav = () => {
  return (
    <Box
      padding={1}
      sx={{ gap: '20px', display: 'flex', alignContent: 'center' }}
    >
      <Link to='/wildlife'>
        <Button variant='contained' type='submit'>
          WildLife Info
        </Button>
      </Link>
      <Link to='/plants'>
        <Button variant='contained' type='submit'>
          Plant Info
        </Button>
      </Link>
      <Link to='/hike'>
        <Button variant='contained' type='submit'>
          Hike Info
        </Button>
      </Link>
      <Link to='/calender'>
        <Button variant='contained' type='submit'>
          Planning
        </Button>
      </Link>
    </Box>
  );
};

export default Nav;
