import React from 'react';
import { render } from '@testing-library/react';
import BaseAccordianBody from '../BaseAccordianBody'; // Adjust import path
import '@testing-library/jest-dom'; // For additional matchers like toBeInTheDocument

describe('BaseAccordianBody', () => {
  const data = {
    name: 'Test Data',
    assertionResults: [
      {
        fullName: 'Test Case 1',
        status: 'passed',
        failureMessages: [],
      },
      {
        fullName: 'Test Case 2',
        status: 'failed',
        failureMessages: ['Assertion failed'],
      },
    ],
  };

  it('renders a message when no data is present', () => {
    const { getByText } = render(<BaseAccordianBody data={{ assertionResults: [] }} />);
    expect(getByText('No data')).toBeInTheDocument();
  });

  it('renders the assertion results correctly', () => {
    const { getByText } = render(<BaseAccordianBody data={data} />);
    const testCase1 = getByText('Test Case 1');
    const testCase2 = getByText('Test Case 2');

    // Check that both test cases are rendered
    expect(testCase1).toBeInTheDocument();
    expect(testCase2).toBeInTheDocument();
  });

  it('renders failure message for failed assertions', () => {
    const { getByText } = render(<BaseAccordianBody data={data} />);
    const failureMessage = getByText(/Failure Message:/i);

    // Check that the failure message for the failed test is rendered
    expect(failureMessage).toBeInTheDocument();
    expect(getByText('Assertion failed')).toBeInTheDocument();
  });

  it('applies the correct color based on the status (green for passed)', () => {
    const { getByText } = render(<BaseAccordianBody data={data} />);
    const testCase1 = getByText('Test Case 1');

    // Check that Test Case 1 (passed) is rendered in green using computed style
    const testCase1Style = window.getComputedStyle(testCase1.closest('li'));
    expect(testCase1Style.color).toBe('green');
  });

  it('applies the correct color based on the status (red for failed)', () => {
    const { getByText } = render(<BaseAccordianBody data={data} />);
    const testCase2 = getByText('Test Case 2');

    // Check that Test Case 2 (failed) is rendered in red using computed style
    const testCase2Style = window.getComputedStyle(testCase2.closest('li'));
    expect(testCase2Style.color).toBe('red');
  });

  it('handles missing failureMessages gracefully (no crash)', () => {
    const dataWithoutFailureMessages = {
      name: 'Test Data',
      assertionResults: [
        {
          fullName: 'Test Case 3',
          status: 'failed',
          failureMessages: undefined,
        },
      ],
    };

    const { getByText } = render(<BaseAccordianBody data={dataWithoutFailureMessages} />);
    expect(getByText('Test Case 3')).toBeInTheDocument();
  });
});
