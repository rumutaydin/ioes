import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from './iyteee.png';

function StudentLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleAdminLogin = () => {
    navigate('/admin-login');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/student/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token); // Store the token in localStorage
        console.log('Login successful');
        navigate('/student-main');
      } else {
        console.log('Invalid credentials');
        setErrorMessage('Invalid credentials');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleForgotPassword = () => {
    window.location.href = 'https://mail-app.iyte.edu.tr/ForgotMyPassword/';
  };

  return (
    <div>
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="IYTE Logo" className="logo" />
          <h2 className="header-title">Izmir Institute of Technology</h2>
        </div>
        <p className="system-text">IZTECH Online Election System</p>
      </header>
      <div className="container">
      {errorMessage && <p>{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
            <label className={email ? "hidden-label" : ""}>Email:</label>
          </div>
          <div className="input-group">
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <label className={password ? "hidden-label" : ""}>Password:</label>
          </div>
          <div className="button-group">
            <button type="submit" className="submit-button">
              Login
            </button>
            <button onClick={handleAdminLogin}>Admin Login</button>
          </div>
          <button onClick={handleForgotPassword} className="forgot-password-button">
            Forgot My Password
          </button>
        </form>
        
      </div>
    </div>
  );
}
export default StudentLogin;