import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import axiosWrapper from '../../utils/apiRequests/axiosWrapper';
import { updateUserInfo } from '../../features/user/userSlice';

const RegisterModal = ({ onClose, switchToLogin }) => {
  const [formInfo, setFormInfo] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [generalErrors, setGeneralErrors] = useState([]);
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormInfo((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: null }));
  };

  const register = async (e) => {
    e.preventDefault();

    // Client-side check for password match
    if (formInfo.password !== formInfo.confirmPassword) {
      setGeneralErrors(['Passwords do not match.']);
      return;
    }

    const data = await axiosWrapper({
      method: 'post',
      path: 'register',
      data: formInfo,
    });

    if (data?.data?.user?._id) {
      dispatch(updateUserInfo(data?.data?.user));
      onClose();
    } else {
      const respErrors = data?.error?.response?.data?.errors || [];
      const respError = data?.error?.response?.data?.error;

      const fieldErrs = {};
      const genErrs = [];

      if (respError) genErrs.push(respError);

      respErrors.forEach((err) => {
        if (err.param) {
          fieldErrs[err.param] = { message: err.msg };
        } else {
          genErrs.push(err.msg || err);
        }
      });

      setFieldErrors(fieldErrs);
      setGeneralErrors(genErrs);
    }
  };

  return (
    <Modal
      open
      onClose={onClose}
      aria-labelledby="register-modal-title"
      aria-describedby="register-modal-description"
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
          id="register-modal-title"
          variant="h6"
          component="h2"
          sx={{ color: 'var(--highlight-color)', textAlign: 'center', mb: 2 }}
        >
          Register
        </Typography>

        {generalErrors.length > 0 && (
          <ul style={{ color: 'var(--error-bg-color)', paddingLeft: '1rem' }}>
            {generalErrors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}

        <form onSubmit={register}>
          {fieldErrors.fullName && (
            <Typography color="var(--error-bg-color)" sx={{ mb: 1 }}>
              {fieldErrors.fullName.message}
            </Typography>
          )}
          <TextField
            label="Full Name"
            name="fullName"
            type="text"
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
            }}
          />

          {fieldErrors.email && (
            <Typography color="var(--error-bg-color)" sx={{ mb: 1 }}>
              {fieldErrors.email.message}
            </Typography>
          )}
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
            }}
          />

          {fieldErrors.password && (
            <Typography color="var(--error-bg-color)" sx={{ mb: 1 }}>
              {fieldErrors.password.message}
            </Typography>
          )}
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
            }}
          />

          {fieldErrors.confirmPassword && (
            <Typography color="var(--error-bg-color)" sx={{ mb: 1 }}>
              {fieldErrors.confirmPassword.message}
            </Typography>
          )}
          <TextField
            label="Confirm Password"
            name="confirmPassword"
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
            }}
          />

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
            Register
          </Button>

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Already have an account?{' '}
            <Button
              variant="text"
              onClick={switchToLogin}
              sx={{ color: 'var(--highlight-color)', textTransform: 'none' }}
            >
              Log in
            </Button>
          </Typography>
        </form>
      </Box>
    </Modal>
  );
};

RegisterModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  switchToLogin: PropTypes.func.isRequired,
};

export default RegisterModal;
