import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import styles from '../style/colors';
const {textColor, backgroundColor} = styles;

const Nav = () => {
  return (
    <Box
      padding={1}
      sx={{ gap: '20px', display: 'flex', alignContent: 'center' }}
    >
      <Link to='/wildlife'>
        <Button variant='contained' type='submit' sx={backgroundColor}>
          WildLife Info
        </Button>
      </Link>
      <Link to='/plants'>
        <Button variant='contained' type='submit' sx={backgroundColor}>
          Plant Info
        </Button>
      </Link>
      <Link to='/hike'>
        <Button variant='contained' type='submit' sx={backgroundColor}>
          Hike Info
        </Button>
      </Link>
      <Link to='/calender'>
        <Button variant='contained' type='submit' sx={backgroundColor}>
          Planning
        </Button>
      </Link>
      <Link to='/packing-lists'>
        <Button variant='contained' type='submit' sx={backgroundColor}>
          Packing Lists
        </Button>
      </Link>
    </Box>
  );
};

export default Nav;
