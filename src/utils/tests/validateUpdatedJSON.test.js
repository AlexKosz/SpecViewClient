import validateUploadedJSON from '../validateUploadedJSON';

describe('validateUploadedJSON', () => {
  const validInput = {
    numFailedTestSuites: 1,
    numFailedTests: 2,
    numPassedTestSuites: 3,
    numPassedTests: 4,
    numPendingTestSuites: 0,
    numPendingTests: 0,
    numRuntimeErrorTestSuites: 0,
    numTodoTests: 1,
    numTotalTestSuites: 4,
    numTotalTests: 7,
    openHandles: [],
    startTime: 1670000000000,
    success: true,
    testResults: [],
    wasInterrupted: false,
  };

  it('returns true for valid input', () => {
    expect(validateUploadedJSON(validInput)).toBe(true);
  });

  it('returns false if a key is missing', () => {
    const { numFailedTests, ...partialInput } = validInput;
    expect(validateUploadedJSON(partialInput)).toBe(false);
  });

  it('returns false if a key has incorrect type (number -> string)', () => {
    const invalidInput = { ...validInput, numFailedTests: '2' };
    expect(validateUploadedJSON(invalidInput)).toBe(false);
  });

  it('returns false if success is not boolean', () => {
    const invalidInput = { ...validInput, success: 'true' };
    expect(validateUploadedJSON(invalidInput)).toBe(false);
  });

  it('returns false if openHandles is not object/array', () => {
    const invalidInput = { ...validInput, openHandles: 'not-an-object' };
    expect(validateUploadedJSON(invalidInput)).toBe(false);
  });

  it('returns false if testResults is not an array', () => {
    const invalidInput = { ...validInput, testResults: {} };
    expect(validateUploadedJSON(invalidInput)).toBe(false);
  });

  it('returns true if openHandles is an object instead of array', () => {
    const objectHandlesInput = { ...validInput, openHandles: {} };
    expect(validateUploadedJSON(objectHandlesInput)).toBe(true);
  });

  it('returns false if wasInterrupted is not a boolean', () => {
    const invalidInput = { ...validInput, wasInterrupted: 'false' };
    expect(validateUploadedJSON(invalidInput)).toBe(false);
  });
});
