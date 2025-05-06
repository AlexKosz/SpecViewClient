import applyFilters from '../applyFilters';

const testResults = [
  {
    name: 'src/components/Button/Button.test.js',
    assertionResults: [
      { fullName: 'Button renders correctly' },
      { fullName: 'Button handles clicks' },
    ],
  },
  {
    name: 'src/utils/helpers/format.test.js',
    assertionResults: [{ fullName: 'formatDate returns formatted string' }],
  },
  {
    name: 'tests/Login/LoginForm.test.js',
    assertionResults: [{ fullName: 'LoginForm validates input' }],
  },
];

describe('applyFilters', () => {
  it('returns all test results if no searchTerm or filters are enabled', () => {
    expect(applyFilters({ testResults, filterData: {} })).toEqual(testResults);
    expect(applyFilters({ testResults, filterData: { searchTerm: '' } })).toEqual(testResults);
    expect(applyFilters({ testResults, filterData: { searchTerm: 'button' } })).toEqual(
      testResults
    );
  });

  it('filters by file name', () => {
    const result = applyFilters({
      testResults,
      filterData: {
        searchTerm: 'button.test.js',
        searchFileName: true,
        searchFolder: false,
        searchAssertions: false,
      },
    });
    expect(result).toHaveLength(1);
    expect(result[0].name).toContain('Button.test.js');
  });

  it('filters by folder name (case-insensitive, slash removed)', () => {
    const result = applyFilters({
      testResults,
      filterData: {
        searchTerm: 'helpers',
        searchFolder: true,
        searchFileName: false,
        searchAssertions: false,
      },
    });
    expect(result).toHaveLength(1);
    expect(result[0].name).toContain('helpers');
  });

  it('filters by assertion content', () => {
    const result = applyFilters({
      testResults,
      filterData: {
        searchTerm: 'validates input',
        searchAssertions: true,
        searchFolder: false,
        searchFileName: false,
      },
    });
    expect(result).toHaveLength(1);
    expect(result[0].assertionResults).toHaveLength(1);
    expect(result[0].assertionResults[0].fullName).toContain('validates input');
  });

  it('includes all matching files with assertions for OR logic', () => {
    const result = applyFilters({
      testResults,
      filterData: {
        searchTerm: 'button',
        searchFileName: true,
        searchFolder: true,
        searchAssertions: true,
      },
    });
    expect(result.length).toBeGreaterThanOrEqual(1);
    expect(result.every((r) => r.assertionResults.length > 0)).toBe(true);
  });

  it('removes files with no matching assertions when filtering by assertions only', () => {
    const result = applyFilters({
      testResults,
      filterData: {
        searchTerm: 'nonexistent',
        searchAssertions: true,
        searchFolder: false,
        searchFileName: false,
      },
    });
    expect(result).toEqual([]);
  });

  it('handles mixed matches and filters assertionResults accordingly', () => {
    const extendedResults = [
      {
        name: 'tests/Mixed/Mixed.test.js',
        assertionResults: [
          { fullName: 'should do something' },
          { fullName: 'should match searchTerm' },
        ],
      },
    ];
    const result = applyFilters({
      testResults: [...testResults, ...extendedResults],
      filterData: {
        searchTerm: 'match searchterm',
        searchAssertions: true,
        searchFileName: false,
        searchFolder: false,
      },
    });
    expect(result).toHaveLength(1);
    expect(result[0].assertionResults).toHaveLength(1);
    expect(result[0].assertionResults[0].fullName).toMatch(/match searchterm/i);
  });
});
