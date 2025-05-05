import React, { useState } from 'react';

import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import axiosWrapper from '../../utils/apiRequests/axiosWrapper';
import { updateUserInfo } from '../../features/user/userSlice';

const LoginModal = ({ onClose }) => {
  const [formInfo, setFormInfo] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();

  const [errors, setErrors] = useState(null);

  const changeHandler = (e) => {
    setFormInfo({
      ...formInfo,
      [e.target.name]: e.target.value,
    });
  };

  const login = async (e) => {
    e.preventDefault();
    const data = await axiosWrapper({
      method: 'post',
      path: 'login',
      data: formInfo,
    });

    if (data?.data?._id) {
      dispatch(updateUserInfo(data));
      onClose();
    } else {
      setErrors(data?.data?.msg);
    }
  };

  return (
    <Modal
      open
      onClose={onClose}
      aria-labelledby="login-modal-title"
      aria-describedby="login-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 1,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="login-modal-title" variant="h6" component="h2">
          Login
        </Typography>
        <form onSubmit={login}>
          {errors && <Typography color="error">{errors}</Typography>}
          <div>
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              margin="normal"
              onChange={changeHandler}
            />
          </div>
          <div>
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              onChange={changeHandler}
            />
          </div>
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default LoginModal;

LoginModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
