import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

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
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          className="MuiTypography-root"
          onClick={onTitleClick}
        >
          SpecView
        </Typography>
        <Button className="MuiButton-root">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
