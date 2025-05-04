import React, { useEffect, useState } from 'react';
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
import formatEpochToDate from '../../utils/time';
import Filters from './components/Filters';
import applyFilters from '../../utils/applyFilters';
import getStatusCounts from '../../utils/getStatusCounts';

const FileDetailsPage = () => {
  const file = useSelector((state) => state.files.activeFile);
  const location = useLocation();
  const [filterData, setFilterData] = useState({
    searchTerm: '',
    searchFileName: true,
    searchFolder: true,
    searchAssertions: true,
  });

  const [fileList, setFileList] = useState([]);
  const [statusCounts, setStatusCounts] = useState({});

  const [treeData, setTreeData] = useState({});

  const urlParams = new URLSearchParams(location.search);
  const fileId = urlParams.get('fileId');

  const fileHasData = Object.values(file).some((value) => value !== null);

  useEffect(() => {
    if (file?.testResults) {
      const filteredResults = applyFilters({
        testResults: file?.testResults,
        filterData,
      });

      setFileList(filteredResults);
      const tree = groupTestResultsAsTree(filteredResults);
      setTreeData(tree);
    }
  }, [file, filterData]);

  useEffect(() => {
    setStatusCounts(getStatusCounts(fileList));
  }, [fileList]);

  if (!fileHasData && !fileId) {
    return (
      <Box p={4}>
        <Typography variant="h6">File not found or not loaded.</Typography>
      </Box>
    );
  }

  return (
    <Box p={4}>
      {file?.name && (
        <Typography variant="h4" gutterBottom>
          {file?.name}
        </Typography>
      )}

      {file?.startTime && (
        <Typography variant="h6" gutterBottom>
          Time Ran:{` ${formatEpochToDate(file?.startTime)}`}
        </Typography>
      )}

      <Filters filterData={filterData} setFilterData={setFilterData} />

      <Box mt={1}>
        <StatusChip
          count={statusCounts?.passed || 0}
          label="Passed"
          color="success"
          variant={chipVariants.success}
        />
        <StatusChip
          count={statusCounts?.failed || 0}
          label="Failed"
          color="error"
          variant={chipVariants.error}
        />
        <StatusChip
          count={Object.values(statusCounts).reduce(
            (sum, type) =>
              ['skipped', 'pending', 'todo', 'ignored'].includes(type) ? sum + 1 : sum,
            0
          )}
          label="Skipped"
          color="default"
          variant={chipVariants.default}
        />
      </Box>

      <Box mb={2} />

      <Paper elevation={2}>
        {treeData?.children?.length ? (
          <Box p={2}>
            <Typography variant="h4">No matches found</Typography>
            <Typography
              sx={{ textDecoration: 'underline', cursor: 'hover' }}
              onClick={() =>
                setFilterData({
                  searchTerm: '',
                  searchFileName: true,
                  searchFolder: true,
                  searchAssertions: true,
                })
              }
            >
              Try clearing your filters
            </Typography>
          </Box>
        ) : (
          <RecursiveAccordion
            data={treeData}
            BaseAccordianBody={BaseAccordianBody}
            AccordianSummaryBody={AccordianSummaryBody}
            isTop
          />
        )}
      </Paper>
    </Box>
  );
};

export default FileDetailsPage;
