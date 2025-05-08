import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Grid, CircularProgress, Button, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosWrapper from '../../utils/apiRequests/axiosWrapper';
import FileCard from './components/FileCard';
import UploadModal from './components/UploadModal';
import urls, { baseFileDetailsUrl } from '../../urls';
import { setActiveFile } from '../../features/files/filesSlice';

const Dashboard = () => {
  const user = useSelector((state) => state.user.userInfo);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axiosWrapper({
          method: 'get',
          path: 'files/getUserFiles',
        });

        setFiles(data?.data?.files || []);
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const handleUpload = async (file) => {
    if (file) {
      dispatch(setActiveFile(file));
      navigate(urls.uploadedFileDetails);
    }
  };

  if (!user) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h4">Loading...</Typography>
      </Box>
    );
  }

  const onFlieCardClick = (file) => {
    navigate(`${baseFileDetailsUrl}/${file._id}`);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 4,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome, {user?.fullName}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setModalOpen(true)}
          sx={{ marginBottom: 1.5 }}
        >
          Upload File
        </Button>
      </Box>

      <Divider sx={{ mb: 3, opacity: '10%' }} />

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {files.map((file) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={file._id}
              onClick={() => onFlieCardClick(file)}
              sx={{ cursor: 'pointer' }}
            >
              <FileCard file={file} />
            </Grid>
          ))}
        </Grid>
      )}

      <UploadModal open={isModalOpen} onClose={() => setModalOpen(false)} onUpload={handleUpload} />
    </Box>
  );
};

export default Dashboard;
