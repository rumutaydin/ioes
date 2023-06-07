import React, { useEffect, useState } from 'react';
import logo from './iyteee.png';
import axios from 'axios';
import './CastVote.css';
import { Link } from 'react-router-dom';

const CastVote = () => {
  const [candidates, setCandidates] = useState([]);
  //const [deptNo, setDeptNo] = useState(null);


  // useEffect(() => {
  //   // Fetch the logged-in student's department number from the backend
  //   fetchDeptNo();
  // }, []);

  useEffect(() => {
    // Fetch candidates when the department number is available
      fetchCandidates();
    
  }, []);


  // const fetchDeptNo = async () => {
  //   try {
  //     // Make an API call to fetch the logged-in student's department number
  //     const token = localStorage.getItem('token'); // Retrieve the token from local storage
  //     const response = await axios.get('http://localhost:8080/api/student/deptNo', {
  //       headers: {
  //         Authorization: `Bearer ${token}`, //??????????????????????
  //       },
  //     });

  //     setDeptNo(response.data.deptNo);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };



  const fetchCandidates = async () => {
    try {
      const token = localStorage.getItem('token');
      
  
      const candidatesResponse = await axios.get('http://localhost:8080/api/candidates', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCandidates(candidatesResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCandidateSelection = (candidateId) => {
    const updatedCandidates = candidates.map((candidate) => {
      if (candidate._id === candidateId) {
        return { ...candidate, selected: !candidate.selected };
      }
      return candidate;
    });
    setCandidates(updatedCandidates);
  };

  return (
 <div> 
  <div className="main-container">
    <header className="header-container">
      <h1 className="header-title">IZTECH STUDENT COUNCIL ELECTION SYSTEM</h1>
      <img src={logo} alt="Logo" className="logo" />
    </header>
    <div className="content-container">
      <div className="sidebar">

        <Link to="/student-main/became-candidate">Become a Candidate</Link>
        <Link to="/student-main/election-status">Election Status</Link>
        <Link to="/student-main/election-result">Election Result</Link>
        <Link to ="/student-main/help">Help</Link>
      </div>
    </div>
  </div>
  
    <div className="cast-vote-container">
      <div className="cast-vote-banner">
        <h2 className="cast-vote-title">Iztech Online Election System</h2>
        <p className="cast-vote-subtitle">Cast your vote below</p>
      </div>

      <div className="candidates-list">
        {candidates.length > 0 ? (
          <ul>
            {candidates.map((candidate) => (
              <li className="candidate-item" key={candidate._id}>
                <input
                  type="checkbox"
                  id={candidate._id}
                  checked={candidate.selected || false}
                  onChange={() => handleCandidateSelection(candidate._id)}
                />
                <label className='deneme' htmlFor={candidate._id}>{candidate.name}</label>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading candidates...</p>
        )}
      </div>
    </div>
  </div>
  );
}

export default CastVote;