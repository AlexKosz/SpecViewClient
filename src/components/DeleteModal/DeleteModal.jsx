import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Box, Typography, Button, Stack } from '@mui/material';

const DeleteModal = ({ open, onClose, onConfirm, itemName }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-description"
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
        <Typography id="delete-modal-title" variant="h6" textAlign="center" color="error">
          Confirm Deletion
        </Typography>
        <Typography id="delete-modal-description" sx={{ mt: 2, textAlign: 'center' }}>
          Are you sure you want to delete <strong>{itemName}</strong>? This action cannot be undone.
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={onConfirm}>
            Delete
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

DeleteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  itemName: PropTypes.string.isRequired,
};

export default DeleteModal;
