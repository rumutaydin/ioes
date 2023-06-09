import logo from './iyteee.png';
import { Link } from 'react-router-dom';


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ElectionResult = () => {
  const [isElectionFinished, setIsElectionFinished] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [endDate, setEndDate] = useState(null);
  const [winner, setWinner] = useState(null);


  useEffect(() => {
    // Fetch candidates when the department number is available
    fetchCandidates();
    fetchElection();
    findWinner();

  }, []);

  const fetchCandidates = async () => {
    try {
      const token = localStorage.getItem('token');
      const candidatesResponse = await axios.get('http://localhost:8080/api/candidates', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Extract the candidates and pics from the response
      const { candidates } = candidatesResponse.data;
      setCandidates(candidates);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchElection = async () => {
    try {
      const token = localStorage.getItem('token');
      const electionResponse = await axios.get('http://localhost:8080/api/getElection', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { electionEndDate } = electionResponse.EndDate;
      setEndDate(electionEndDate);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    if (endDate && new Date() >= endDate) {
      setIsElectionFinished(true);
      findWinner();
    }
  }, [endDate]);


  const findWinner = () => {
    if (candidates.length === 0) {
      setWinner(null);
      return;
    }

    let maxVotes = candidates[0].countVote;
    let winnerIndex = 0;

    for (let i = 1; i < candidates.length; i++) {
      if (candidates[i].countVote > maxVotes) {
        maxVotes = candidates[i].countVote;
        winnerIndex = i;
      }
    }

    setWinner(candidates[winnerIndex]);
  };



return (
    <>
      <div>
        {isElectionFinished ? (
          winner ? (
            <div>
              <h2>Winner: {winner.name}</h2>
              <p>Votes: {winner.countVote}</p>
            </div>
          ) : (
            <h2>No winner found.</h2>
          )
        ) : (
          <h2>The election has not ended yet.</h2>
        )}
      </div>

      <div className="main-container">
        <header className="header-container">
          <h1 className="header-title">IZTECH STUDENT COUNCIL ELECTION SYSTEM</h1>
          <img src={logo} alt="Logo" className="logo" />
        </header>
        <div className="content-container">
          <div className="sidebar">
            <Link to="/student-main">Student Main</Link>
            <Link to="/student-main/became-candidate">Become a Candidate</Link>
            <Link to="/student-main/cast-vote">Cast Vote</Link>
            <Link to="/student-main/election-status">Election Status</Link>
            <Link to="/student-main/help">Help</Link>
          </div>
        </div>
      </div>
    </>
  );

}
export default ElectionResult;



