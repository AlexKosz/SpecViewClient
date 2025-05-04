/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/user/userSlice';

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.userInfo);
  console.log('redux user:', user);

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get('http://localhost:8000/users/loggedin', {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        dispatch(login(res.data));
        setUserInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
        navigate('/');
      });
  }, [dispatch, navigate]);

  const logout = () => {
    axios
      .get('http://localhost:8000/users/logout', { withCredentials: true })
      .then((res) => {
        console.log(res);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return userInfo ? (
    <div>
      <h1>Welcome {userInfo.firstName}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  ) : (
    <div>
      <h1>Loading</h1>
    </div>
  );
};

export default Dashboard;
