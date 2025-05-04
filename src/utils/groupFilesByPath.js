const findFirstBranchingNode = (tree) => {
  let current = tree;
  const path = [];

  do {
    const keys = Object.keys(current);
    if (keys.length !== 1) {
      // Wrap in folder format for consistency
      const name = path[path.length - 1] || '';
      return {
        name,
        type: 'folder',
        children: current,
      };
    }

    const key = keys[0];
    const next = current[key];

    if (next.type !== 'folder') {
      // We've hit a file, return the current folder
      const name = path[path.length - 1] || '';
      return {
        name,
        type: 'folder',
        children: current,
      };
    }

    path.push(key);
    current = next.children;
  } while (current);

  return null;
};

export const groupTestResultsAsTree = (testResults = []) => {
  const tree = {};

  testResults.forEach((testFile) => {
    const rawPath = testFile?.name;
    if (!rawPath || typeof rawPath !== 'string') return;

    const normalizedPath = rawPath.replace(/\\/g, '/');
    const parts = normalizedPath.split('/');

    let current = tree;

    for (let i = 0; i < parts.length; i += 1) {
      const part = parts[i];

      if (i === parts.length - 1) {
        // File node
        const passed = testFile.assertionResults?.filter((a) => a.status === 'passed').length || 0;
        const failed = testFile.assertionResults?.filter((a) => a.status === 'failed').length || 0;

        current[part] = {
          ...testFile,
          type: 'file',
          name: part,
          fileData: testFile,
          passed,
          failed,
        };
      } else {
        // Folder node
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
    }

    // After building the path, walk from root again to increment counts
    current = tree;
    for (let i = 0; i < parts.length - 1; i += 1) {
      const part = parts[i];
      const node = current[part];
      const passed = testFile.assertionResults?.filter((a) => a.status === 'passed').length || 0;
      const failed = testFile.assertionResults?.filter((a) => a.status === 'failed').length || 0;

      node.passed += passed;
      node.failed += failed;

      current = node.children;
    }
  });

  return findFirstBranchingNode(tree);
};

export default groupTestResultsAsTree;
