import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Box, Button, Typography, TextField } from '@mui/material';
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
          const json = JSON.parse(e.target.result);
          const isValidJSONFormat = validateUploadedJSON(json);
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
      reader.readAsText(selectedFile);
    }
  };

  const handleUpload = () => {
    if (fileContent && fileName.trim()) {
      onUpload({ ...fileContent, name: fileName });
      setFileName('');
      setError('');
      onClose();
    } else {
      setError('Please select a valid file and provide a name.');
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="upload-modal-title"
      aria-describedby="upload-modal-description"
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
          id="upload-modal-title"
          variant="h6"
          sx={{
            color: 'var(--highlight-color)',
            textAlign: 'center',
            mb: 2,
          }}
        >
          Upload JSON File
        </Typography>

        {error && (
          <Typography color="var(--error-bg-color)" sx={{ mb: 2, textAlign: 'center' }}>
            {error}
          </Typography>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            variant="outlined"
            component="label"
            sx={{
              color: 'var(--text-color)',
              borderColor: 'var(--text-color)',
              '&:hover': {
                borderColor: 'var(--highlight-color)',
                color: 'var(--highlight-color)',
              },
            }}
          >
            Choose File
            <input type="file" hidden accept="application/json" onChange={handleFileChange} />
          </Button>

          <TextField
            label="File Name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            fullWidth
            disabled={!fileContent || error}
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
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{
              width: '120px',
              color: 'gray',
              borderColor: 'gray',
              '&:hover': {
                color: 'darkgray',
                borderColor: 'darkgray',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            variant="contained"
            disabled={!fileContent || !fileName.trim()}
            sx={{
              width: '120px',
              backgroundColor:
                fileContent && fileName.trim()
                  ? 'var(--button-bg)'
                  : 'var(--button-disabled-bg-red)',
              color: 'white',
              '&:hover': {
                backgroundColor:
                  fileContent && fileName.trim()
                    ? 'var(--button-hover-bg)'
                    : 'var(--button-disabled-bg)',
              },
            }}
          >
            Go to Preview
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

UploadModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpload: PropTypes.func.isRequired,
};

export default UploadModal;
