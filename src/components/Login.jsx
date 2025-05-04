import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formInfo, setFormInfo] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState(null);
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  const changeHandler = (e) => {
    setFormInfo({
      ...formInfo,
      [e.target.name]: e.target.value,
    });
  };

  const login = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/login', formInfo, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        if (res.data.msg === 'succ') {
          navigate('/dashboard'); // Replace history.push with navigate
        } else {
          setErrors(res.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get('http://localhost:8000/users/loggedin', {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate]);

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={login}>
        {errors ? <p className="text-danger">{errors}</p> : ''}
        <div className="form-group">
          <label>Email</label>
          <input type="text" className="form-control" name="email" onChange={changeHandler} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            onChange={changeHandler}
          />
        </div>
        <input type="submit" value="Login" className="btn btn-primary" />
      </form>
    </div>
  );
};

export default Login;
