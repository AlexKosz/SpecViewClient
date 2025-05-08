// filesSlice.test.js

import reducer, { setActiveFile } from './filesSlice';

describe('filesSlice', () => {
  const initialState = {
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
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('should handle setActiveFile', () => {
    const payload = {
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
      success: false,
      testResults: [{ title: 'Example Test', status: 'failed' }],
      wasInterrupted: false,
    };

    const nextState = reducer(initialState, setActiveFile(payload));
    expect(nextState.activeFile).toEqual(payload);
  });
});
