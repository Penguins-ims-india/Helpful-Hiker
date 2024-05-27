import React from "react";
import { AppBar, Container, Button, ButtonGroup } from "@mui/material";
import { NavLink } from "react-router-dom";
import TerrainIcon from '@mui/icons-material/Terrain';
import styles from '../style/colors';
const {textColor, backgroundColor} = styles;


const NavBar = () => {
  return (
    <AppBar sx={backgroundColor}>
      <Container maxWidth='x1' sx={{display: 'flex'}}>
        <NavLink to='/home'>
          <Button sx={textColor}>
            <h1>Helpful Hiker</h1><TerrainIcon fontSize="large"/>
          </Button>
        </NavLink>
        <Container sx={{justifySelf:'flex-end', marginLeft:20}}>
            <NavLink to='/hike'>
              <Button sx={textColor}>
                <h2>Hikes</h2>
              </Button>
            </NavLink>
            <NavLink to='/packing-lists'>
              <Button sx={textColor}>
                <h2>Packing</h2>
              </Button>
            </NavLink>
            <NavLink to='/map'>
              <Button sx={textColor}>
                <h2>Map</h2>
              </Button>
            </NavLink>
            <NavLink to='/plants'>
              <Button sx={textColor}>
                <h2>Plants</h2>
              </Button>
            </NavLink>
        </Container>
      </Container>
    </AppBar>
  )
}

export default NavBar;