import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UploadModal from './UploadModal';
import '@testing-library/jest-dom';
import validateUploadedJSON from '../../../utils/validateUploadedJSON';

// Mock the validateUploadedJSON utility
jest.mock('../../../utils/validateUploadedJSON');

describe('UploadModal', () => {
  const onCloseMock = jest.fn();
  const onUploadMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset the mock implementation for each test
    validateUploadedJSON.mockImplementation(() => true);
  });

  test('renders correctly when open', () => {
    render(<UploadModal open onClose={onCloseMock} onUpload={onUploadMock} />);

    expect(screen.getByText(/Upload JSON File/i)).toBeInTheDocument();
    expect(screen.getByText(/Choose File/i)).toBeInTheDocument();
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
    expect(screen.getByText(/Go to Preview/i)).toBeInTheDocument();
  });

  test('shows error when file is not JSON', async () => {
    render(<UploadModal open onClose={onCloseMock} onUpload={onUploadMock} />);

    const fileInput = screen.getByLabelText(/Choose File/i);
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() =>
      expect(screen.getByText(/Only JSON files are allowed/i)).toBeInTheDocument()
    );
  });

  test('shows error when file exceeds size limit', async () => {
    render(<UploadModal open onClose={onCloseMock} onUpload={onUploadMock} />);

    const fileInput = screen.getByLabelText(/Choose File/i);
    const file = new File(['a'.repeat(6 * 1024 * 1024)], 'large-file.json', {
      type: 'application/json',
    });
    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() =>
      expect(screen.getByText(/File size must not exceed 5 MB/i)).toBeInTheDocument()
    );
  });

  test('shows error when JSON is invalid', async () => {
    validateUploadedJSON.mockImplementation(() => false);
    render(<UploadModal open onClose={onCloseMock} onUpload={onUploadMock} />);

    const fileInput = screen.getByLabelText(/Choose File/i);
    const file = new File(['{"invalid": true'], 'invalid.json', { type: 'application/json' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => expect(screen.getByText(/Invalid JSON file content/i)).toBeInTheDocument());
  });

  test('uploads file successfully when all conditions are met', async () => {
    render(<UploadModal open onClose={onCloseMock} onUpload={onUploadMock} />);

    const file = new File([JSON.stringify({ valid: 'data' })], 'valid.json', {
      type: 'application/json',
    });

    const fileInput = screen.getByLabelText(/Choose File/i);
    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByDisplayValue('valid.json')).toBeInTheDocument();
      expect(screen.getByText(/Go to Preview/i)).not.toBeDisabled();
    });
  });
});
