// Import the utility functions we're testing
import { groupTestResultsAsTree, findFirstBranchingNode } from '../groupFilesByPath';

describe('findFirstBranchingNode', () => {
  // Case: When the input tree is completely empty
  it('should return a folder structure for an empty tree', () => {
    expect(findFirstBranchingNode({})).toEqual({
      name: '',
      type: 'folder',
      children: {},
    });
  });

  // Case: Root node has multiple children, so it should be considered the branching node
  it('should return the root node if it has multiple children', () => {
    const tree = {
      folder1: { type: 'folder', children: {} },
      folder2: { type: 'folder', children: {} },
    };
    const result = findFirstBranchingNode(tree);
    expect(result).toEqual({
      name: '',
      type: 'folder',
      children: tree,
    });
  });

  // Case: Only one branch until a node with two children is found deeper down
  it('should return the first node with multiple children in a deep tree', () => {
    const tree = {
      root: {
        type: 'folder',
        children: {
          folder1: {
            type: 'folder',
            children: {
              sub1: { type: 'folder', children: {} },
              sub2: { type: 'folder', children: {} },
            },
          },
        },
      },
    };
    const result = findFirstBranchingNode(tree);
    expect(result).toEqual({
      name: 'folder1',
      type: 'folder',
      children: {
        sub1: { type: 'folder', children: {} },
        sub2: { type: 'folder', children: {} },
      },
    });
  });

  // Case: If a folder has only one file inside, return that folder as the branching point
  it('should return the parent folder when encountering a file', () => {
    const tree = {
      root: {
        type: 'folder',
        children: {
          folder1: {
            type: 'folder',
            children: {
              file1: { type: 'file', name: 'file1' },
            },
          },
        },
      },
    };
    const result = findFirstBranchingNode(tree);
    expect(result).toEqual({
      name: 'folder1',
      type: 'folder',
      children: {
        file1: { type: 'file', name: 'file1' },
      },
    });
  });

  // Case: Only one path through folders that eventually leads to a file
  it('should handle single deep path with files', () => {
    const tree = {
      root: {
        type: 'folder',
        children: {
          folder1: {
            type: 'folder',
            children: {
              folder2: {
                type: 'folder',
                children: {
                  file1: { type: 'file', name: 'file1' },
                },
              },
            },
          },
        },
      },
    };
    const result = findFirstBranchingNode(tree);
    expect(result).toEqual({
      name: 'folder2',
      type: 'folder',
      children: {
        file1: { type: 'file', name: 'file1' },
      },
    });
  });
});

//
// ------------------------- Tests for groupTestResultsAsTree -------------------------
//

describe('groupTestResultsAsTree', () => {
  // Case: No input or empty array should return an empty root folder with 0 tests
  it('should return a root folder for empty input', () => {
    expect(groupTestResultsAsTree()).toEqual({
      name: '',
      type: 'folder',
      children: {},
      passed: 0,
      failed: 0,
    });
    expect(groupTestResultsAsTree([])).toEqual({
      name: '',
      type: 'folder',
      children: {},
      passed: 0,
      failed: 0,
    });
  });

  // Case: One test file with multiple assertions, some passed, some failed
  it('should handle single test file', () => {
    const testResults = [
      {
        name: 'path/to/test.js',
        assertionResults: [{ status: 'passed' }, { status: 'passed' }, { status: 'failed' }],
      },
    ];

    const result = groupTestResultsAsTree(testResults);
    expect(result).toEqual({
      name: 'to',
      type: 'folder',
      children: {
        'test.js': {
          name: 'test.js',
          assertionResults: testResults[0].assertionResults,
          type: 'file',
          fileData: {
            assertionResults: testResults[0].assertionResults,
            name: 'path/to/test.js',
          },
          passed: 2,
          failed: 1,
        },
      },
    });
  });

  // Case: Multiple files in the same folder
  it('should handle multiple test files in same folder', () => {
    const testResults = [
      {
        name: 'path/to/test1.js',
        assertionResults: [{ status: 'passed' }, { status: 'passed' }],
      },
      {
        name: 'path/to/test2.js',
        assertionResults: [{ status: 'failed' }, { status: 'passed' }],
      },
    ];

    const result = groupTestResultsAsTree(testResults);
    expect(result.children['test1.js'].passed).toBe(2); // 2 passes
    expect(result.children['test2.js'].failed).toBe(1); // 1 fail
  });

  // Case: Test files live in different folders
  it('should handle multiple test files in different folders', () => {
    const testResults = [
      {
        name: 'path/to/test1.js',
        assertionResults: [{ status: 'passed' }, { status: 'passed' }],
      },
      {
        name: 'path/other/test2.js',
        assertionResults: [{ status: 'failed' }, { status: 'passed' }],
      },
    ];

    const result = groupTestResultsAsTree(testResults);
    expect(Object.keys(result.children)).toEqual(['to', 'other']); // Two folders under 'path'
  });

  // Case: Ensure Windows-style paths work (e.g., with backslashes)
  it('should normalize Windows paths', () => {
    const testResults = [
      {
        name: 'path\\to\\test.js',
        assertionResults: [{ status: 'passed' }, { status: 'failed' }],
      },
    ];

    const result = groupTestResultsAsTree(testResults);
    expect(result.children['test.js'].passed).toBe(1);
    expect(result.children['test.js'].failed).toBe(1);
  });

  // Case: Ignore files with missing or null names
  it('should skip items with invalid names', () => {
    const testResults = [
      {
        name: null,
        assertionResults: [{ status: 'passed' }],
      },
      {
        name: 'valid/path/test.js',
        assertionResults: [{ status: 'passed' }],
      },
      {
        notName: 'invalid',
      },
    ];

    const result = groupTestResultsAsTree(testResults);
    expect(Object.keys(result.children)).toEqual(['test.js']); // Only valid file is included
  });

  // Case: A file exists, but it has no assertion results
  it('should handle empty assertionResults', () => {
    const testResults = [
      {
        name: 'path/to/test.js',
        assertionResults: [],
      },
    ];

    const result = groupTestResultsAsTree(testResults);
    expect(result.children['test.js'].passed).toBe(0);
    expect(result.children['test.js'].failed).toBe(0);
  });

  // Case: A file exists with no assertionResults field at all
  it('should handle missing assertionResults', () => {
    const testResults = [
      {
        name: 'path/to/test.js',
      },
    ];

    const result = groupTestResultsAsTree(testResults);
    expect(result.children['test.js'].passed).toBe(0);
    expect(result.children['test.js'].failed).toBe(0);
  });
});
