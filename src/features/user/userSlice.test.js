// userSlice.test.js

import reducer, { login, logout, updateUserInfo } from './userSlice';

describe('userSlice', () => {
  const initialState = {
    isAuthenticated: false,
    userInfo: null,
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('should handle login', () => {
    const payload = { id: 1, name: 'Alex', email: 'alex@example.com' };
    const nextState = reducer(initialState, login(payload));

    expect(nextState.isAuthenticated).toBe(true);
    expect(nextState.userInfo).toEqual(payload);
  });

  it('should handle logout', () => {
    const loggedInState = {
      isAuthenticated: true,
      userInfo: { id: 1, name: 'Alex' },
    };

    const nextState = reducer(loggedInState, logout());

    expect(nextState.isAuthenticated).toBe(false);
    expect(nextState.userInfo).toBeNull();
  });

  it('should handle updateUserInfo', () => {
    const currentState = {
      isAuthenticated: true,
      userInfo: { id: 1, name: 'Alex', email: 'alex@example.com' },
    };

    const updates = { name: 'Alexander', role: 'admin' };

    const nextState = reducer(currentState, updateUserInfo(updates));

    expect(nextState.userInfo).toEqual({
      id: 1,
      name: 'Alexander',
      email: 'alex@example.com',
      role: 'admin',
    });
  });
});
