import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import urls from '../../urls';
import axiosWrapper from '../../utils/apiRequests/axiosWrapper';
import { logout, updateUserInfo } from '../../features/user/userSlice';

import LoginModal from '../Login/LoginModal';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);

  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const onTitleClick = () => {
    navigate(urls.base); // Navigate to the base URL when the title is clicked
  };

  useEffect(() => {
    if (user?.data) {
      return;
    }
    const fetchData = async () => {
      const data = await axiosWrapper({
        method: 'get',
        path: 'users/loggedin',
      });

      if (data?.data?.verified) {
        dispatch(updateUserInfo(data));
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogOut = async () => {
    const data = await axiosWrapper({
      method: 'get',
      path: 'users/logout',
    });

    if (data) {
      navigate('/');
      dispatch(logout());
    }
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
          <img src="/logo.svg" alt="Logo" style={{ height: '24px', marginRight: '8px' }} />
          SpecView
        </Typography>
        {!user?.data && (
          <Button className="MuiButton-root" onClick={() => setIsLoginOpen(true)}>
            Login
          </Button>
        )}
        {user?.data && (
          <Button className="MuiButton-root" onClick={handleLogOut}>
            Logout
          </Button>
        )}
        {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
