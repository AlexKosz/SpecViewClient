/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/user/userSlice';
import axiosWrapper from '../../utils/apiRequests/axiosWrapper';

const Dashboard = () => {
  const user = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const data = await axiosWrapper({
        method: 'get',
        path: 'files/getUserFiles',
      });

      const files = data?.data?.files;
      console.log('files:', files);
    };

    fetchData();
  }, [user?.data]);

  return user ? (
    <div>
      <h1>Welcome {user?.fullName}</h1>
    </div>
  ) : (
    <div>
      <h1>Loading</h1>
    </div>
  );
};

export default Dashboard;
