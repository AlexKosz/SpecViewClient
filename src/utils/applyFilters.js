const checkFileNameMatch = (testResults, searchTerm) => {
  const matchingFiles = testResults.filter((testResult) => {
    const path = testResult.name.toLowerCase(); // Convert path to lowercase
    const fileName = path.split('/').pop(); // Get last part of path (file name)
    return fileName.includes(searchTerm.toLowerCase()); // Case-insensitive match
  });

  return matchingFiles;
};

const checkFolderNameMatch = (testResults, searchTerm) => {
  return testResults.filter((testResult) => {
    const path = testResult.name.toLowerCase(); // Convert path to lowercase
    const pathWithoutSlashes = path.replace(/\//g, ''); // Remove all slashes
    return pathWithoutSlashes.includes(searchTerm.toLowerCase()); // Case-insensitive match
  });
};

const checkForAnAssertionMatch = (testResults, searchTerm) => {
  return testResults.filter((testResult) => {
    return testResult.assertionResults.some(
      (assertion) => assertion.fullName.toLowerCase().includes(searchTerm.toLowerCase()) // Case-insensitive match
    );
  });
};

// if user allows folder matches, and path contains a match, return all assertions for that file
// if user allows file matches, and path contains a match, return all assertions for that file
// if user allows assertion matches, filter out all assertionResults that don't have match (assertionResult[X].fullName does not contain the string), filter out files that don't have any assertions left

const applyFilters = ({ testResults = [], filterData }) => {
  if (
    !filterData.searchTerm ||
    filterData.searchTerm === '' ||
    (!filterData.searchFolder && !filterData.searchFileName && !filterData.searchAssertions)
  ) {
    return testResults;
  }
  let matchingFiles = new Set();

  // Collect results based on the OR condition
  if (filterData.searchFolder) {
    const folderMatches = checkFolderNameMatch(testResults, filterData.searchTerm);
    folderMatches.forEach((file) => matchingFiles.add(file));
  }

  if (filterData.searchFileName) {
    const fileNameMatches = checkFileNameMatch(testResults, filterData.searchTerm);
    fileNameMatches.forEach((file) => matchingFiles.add(file));
  }

  if (filterData.searchAssertions) {
    const assertionMatches = checkForAnAssertionMatch(testResults, filterData.searchTerm);
    assertionMatches.forEach((file) => matchingFiles.add(file));
  }

  // Convert Set back to array for further processing
  matchingFiles = Array.from(matchingFiles);

  // Filter out any files where assertionResults is empty
  matchingFiles = matchingFiles.filter((testResult) => testResult.assertionResults.length > 0);

  return matchingFiles;
};

export default applyFilters;
