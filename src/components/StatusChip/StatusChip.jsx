import React from 'react';
import PropTypes from 'prop-types';
import { Chip } from '@mui/material';
import chipVariants from './chipVariants';
import './StatusChip.css';

const StatusChip = ({ label, count, variant, sx, testId }) => {
  const variantClass = chipVariants[variant] || chipVariants.default;

  let labelText = '';

  if (!count && label) {
    labelText = label;
  } else if (count && !label) {
    labelText = count;
  } else if (count && label) {
    labelText = `${label}: ${count}`;
  }

  return (
    <Chip
      label={labelText}
      variant="outlined"
      data-testId={testId}
      sx={{
        mr: 1,
        backgroundColor: `var(--${variantClass}-bg-color)`,
        color: `var(--${variantClass}-text-color)`,
        borderColor: `var(--${variantClass}-text-color)`,
        padding: '1rem',
        borderRadius: '1rem',
        fontWeight: 'bold',
        ...sx,
      }}
      className={`${variantClass}Chip statusChip`}
    />
  );
};

StatusChip.propTypes = {
  label: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  variant: PropTypes.string.isRequired,
  sx: PropTypes.shape({}),
  testId: PropTypes.string,
};

StatusChip.defaultProps = {
  sx: {},
  testId: '',
};

export default StatusChip;
