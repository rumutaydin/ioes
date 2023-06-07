// StudentMainPage.js
import React, { useEffect, useState } from 'react';
import logo from './iyteee.png';
import './StudentMainPage.css'; // Import the CSS file

import { useNavigate } from 'react-router-dom'; ////////////////

function StudentMainPage() {

  /////////////////////////
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      const loggedIn = !!token;
      setIsLoggedIn(loggedIn);

      if (!loggedIn) {
        navigate('/student-login');
      }
    };

    checkLoginStatus();
  }, [navigate]);

  
  /////////////////////////
  return isLoggedIn ? (
    <div className="main-container">
      <header className="header-container">
        <h1 className="header-title">IZTECH STUDENT COUNCIL ELECTION SYSTEM</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>
      <div className="content-container">
        <div className="sidebar">
          <a href="/become-candidate">Become a Candidate</a>
          <a href="/cast-vote">Cast Vote</a>
          <a href="/election-status">Election Status</a>
          <a href="/election-results">Election Results</a>
          <a href="/election-help">Help</a>
        </div>
        <div className="main-content">
          <p>Welcome to Iztech Student Council Election System</p>
          <p>The election process will take place between the following dates: <i>10/10/2023 10:00 am - 13/10/2023 12:00 am</i>.</p>
          <p>Department representative elections will start on <i>10/10/2023 10:00 am</i> and voting will end on <i>10/10/2023 2:00 am</i>.</p>
        </div>
      </div>
    </div>
  ) : null;
}

export default StudentMainPage;