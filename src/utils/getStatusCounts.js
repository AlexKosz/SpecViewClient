const getStatusCounts = (testResults = []) => {
  const statusCounts = {};

  testResults.forEach((result) => {
    (result.assertionResults || []).forEach((assertion) => {
      const { status } = assertion;
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });
  });

  return statusCounts;
};

export default getStatusCounts;
