/* eslint-disable class-methods-use-this */
import React from 'react';
import { render } from '@testing-library/react';
import FileCard from '../FileCard';
import '@testing-library/jest-dom';

beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}

    unobserve() {}

    disconnect() {}
  };
});

describe('FileCard', () => {
  const file = {
    _id: '123',
    name: 'Test File',
    userId: 'user123',
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-02T00:00:00.000Z',
    __v: 0,
    numFailedTestSuites: 3,
    numFailedTests: 5,
    numPassedTestSuites: 10,
    numPassedTests: 20,
    numPendingTestSuites: 2,
    numPendingTests: 4,
    numRuntimeErrorTestSuites: 1,
    numTodoTests: 0,
    numTotalTestSuites: 16,
    numTotalTests: 30,
    startTime: 1672531200000, // December 31, 2022 07:00 PM in EN US
    success: false,
    wasInterrupted: false,
    testResults: [],
  };

  file.testResults = new Array(16).fill({});

  it('renders without crashing', () => {
    const { container } = render(<FileCard file={file} />);
    expect(container).toBeInTheDocument();
  });

  it('displays the correct file name', () => {
    const { getByText } = render(<FileCard file={file} />);
    expect(getByText(file.name)).toBeInTheDocument();
  });

  it('displays the formatted start time', () => {
    const { getByText } = render(<FileCard file={file} />);
    expect(getByText('December 31, 2022 07:00 PM')).toBeInTheDocument();
  });

  it('displays correct test suite stats', () => {
    const { getByText } = render(<FileCard file={file} />);

    // Get the text that includes the passed/failed/skipped stats and ensure the number is inside <strong>
    expect(getByText(/Passed:/)).toHaveTextContent(`Passed: ${file.numPassedTestSuites}`);
    expect(getByText(/Failed:/)).toHaveTextContent(`Failed: ${file.numFailedTestSuites}`);

    const skippedText = `Skipped: ${file.numPendingTestSuites + file.numRuntimeErrorTestSuites}`;
    expect(getByText(/Skipped:/)).toHaveTextContent(skippedText);

    expect(getByText(/Total:/)).toHaveTextContent(`Total: ${file.numTotalTestSuites}`);
  });

  it('handles missing start time gracefully', () => {
    const fileWithoutStartTime = { ...file, startTime: null };
    const { queryByText } = render(<FileCard file={fileWithoutStartTime} />);
    expect(queryByText(/January/)).not.toBeInTheDocument();
  });

  it('displays "Untitled File" if file name is missing', () => {
    const fileWithoutName = { ...file, name: '' };
    const { getByText } = render(<FileCard file={fileWithoutName} />);
    expect(getByText('Untitled File')).toBeInTheDocument();
  });
});
