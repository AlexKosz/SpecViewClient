import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import urls from '../../urls';

const Navbar = () => {
  const navigate = useNavigate();

  const onTitleClick = () => {
    navigate(urls.base); // Navigate to the base URL when the title is clicked
  };

  return (
    <AppBar position="static" className="Navbar">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          className="MuiTypography-root"
          onClick={onTitleClick}
        >
          Navbar
        </Typography>
        <Button className="MuiButton-root">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
