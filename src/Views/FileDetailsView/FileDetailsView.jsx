import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Paper } from '@mui/material';

import { useLocation } from 'react-router-dom';
import { groupTestResultsAsTree } from '../../utils/groupFilesByPath';

import StatusChip from '../../components/StatusChip/StatusChip';
import RecursiveAccordion from '../../components/RecursiveAccordian/RecursiveAccordian';
import BaseAccordianBody from './components/BaseAccordianBody';
import AccordianSummaryBody from './components/AccordianSummaryBody';

import './FileDetails.css';
import chipVariants from '../../components/StatusChip/chipVariants';

const FileDetailsPage = () => {
  const file = useSelector((state) => state.files.activeFile);
  const location = useLocation();

  const urlParams = new URLSearchParams(location.search);
  const fileId = urlParams.get('fileId');

  if (!file && !fileId) {
    return (
      <Box p={4}>
        <Typography variant="h6">File not found or not loaded.</Typography>
      </Box>
    );
  }

  const { name } = file;

  const passed = file?.numPassedTestSuites || 0;
  const failed = file?.numFailedTestSuites || 0;
  const skipped = file?.numPendingTestSuites || 0;

  const { testResults } = file;
  // console.log('testResults', testResults?.slice(0, 5));

  let tree = {};

  if (testResults) {
    tree = groupTestResultsAsTree(testResults);
  }

  console.log('tree', tree);

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        {name}
      </Typography>

      <Box mb={3}>
        <StatusChip count={passed} label="Passed" color="success" variant={chipVariants.success} />
        <StatusChip count={failed} label="Failed" color="error" variant={chipVariants.error} />
        <StatusChip
          count={skipped}
          label="Skipped"
          color="default"
          variant={chipVariants.default}
        />
      </Box>

      <Paper elevation={2}>
        <RecursiveAccordion
          data={tree}
          BaseAccordianBody={BaseAccordianBody}
          AccordianSummaryBody={AccordianSummaryBody}
        />
      </Paper>
    </Box>
  );
};

export default FileDetailsPage;
