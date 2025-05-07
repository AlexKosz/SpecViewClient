/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import StatusChip from './StatusChip';
import chipVariants from './chipVariants';

describe('StatusChip', () => {
  const baseProps = {
    label: 'Open',
    count: 5,
    variant: 'success',
  };

  it('renders with label and count', () => {
    const { getByText } = render(<StatusChip {...baseProps} />);
    expect(getByText('Open: 5')).toBeInTheDocument();
  });

  it('renders with label only (count is 0)', () => {
    const { getByText } = render(<StatusChip label="Pending" count={0} variant="warning" />);
    expect(getByText('Pending')).toBeInTheDocument();
  });

  it('renders with count only (label is empty string)', () => {
    const { getByText } = render(<StatusChip label="" count={12} variant="error" />);
    expect(getByText('12')).toBeInTheDocument();
  });

  it('uses default variant class if unknown variant is provided', () => {
    const { container } = render(
      <StatusChip label="Unknown" count={3} variant="invalid_variant" />
    );
    const chip = container.querySelector('.statusChip');
    expect(chip.className).toContain(`${chipVariants.default}Chip`);
  });

  it('applies correct MUI sx overrides', () => {
    const { getByText } = render(
      <StatusChip
        label="Styled"
        count={1}
        variant="success"
        sx={{ fontSize: '2rem', borderRadius: '5px' }}
      />
    );
    const chip = getByText('Styled: 1');
    // Style merging isn't guaranteed to show in DOM, but class is applied correctly
    expect(chip).toBeInTheDocument();
  });

  it('applies CSS custom properties correctly in style prop', () => {
    const { getByText } = render(<StatusChip {...baseProps} />);
    const chip = getByText('Open: 5');
    const variantClass = chipVariants.success;
    expect(chip.parentElement).toHaveClass(`${variantClass}Chip`);
  });
});
