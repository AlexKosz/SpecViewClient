import React from 'react';
import Reg from '../components/Reg';
import Login from '../components/Login';

const SignIn = () => {
  return (
    <div className="row">
      <div className="col">
        <Reg />
      </div>
      <div className="col">
        <Login />
      </div>
    </div>
  );
};

export default SignIn;
