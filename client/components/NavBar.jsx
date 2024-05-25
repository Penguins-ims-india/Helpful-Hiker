import React from "react";
import { AppBar, Container, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <AppBar>
      <Container maxWidth='x1'>
          <NavLink to='/home'>
        <Button sx={{color:'white'}}>
            <h1>Helpful Hiker</h1>
        </Button>
          </NavLink>
      </Container>
    </AppBar>
  )
}

export default NavBar;