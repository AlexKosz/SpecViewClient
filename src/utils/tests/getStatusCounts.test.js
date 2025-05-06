import getStatusCounts from '../getStatusCounts';

describe('getStatusCounts', () => {
  it('returns empty object for empty input', () => {
    expect(getStatusCounts()).toEqual({});
    expect(getStatusCounts([])).toEqual({});
  });

  it('counts statuses correctly with valid input', () => {
    const testResults = [
      {
        assertionResults: [{ status: 'passed' }, { status: 'failed' }, { status: 'passed' }],
      },
      {
        assertionResults: [{ status: 'skipped' }, { status: 'passed' }],
      },
    ];

    const result = getStatusCounts(testResults);
    expect(result).toEqual({
      passed: 3,
      failed: 1,
      skipped: 1,
    });
  });

  it('handles missing assertionResults property gracefully', () => {
    const testResults = [
      {},
      { assertionResults: [] },
      {
        assertionResults: [{ status: 'passed' }],
      },
    ];

    const result = getStatusCounts(testResults);
    expect(result).toEqual({ passed: 1 });
  });

  it('aggregates unknown statuses too', () => {
    const testResults = [
      {
        assertionResults: [
          { status: 'custom-status' },
          { status: 'passed' },
          { status: 'custom-status' },
        ],
      },
    ];

    const result = getStatusCounts(testResults);
    expect(result).toEqual({
      'custom-status': 2,
      passed: 1,
    });
  });

  it('is case-sensitive with status names', () => {
    const testResults = [
      {
        assertionResults: [{ status: 'Passed' }, { status: 'passed' }],
      },
    ];

    const result = getStatusCounts(testResults);
    expect(result).toEqual({
      Passed: 1,
      passed: 1,
    });
  });
});
