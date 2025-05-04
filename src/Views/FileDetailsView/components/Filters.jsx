import PropTypes from 'prop-types';
import React from 'react';
import Popover from '@mui/material/Popover';
import {
  TextField,
  InputAdornment,
  Typography,
  Checkbox,
  FormControlLabel,
  Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';

const Filters = ({ filterData, setFilterData }) => {
  const setSearchTerm = (searchTerm) => {
    setFilterData((prevState) => ({
      ...prevState,
      searchTerm,
    }));
  };

  const setOption = (key, value) => {
    setFilterData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Filters
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        slotProps={{
          paper: {
            sx: {
              p: 2,
            },
          },
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search..."
          value={filterData?.searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            mb: 3,
            bgcolor: 'white',
            input: { color: 'black' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'gray' },
              '&:hover fieldset': { borderColor: 'black' },
              '&.Mui-focused fieldset': { borderColor: 'blue' },
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Typography gutterBottom>Select fields to search:</Typography>
        <Box display="flex" flexDirection="column">
          <FormControlLabel
            control={
              <Checkbox
                checked={filterData?.searchFileName || false}
                onChange={(e) => setOption('searchFileName', e.target.checked)}
              />
            }
            label="Filename"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filterData?.searchFolder || false}
                onChange={(e) => setOption('searchFolder', e.target.checked)}
              />
            }
            label="Folder"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filterData?.searchAssertions || false}
                onChange={(e) => setOption('searchAssertions', e.target.checked)}
              />
            }
            label="Assertions"
          />
        </Box>
      </Popover>
    </div>
  );
};

export default Filters;

Filters.propTypes = {
  filterData: PropTypes.shape({
    searchTerm: PropTypes.string,
    searchAssertions: PropTypes.bool,
    searchFileName: PropTypes.bool,
    searchFolder: PropTypes.bool,
  }).isRequired,
  setFilterData: PropTypes.func.isRequired,
};
