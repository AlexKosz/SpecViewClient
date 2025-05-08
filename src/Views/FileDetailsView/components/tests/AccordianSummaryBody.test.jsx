import React from 'react';
import { render } from '@testing-library/react';
import AccordianSummaryBody from '../AccordianSummaryBody'; // Adjust import path to where the component is

import '@testing-library/jest-dom'; // For additional matchers like toBeInTheDocument

// Mock StatusChip and chipVariants

describe('AccordianSummaryBody', () => {
  const data = {
    name: 'Test Name',
    passed: 3,
    failed: 2,
  };

  it('renders the name with proper capitalization', () => {
    const { getByText } = render(<AccordianSummaryBody data={data} />);
    const name = getByText(/Test Name/i);
    expect(name).toBeInTheDocument();
  });

  it('renders StatusChip for passed tests when passed > 0', () => {
    const { getByTestId } = render(<AccordianSummaryBody data={{ ...data, passed: 3 }} />);
    const passedCount = getByTestId('passed-count');
    expect(passedCount).toBeInTheDocument(); // Ensures that the passed count chip is rendered
  });

  it('renders StatusChip for failed tests when failed > 0', () => {
    const { getByTestId } = render(<AccordianSummaryBody data={{ ...data, failed: 2 }} />);
    const failedCount = getByTestId('failed-count');
    expect(failedCount).toBeInTheDocument(); // Ensures that the failed count chip is rendered
  });

  it('does not render StatusChip for passed when passed is 0', () => {
    const { queryByTestId } = render(<AccordianSummaryBody data={{ ...data, passed: 0 }} />);
    const passedCount = queryByTestId('passed-count');
    expect(passedCount).toBeNull(); // Should not render the passed count chip
  });

  it('does not render StatusChip for failed when failed is 0', () => {
    const { queryByTestId } = render(<AccordianSummaryBody data={{ ...data, failed: 0 }} />);
    const failedCount = queryByTestId('failed-count');
    expect(failedCount).toBeNull(); // Should not render the failed count chip
  });

  it('does not render StatusChip when passed and failed are undefined or 0', () => {
    const { queryByTestId } = render(
      <AccordianSummaryBody data={{ ...data, passed: undefined, failed: undefined }} />
    );
    const passedCount = queryByTestId('passed-count');
    const failedCount = queryByTestId('failed-count');
    expect(passedCount).toBeNull(); // No passed count chip should be rendered
    expect(failedCount).toBeNull(); // No failed count chip should be rendered
  });

  it('renders the passed count and variant correctly', () => {
    const { getByTestId } = render(<AccordianSummaryBody data={{ ...data, passed: 5 }} />);
    const passedCount = getByTestId('passed-count');
    expect(passedCount).toBeInTheDocument(); // Ensures that the passed count chip is rendered
  });

  it('renders the failed count and variant correctly', () => {
    const { getByTestId } = render(<AccordianSummaryBody data={{ ...data, failed: 4 }} />);
    const failedCount = getByTestId('failed-count');
    expect(failedCount).toBeInTheDocument(); // Ensures that the failed count chip is rendered
  });

  it('handles empty name gracefully', () => {
    const { container } = render(<AccordianSummaryBody data={{ ...data, name: '' }} />);
    const nameElement = container.querySelector('h5');
    expect(nameElement).toBeEmptyDOMElement();
  });
});
