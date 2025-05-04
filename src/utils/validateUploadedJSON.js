const validateUploadedJSON = (file) => {
  const expectedTypes = {
    numFailedTestSuites: 'number',
    numFailedTests: 'number',
    numPassedTestSuites: 'number',
    numPassedTests: 'number',
    numPendingTestSuites: 'number',
    numPendingTests: 'number',
    numRuntimeErrorTestSuites: 'number',
    numTodoTests: 'number',
    numTotalTestSuites: 'number',
    numTotalTests: 'number',
    openHandles: 'object', // can be [] or {}
    startTime: 'number',
    success: 'boolean',
    testResults: 'array', // explicitly validate as array
    wasInterrupted: 'boolean',
  };

  return Object.entries(expectedTypes).every(([key, expectedType]) => {
    if (!Object.prototype.hasOwnProperty.call(file, key)) {
      return false;
    }

    const value = file[key];

    if (expectedType === 'array') {
      if (!Array.isArray(value)) {
        return false;
      }
      // eslint-disable-next-line valid-typeof
    } else if (typeof value !== expectedType) {
      return false;
    }

    return true;
  });
};

export default validateUploadedJSON;
