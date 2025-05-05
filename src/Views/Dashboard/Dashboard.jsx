import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Grid, CircularProgress, Button } from '@mui/material';
import axiosWrapper from '../../utils/apiRequests/axiosWrapper';
import FileCard from './components/FileCard';
import UploadModal from './components/UploadModal';

const Dashboard = () => {
  const user = useSelector((state) => state.user.userInfo);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axiosWrapper({
          method: 'get',
          path: 'files/getUserFiles',
        });

        setFiles(data?.data?.files || []);
      } catch (error) {
        console.error('Error fetching files:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const handleUpload = async (file) => {
    try {
      const response = await axiosWrapper({
        method: 'post',
        path: 'files/upload',
        data: file,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response?.data?.file) {
        setFiles((prevFiles) => [response.data.file, ...prevFiles]);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  if (!user) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h4">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.fullName}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setModalOpen(true)}
        sx={{ marginBottom: 2 }}
      >
        Upload File
      </Button>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {files.map((file) => (
            <Grid item xs={12} sm={6} md={4} key={file._id}>
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
