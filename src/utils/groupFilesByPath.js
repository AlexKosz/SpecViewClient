// Traverse a tree and return the first node that either:
// - Has more than one child (branching point), or
// - Contains a file (not a folder-only path)
export const findFirstBranchingNode = (tree) => {
  let current = tree;
  const path = [];

  while (current) {
    const keys = Object.keys(current);

    // Found a branching point (more than one folder/file)
    if (keys.length !== 1) break;

    const key = keys[0];
    const next = current[key];

    // Found a file node; can't traverse deeper
    if (next.type !== 'folder') break;

    // Move down one level in the tree
    path.push(key);
    current = next.children;
  }

  // Return the last meaningful folder in the linear path
  const name = path[path.length - 1] || '';
  return {
    name,
    type: 'folder',
    children: current,
  };
};

// Main function to transform a flat array of test results
// into a nested tree structure grouped by folders and files
export const groupTestResultsAsTree = (testResults = []) => {
  // Return an empty tree if no test results are provided
  if (!Array.isArray(testResults) || testResults.length === 0) {
    return {
      name: '',
      type: 'folder',
      children: {},
      passed: 0,
      failed: 0,
    };
  }

  const tree = {};

  testResults.forEach((testFile) => {
    const rawPath = testFile?.name;
    if (typeof rawPath !== 'string') return;

    // Normalize Windows paths to use forward slashes
    const normalizedPath = rawPath.replace(/\\/g, '/');
    const parts = normalizedPath.split('/');

    const assertionResults = testFile.assertionResults || [];
    const passed = assertionResults.filter((a) => a.status === 'passed').length;
    const failed = assertionResults.filter((a) => a.status === 'failed').length;

    let current = tree;

    // Build folder/file structure based on path parts
    parts.forEach((part, i) => {
      if (i === parts.length - 1) {
        // Last part = file node
        current[part] = {
          ...testFile,
          type: 'file',
          name: part,
          fileData: testFile,
          passed,
          failed,
        };
      } else {
        // Intermediate part = folder node
        if (!current[part]) {
          current[part] = {
            name: part,
            type: 'folder',
            children: {},
            passed: 0,
            failed: 0,
          };
        }
        current = current[part].children;
      }
    });

    // Propagate passed/failed counts up the tree
    current = tree;
    for (let i = 0; i < parts.length - 1; i += 1) {
      const part = parts[i];

      // Mutating object property (allowed by default in ESLint)
      current[part].passed += passed;
      current[part].failed += failed;

      current = current[part].children;
    }
  });

  // Return the first meaningful branch of the tree
  return findFirstBranchingNode(tree);
};

export default groupTestResultsAsTree;
