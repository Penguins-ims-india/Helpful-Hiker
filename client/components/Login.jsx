import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { st } from '../components/observations/styles.js';
import styles from '../style/colors';
const {textColor, backgroundColor} = styles;

const Login = () => {
  return (
    <div>
      <Box sx={st}>
        <Box>
          <h1>Welcome to Helpful Hiker</h1>
          <h2>A one stop shop for hiking safety</h2>
        </Box>
        <form action='/auth/google' method='GET'>
          <h3>Login or Sign up Here</h3>
          <Button variant='contained' type='submit' sx={backgroundColor}>
            Log-in / Sign-up
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default Login;
