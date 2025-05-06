import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useDispatch } from 'react-redux';
import LoginModal from './LoginModal';
import { updateUserInfo } from '../../features/user/userSlice';

jest.mock('../../utils/apiRequests/axiosWrapper', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('LoginModal', () => {
  let dispatch;
  const mockAxiosWrapper = jest.requireMock('../../utils/apiRequests/axiosWrapper').default;

  beforeEach(() => {
    dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    mockAxiosWrapper.mockClear();
  });

  it('renders correctly', () => {
    render(<LoginModal onClose={jest.fn()} switchToRegister={jest.fn()} />);

    // Check if modal components are rendered
    expect(screen.getByLabelText(/Login/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('should handle form input change', () => {
    render(<LoginModal onClose={jest.fn()} switchToRegister={jest.fn()} />);

    // Simulate user typing into email and password fields
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

    // Assert the state updates correctly
    expect(screen.getByLabelText(/email/i).value).toBe('test@example.com');
    expect(screen.getByLabelText(/password/i).value).toBe('password123');
  });

  it('should display an error message when login fails', async () => {
    mockAxiosWrapper.mockResolvedValueOnce({ data: { msg: 'Invalid credentials' } });

    render(<LoginModal onClose={jest.fn()} switchToRegister={jest.fn()} />);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Wait for error message to appear
    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });

  it('should dispatch updateUserInfo and close modal when login is successful', async () => {
    mockAxiosWrapper.mockResolvedValueOnce({ data: { _id: '123' } });

    render(<LoginModal onClose={jest.fn()} switchToRegister={jest.fn()} />);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Wait for the dispatch to be called
    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith(updateUserInfo({ data: { _id: '123' } }));
    });
  });

  it('should switch to register page when Register button is clicked', () => {
    const switchToRegister = jest.fn();
    render(<LoginModal onClose={jest.fn()} switchToRegister={switchToRegister} />);

    fireEvent.click(screen.getByText(/register/i));

    // Assert the switchToRegister function is called
    expect(switchToRegister).toHaveBeenCalled();
  });
});
