import React from 'react';
import PropTypes from 'prop-types';
import { Chip } from '@mui/material';
import chipVariants from './chipVariants';
import './StatusChip.css';

const StatusChip = ({ label, count, variant }) => {
  const variantClass = chipVariants[variant] || chipVariants.default;

  return (
    <Chip
      label={`${label}: ${count}`}
      variant="outlined"
      sx={{
        mr: 1,
        backgroundColor: `var(--${variantClass}-bg-color)`,
        color: `var(--${variantClass}-text-color)`,
        borderColor: `var(--${variantClass}-text-color)`,
        padding: '1rem',
        borderRadius: '1rem',
        fontWeight: 'bold',
      }}
      className={`${variantClass}Chip statusChip`}
    />
  );
};

StatusChip.propTypes = {
  label: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  variant: PropTypes.string.isRequired,
};

export default StatusChip;
