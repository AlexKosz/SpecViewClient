// store.test.js

import store from './store';
import { login, logout, updateUserInfo } from '../features/user/userSlice';
import { setActiveFile } from '../features/files/filesSlice';

describe('Redux Store', () => {
  it('should have an initial state matching the slices', () => {
    const state = store.getState();

    expect(state.user).toEqual({
      isAuthenticated: false,
      userInfo: null,
    });

    expect(state.files).toEqual({
      activeFile: {
        numFailedTestSuites: null,
        numFailedTests: null,
        numPassedTestSuites: null,
        numPassedTests: null,
        numPendingTestSuites: null,
        numPendingTests: null,
        numRuntimeErrorTestSuites: null,
        numTodoTests: null,
        numTotalTestSuites: null,
        numTotalTests: null,
        openHandles: null,
        startTime: null,
        success: null,
        testResults: null,
        wasInterrupted: null,
      },
    });
  });

  it('should handle user login and logout through the store', () => {
    store.dispatch(login({ id: 1, name: 'Alex' }));
    expect(store.getState().user).toEqual({
      isAuthenticated: true,
      userInfo: { id: 1, name: 'Alex' },
    });

    store.dispatch(logout());
    expect(store.getState().user).toEqual({
      isAuthenticated: false,
      userInfo: null,
    });
  });

  it('should handle setting active file through the store', () => {
    const fileData = {
      numFailedTestSuites: 1,
      numFailedTests: 2,
      numPassedTestSuites: 3,
      numPassedTests: 4,
      numPendingTestSuites: 0,
      numPendingTests: 1,
      numRuntimeErrorTestSuites: 0,
      numTodoTests: 0,
      numTotalTestSuites: 4,
      numTotalTests: 7,
      openHandles: [],
      startTime: 162525,
      success: true,
      testResults: [],
      wasInterrupted: false,
    };

    store.dispatch(setActiveFile(fileData));
    expect(store.getState().files.activeFile).toEqual(fileData);
  });

  it('should handle updateUserInfo through the store', () => {
    // First, login with initial user info
    store.dispatch(login({ id: 1, name: 'Alex', email: 'alex@example.com' }));

    // Then, update the user info
    store.dispatch(updateUserInfo({ name: 'Alexander', role: 'admin' }));

    expect(store.getState().user).toEqual({
      isAuthenticated: true,
      userInfo: {
        id: 1,
        name: 'Alexander',
        email: 'alex@example.com',
        role: 'admin',
      },
    });
  });
});
