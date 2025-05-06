import React from 'react';
import '@testing-library/jest-dom';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DeleteModal from './DeleteModal';

describe('DeleteModal', () => {
  const defaultProps = {
    open: true,
    onClose: jest.fn(),
    onConfirm: jest.fn(),
    itemName: 'Test Item',
  };

  beforeAll(() => {
    const root = document.createElement('div');
    root.setAttribute('id', 'root');
    document.body.appendChild(root);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const theme = createTheme();
  const renderWithTheme = (ui) => render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

  it('should not render modal when `open` is false', () => {
    renderWithTheme(
      <DeleteModal
        open={false}
        onClose={defaultProps.onClose}
        onConfirm={defaultProps.onConfirm}
        itemName={defaultProps.itemName}
      />
    );
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.queryByText(/confirm deletion/i)).toBeNull();
  });

  it('should render modal when `open` is true', () => {
    render(
      <DeleteModal
        open={defaultProps.open}
        onClose={defaultProps.onClose}
        onConfirm={defaultProps.onConfirm}
        itemName={defaultProps.itemName}
      />
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/confirm deletion/i)).toBeInTheDocument();
  });

  it('should display the correct itemName', () => {
    render(
      <DeleteModal
        open={defaultProps.open}
        onClose={defaultProps.onClose}
        onConfirm={defaultProps.onConfirm}
        itemName={defaultProps.itemName}
      />
    );
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
    expect(screen.getByText(/are you sure you want to delete/i)).toHaveTextContent(
      'Are you sure you want to delete Test Item? This action cannot be undone.'
    );
  });

  it('should call onClose when Cancel button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <DeleteModal
        open={defaultProps.open}
        onClose={defaultProps.onClose}
        onConfirm={defaultProps.onConfirm}
        itemName={defaultProps.itemName}
      />
    );
    await user.click(screen.getByRole('button', { name: /cancel/i }));
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('should call onConfirm when Delete button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <DeleteModal
        open={defaultProps.open}
        onClose={defaultProps.onClose}
        onConfirm={defaultProps.onConfirm}
        itemName={defaultProps.itemName}
      />
    );
    await user.click(screen.getByRole('button', { name: /delete/i }));
    expect(defaultProps.onConfirm).toHaveBeenCalledTimes(1);
  });

  it('should have proper accessibility labels', () => {
    render(
      <DeleteModal
        open={defaultProps.open}
        onClose={defaultProps.onClose}
        onConfirm={defaultProps.onConfirm}
        itemName={defaultProps.itemName}
      />
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-labelledby', 'delete-dialog-title');
    expect(dialog).toHaveAttribute('aria-describedby', 'delete-dialog-description');
  });
});
