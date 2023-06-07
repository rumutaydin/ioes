import React from 'react';
import './1-ilksayfa.css';
import { useNavigate } from 'react-router-dom';

const Option = () => {

  const navigate = useNavigate();

  const handleStudentLogin = () => {
    // Redirect to student-login route
    window.location.href = '/student-login';
  };

  const handleAdminLogin = () => {
    // Redirect to admin-login route
    window.location.href = '/admin-login';
  };

  return (
    <div>
      <div id="header">
        <h1>Iztech Online Election System</h1>
      </div>
      <div id="loginButtons">
        <button className="loginButton" onClick={handleStudentLogin}>Student Login</button>
        <button className="loginButton" onClick={handleAdminLogin}>Admin Login</button>
      </div>
    </div>
  );
};

export default Option;
