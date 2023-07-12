import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './iyteee.png';
import { Link } from 'react-router-dom';

const AdminElectionResult = () => {
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    const getWinners = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/winners`);
        const winnersData = response.data;
        setWinners(winnersData);
      } catch (error) {
        console.error(error);
      }
    };

    getWinners();
  },[]);

  const departmentMapping = {
    0: 'Computer Engineering',
    1: 'Chemical Engineering',
    2: 'Electronics and Communication Engineering',
    3: 'Mechanical Engineering',
  };

  return (

    <>

<div className="main-container">
        <header className="header-container">
          <h1 className="header-title">IZTECH STUDENT COUNCIL ELECTION SYSTEM</h1>
          <img src={logo} alt="Logo" className="logo" />
        </header>
        <div className="content-container">
          <div className="sidebar">

              <Link to="/admin-main">Admin Main</Link>
              <Link to="/admin-main/set-time-date">Set Election Time and Date</Link>
              <Link to="/admin-main/see-applications">See Candidate Applications</Link>
              <Link to="/admin-main/election-results">Election Results</Link>
              <Link to="/admin-main/admin-help">Help</Link>
              <Link to="/">Log Out</Link>

          </div>


          <div>
      {winners.length > 0 ? (
        winners.map((winner, index) => (
          <div key={index}>
            <h2>Department: {departmentMapping[winner.deptNo]}</h2>
            <h2>Winner: {winner.name}</h2>
            <p>Votes: {winner.countVote}</p>
          </div>
        ))
      ) : (
        <h2>Refresh the page if you can not see the winners.</h2>
      )}
    </div>

          </div>
</div>



    
    
    
    </>
  );
};

export default AdminElectionResult;