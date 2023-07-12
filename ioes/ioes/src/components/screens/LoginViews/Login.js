import React from 'react';
import './First.css';
import logo from './iyteee.png';

const Option = () => {
  const handleStudentLogin = () => {
    // Redirect to student-login route
    window.location.href = '/student-login';
  };

  const handleAdminLogin = () => {
    // Redirect to admin-login route
    window.location.href = '/admin-login';
  };

  return (
    <div className="main-container1">
      <header>
        <h1 className="header-title1">IZTECH STUDENT ONLINE ELECTION SYSTEM</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>
      <div id="loginButtons">
        <button className="loginButton" onClick={handleStudentLogin}>
          Student Login
        </button>
        <button className="loginButton" onClick={handleAdminLogin}>
          Admin Login
        </button>
      </div>
    </div>
  );
};

export default Option;
