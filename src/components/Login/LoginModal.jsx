import React, { useState } from 'react';

import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import axiosWrapper from '../../utils/apiRequests/axiosWrapper';
import { updateUserInfo } from '../../features/user/userSlice';

const LoginModal = ({ onClose, switchToRegister }) => {
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
          bgcolor: 'var(--secondary-bg)',
          borderRadius: 1,
          boxShadow: 24,
          p: 4,
          color: 'var(--text-color)',
        }}
      >
        <Typography
          id="login-modal-title"
          variant="h6"
          component="h2"
          sx={{ color: 'var(--highlight-color)', textAlign: 'center', mb: 2 }}
        >
          Login
        </Typography>
        <form onSubmit={login}>
          {errors && (
            <Typography color="var(--error-bg-color)" sx={{ mb: 2, textAlign: 'center' }}>
              {errors}
            </Typography>
          )}
          <div>
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              margin="normal"
              onChange={changeHandler}
              sx={{
                '& .MuiInputLabel-root': { color: 'var(--text-color)' }, // Default label color
                '& .MuiInputLabel-root.Mui-focused': { color: 'var(--highlight-color)' }, // Focused label color
                input: { color: 'var(--text-color)' }, // Input text color
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'var(--text-color)' }, // Default border color
                  '&:hover fieldset': { borderColor: 'var(--highlight-color)' }, // Hover border color
                  '&.Mui-focused fieldset': { borderColor: 'var(--highlight-color)' }, // Focused border color
                },
                '& input:-webkit-autofill': {
                  WebkitBoxShadow: '0 0 0 100px var(--secondary-bg) inset', // Change autofill background
                  WebkitTextFillColor: 'var(--text-color)', // Change autofill text color
                  transition: 'background-color 5000s ease-in-out 0s', // Smooth transition
                },
              }}
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
              sx={{
                '& .MuiInputLabel-root': { color: 'var(--text-color)' }, // Default label color
                '& .MuiInputLabel-root.Mui-focused': { color: 'var(--highlight-color)' }, // Focused label color
                input: { color: 'var(--text-color)' }, // Input text color
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'var(--text-color)' }, // Default border color
                  '&:hover fieldset': { borderColor: 'var(--highlight-color)' }, // Hover border color
                  '&.Mui-focused fieldset': { borderColor: 'var(--highlight-color)' }, // Focused border color
                },
                '& input:-webkit-autofill': {
                  WebkitBoxShadow: '0 0 0 100px var(--secondary-bg) inset', // Change autofill background
                  WebkitTextFillColor: 'var(--text-color)', // Change autofill text color
                  transition: 'background-color 5000s ease-in-out 0s', // Smooth transition
                },
              }}
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: 'var(--button-bg)',
              color: 'white',
              '&:hover': { backgroundColor: 'var(--button-hover-bg)' },
            }}
          >
            Login
          </Button>
          <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
            Don&apos;t have an account?{' '}
            <Button
              variant="text"
              onClick={switchToRegister}
              sx={{ color: 'var(--highlight-color)', textTransform: 'none' }}
            >
              Register
            </Button>
          </Typography>
        </form>
      </Box>
    </Modal>
  );
};

export default LoginModal;

LoginModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  switchToRegister: PropTypes.func.isRequired,
};
