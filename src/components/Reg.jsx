import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Reg = () => {
  const [formInfo, setFormInfo] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setFormInfo({
      ...formInfo,
      [e.target.name]: e.target.value,
    });
  };

  const register = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/register', formInfo, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          setErrors(res.data.errors);
        } else {
          navigate('/dashboard');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={register}>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" className="form-control" name="fullName" onChange={changeHandler} />
          {errors.fullName && <p className="text-danger">{errors.fullName.message}</p>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="text" className="form-control" name="email" onChange={changeHandler} />
          {errors.email && <p className="text-danger">{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            onChange={changeHandler}
          />
          {errors.password && <p className="text-danger">{errors.password.message}</p>}
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            className="form-control"
            name="confirmPassword"
            onChange={changeHandler}
          />
          {errors.confirmPassword && (
            <p className="text-danger">{errors.confirmPassword.message}</p>
          )}
        </div>
        <input type="submit" value="Register" className="btn btn-primary" />
      </form>
    </div>
  );
};

export default Reg;
