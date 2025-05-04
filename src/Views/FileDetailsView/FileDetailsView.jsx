import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Box, Typography, Paper, Tooltip } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';
import ShareIcon from '@mui/icons-material/Share';
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

import axiosWrapper from '../../utils/apiRequests/axiosWrapper';

import urls from '../../urls';

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
  const navigate = useNavigate();
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
    // no file, navigate to landing page (or user dashboard)
    if (location.pathname === urls.uploadedFileDetails) {
      navigate(urls.base);
    }

    return (
      <Box p={4}>
        <Typography variant="h6">
          File not found or not loaded. Navgiating to uploading page...
        </Typography>
      </Box>
    );
  }

  const handleSave = async () => {
    const data = await axiosWrapper({
      method: 'post',
      path: 'files/upload',
      data: file,
      compress: true,
    });

    const createdFile = data?.data?.file;
    console.log('createdFile:', createdFile);

    const navId = createdFile?._id;
  };

  const handleShare = () => {
    console.log('Share button clicked');
    console.log('Pathname:', location.pathname);
    console.log('Search:', location.search);
  };

  const isFileOnlyUploaded = location.pathname === urls.uploadedFileDetails;

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h4" gutterBottom>
            {file?.name}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Time Ran:{` ${formatEpochToDate(file?.startTime)}`}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          {location.pathname === urls.uploadedFileDetails && (
            <Button
              startIcon={<SaveIcon />}
              color="primary"
              onClick={handleSave}
              variant="outlined"
              sx={{
                color: 'var(--outlined-infoButton-color)',
                border: `1px solid var(--outlined-infoButton-color)`,
                cursor: !isFileOnlyUploaded ? 'pointer' : 'not-allowed',
              }}
            >
              Save
            </Button>
          )}

          <Tooltip
            title="You have to save the file before sharing"
            placement="top-start"
            arrow
            // show tooltip when file has been uploaded but not saved
            disableHoverListener={!isFileOnlyUploaded}
            disableFocusListener={!isFileOnlyUploaded}
            disableTouchListener={!isFileOnlyUploaded}
          >
            <Box sx={{ cursor: isFileOnlyUploaded ? 'not-allowed' : 'pointer' }}>
              <Button
                startIcon={<ShareIcon />}
                color="primary"
                onClick={handleShare}
                variant="outlined"
                sx={{
                  color: isFileOnlyUploaded
                    ? 'var(--outlined-infoButton-disabled-color)'
                    : 'var(--outlined-infoButton-color)',
                  border: `1px solid var(--${
                    isFileOnlyUploaded
                      ? 'outlined-infoButton-disabled-color'
                      : 'outlined-infoButton-color'
                  })`,
                  pointerEvents: isFileOnlyUploaded ? 'none' : 'auto',
                }}
              >
                Share
              </Button>
            </Box>
          </Tooltip>
        </Box>
      </Box>

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
