import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import validateUploadedJSON from '../../../utils/validateUploadedJSON';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const UploadModal = ({ open, onClose, onUpload }) => {
  const [fileContent, setFileContent] = useState(null);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // Validate file type
      if (selectedFile.type !== 'application/json') {
        setError('Only JSON files are allowed.');

        setFileName('');
        return;
      }

      // Validate file size
      if (selectedFile.size > MAX_FILE_SIZE) {
        setError('File size must not exceed 5 MB.');

        setFileName('');
        return;
      }

      // Read the file content
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result); // Parse the file content as JSON
          const isValidJSONFormat = validateUploadedJSON(json); // Validate the JSON structure
          if (!isValidJSONFormat) {
            setError('Invalid JSON file format.');
            setFileName('');
            return;
          }

          // If valid, set the file and clear errors
          setFileContent(json);
          setFileName(selectedFile.name);
          setError('');
        } catch (err) {
          setError('Invalid JSON file content.');

          setFileName('');
        }
      };
      reader.readAsText(selectedFile); // Read the file as text
    }
  };

  const handleUpload = () => {
    if (fileContent) {
      onUpload({ ...fileContent, name: fileName });
      setFileName('');
      setError('');
      onClose();
    } else {
      setError('Please select a valid file to upload.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Upload JSON File</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            type="file"
            onChange={handleFileChange}
            slotProps={{
              htmlInput: { accept: 'application/json' }, // Restrict to JSON files
            }}
            error={!!error} // Highlight the field if there's an error
            helperText={error} // Display the error message below the field
          />
          {fileName && !error && (
            <Typography variant="body2" color="textSecondary">
              Selected File: {fileName}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleUpload} variant="contained" color="primary" disabled={!fileContent}>
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadModal;

UploadModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpload: PropTypes.func.isRequired,
};
