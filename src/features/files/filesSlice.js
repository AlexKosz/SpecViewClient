/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

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

export const filesSilce = createSlice({
  name: 'files',
  initialState,
  reducers: {
    setActiveFile: (state, action) => {
      state.activeFile = action.payload;
    },
  },
});

export const { setActiveFile } = filesSilce.actions;

export default filesSilce.reducer;
