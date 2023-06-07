// StudentMainPage.js
import React from 'react';
import logo from './iyteee.png';
import './StudentMainPage.css'; // Import the CSS file
import { Link } from 'react-router-dom';

function StudentMainPage() {
  return (
    <div className="main-container">
      <header className="header-container">
        <h1 className="header-title">IZTECH STUDENT COUNCIL ELECTION SYSTEM</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>
      <div className="content-container">
        <div className="sidebar">

          <Link to="became-candidate">Become a Candidate</Link>
          <Link to="cast-vote">Cast Vote</Link>
          <Link to="election-status">Election Status</Link>
          <Link to="election-result">Election Resul</Link>
          <Link to ="help">Help</Link>
          <Link to="upload-image">Upload</Link>


        </div>
        <div className="main-content">
          <p>Welcome to Iztech Student Council Election System</p>
          <p>The election process will take place between the following dates: <i>10/10/2023 10:00 am - 13/10/2023 12:00 am</i>.</p>
          <p>Department representative elections will start on <i>10/10/2023 10:00 am</i> and voting will end on <i>10/10/2023 2:00 am</i>.</p>
        </div>
      </div>
    </div>
  );
}

export default StudentMainPage;
