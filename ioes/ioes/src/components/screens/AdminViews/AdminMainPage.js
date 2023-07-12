import React, { useEffect, useState } from 'react';
import logo from './iyteee.png';
import './3-AdminMainPage.css'; // Import the CSS file
import { useNavigate} from 'react-router-dom';               /////////////////////
import { Link } from 'react-router-dom';
import axios from 'axios';

function AdminMainPage() {


  /////////////////////////////////
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [election, setElection] = useState(null);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      const loggedIn = !!token;
      setIsLoggedIn(loggedIn);

      if (!loggedIn) {
        navigate('/admin-login');
      }
    };

    checkLoginStatus();
  }, [navigate]);

  useEffect(() => {
    fetchElection();
  }, []);

  const fetchElection = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/getElection');
      if (response.status === 200) {
        const electionData = response.data;
        setElection(electionData);
      } else {
        console.error('Failed to fetch election document');
      }
    } catch (error) {
      console.error(error);
    }
  };

  
//////////////////////////////////
  return isLoggedIn ? (
    <div className="main-container">
      <header className="header-container">
        <h1 className="header-title">IZTECH STUDENT COUNCIL ELECTION SYSTEM</h1>
        <img src={logo} alt="Logo" className="logo" />
      </header>
      <div className="content-container">
        <div className="sidebar">
          

          <Link to="set-time-date">Set Election Time and Date</Link>
          <Link to="see-applications">See Candidate Applications</Link>
          <Link to="election-results">Election Results</Link>
          <Link to="admin-help">Help</Link>
          <Link to="/">Log Out</Link>


        </div>
        {election && (
        <div className="election-info">
          <h3>WELCOME TO IZTECH ONLINE ELECTION SYSTEM!</h3>
          <p>
            Current election is below, but you can always update it <br></br>
            Election starts at {election.startDate} {election.startTime}, ends at {election.endDate} {election.endTime}
          </p>
        </div>
      )}
      </div>
    </div>
  ) : null ;
}

export default AdminMainPage;

