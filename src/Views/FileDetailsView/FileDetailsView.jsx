import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Box, Typography, Paper, Snackbar, Tooltip } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';

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

import urls, { baseFileDetailsUrl } from '../../urls';
import { setActiveFile } from '../../features/files/filesSlice';
import DeleteModal from '../../components/DeleteModal/DeleteModal';

const FileDetailsPage = () => {
  const file = useSelector((state) => state.files.activeFile);
  const location = useLocation();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user?.userInfo);

  const [filterData, setFilterData] = useState({
    searchTerm: '',
    searchFileName: true,
    searchFolder: true,
    searchAssertions: true,
  });

  const [isCopySnackbarOpen, setIsCopySnackbarOpen] = useState(false);
  const [isLoginSnackBarOpen, setIsLoginSnackbarOpen] = useState(false);
  const { fileId } = useParams();

  const [fileList, setFileList] = useState([]);
  const [statusCounts, setStatusCounts] = useState({});

  const [treeData, setTreeData] = useState({});

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchFile = async () => {
      if (!fileHasData && fileId) {
        const selectedFileId = fileId;
        const fileReadRes = await axiosWrapper({
          method: 'get',
          path: `files/${selectedFileId}`,
          data: {
            id: selectedFileId,
          },
        });

        if (fileReadRes?.data) {
          // Optionally: dispatch to store or handle setting local state here
          dispatch(setActiveFile(fileReadRes?.data));
        } else {
          navigate(urls.base);
        }
      }
    };

    fetchFile();
  }, [fileHasData, location.pathname, fileId, navigate, dispatch]);

  const handleSave = async () => {
    const data = await axiosWrapper({
      method: 'post',
      path: 'files/upload',
      data: file,
      compress: true,
    });

    const error = data?.error;

    if (error) {
      if (data?.error?.status === 401) {
        setIsLoginSnackbarOpen(true);
        return;
      }
    }

    const createdFile = data?.data?.file;

    navigate(`${baseFileDetailsUrl}/${createdFile._id}`);
  };

  const handleShare = async () => {
    if (isCopySnackbarOpen) return;
    const currentUrl = window.location.href;
    await navigator.clipboard.writeText(currentUrl);
    setIsCopySnackbarOpen(true);
  };

  const handleDelete = async () => {
    if (isDeleteModalOpen) return;
    setIsDeleteModalOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setIsCopySnackbarOpen(false);
    setIsLoginSnackbarOpen(false);
  };

  const isFileOnlyUploaded = location.pathname === urls.uploadedFileDetails;

  const snackbarProps = {
    autoHideDuration: 3000,
    onClose: handleSnackbarClose,
    anchorOrigin: { vertical: 'top', horizontal: 'center' },
    sx: {
      '& .MuiSnackbarContent-root': {
        backgroundColor: 'var(--snackbar-background-color)',
        color: 'var(--snackbar-text-color)',
      },
    },
  };

  const handleDeleteConfirm = async () => {
    const response = await axiosWrapper({
      method: 'DELETE',
      path: `files/${fileId}`,
    });

    if (!response.error) {
      navigate(urls.base);
    }
  };

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Snackbar
          open={isCopySnackbarOpen}
          message="Link copied to clipboard!"
          autoHideDuration={snackbarProps.autoHideDuration}
          onClose={snackbarProps.onClose}
          anchorOrigin={snackbarProps.anchorOrigin}
          sx={snackbarProps.sx}
        />
        <Snackbar
          open={isLoginSnackBarOpen}
          message="Login expired. Please login again before trying to save again."
          autoHideDuration={snackbarProps.autoHideDuration}
          onClose={snackbarProps.onClose}
          anchorOrigin={snackbarProps.anchorOrigin}
          sx={snackbarProps.sx}
        />

        <DeleteModal
          open={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          itemName={file?.name}
        />

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
              {!isFileOnlyUploaded && file?.userId === user?._id && (
                <Button
                  startIcon={<DeleteIcon />}
                  color="primary"
                  onClick={handleDelete}
                  variant="outlined"
                  sx={{
                    color: isFileOnlyUploaded
                      ? 'var(--outlined-danger-disabled-color)'
                      : 'var(--outlined-danger-color)',
                    border: `1px solid var(--${
                      isFileOnlyUploaded
                        ? 'outlined-danger-disabled-color'
                        : 'outlined-danger-color'
                    })`,
                    pointerEvents: isFileOnlyUploaded ? 'none' : 'auto',
                    mr: 1,
                  }}
                >
                  Delete
                </Button>
              )}

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
