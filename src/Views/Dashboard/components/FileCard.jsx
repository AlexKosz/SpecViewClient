import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const FileCard = ({ file }) => {
  //   console.log(file);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {file.name || 'Untitled File'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FileCard;

FileCard.propTypes = {
  file: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};
