import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

const DeleteModal = ({ open, onClose, onConfirm, itemName }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
      PaperProps={{
        sx: {
          bgcolor: 'var(--secondary-bg)',
          color: 'var(--text-color)',
          borderRadius: 1,
        },
      }}
    >
      <DialogTitle id="delete-dialog-title" sx={{ color: 'error.main', textAlign: 'center' }}>
        Confirm Deletion
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="delete-dialog-description"
          sx={{ textAlign: 'center', wordBreak: 'break-word', color: 'inherit' }}
        >
          Are you sure you want to delete <strong>{itemName}</strong>? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" color="error" onClick={onConfirm}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  itemName: PropTypes.string.isRequired,
};

export default DeleteModal;
