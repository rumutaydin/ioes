import React, { useEffect, useState } from 'react';
import logo from './iyteee.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CastVote.css';
import { Link } from 'react-router-dom';

const CastVote = () => {
  const [candidates, setCandidates] = useState([]);
  //const [pics, setPics] = useState([]);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [setsuccessMessage, setVoteStatMessage] = useState('');
  const [votingStatus, setVotingStatus] = useState(false);
  //const nav = useNavigate();

  // useEffect(() => {
  //   if (votingStatus) {
  //     nav('/student-main');
  //   }
  // }, [votingStatus]);

  useEffect(() => {
    // Fetch candidates when the department number is available
    fetchCandidates();
    //checkVotingStat();

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

  const handleCandidateSelection = (candidateId) => {
    const updatedCandidates = candidates.map((candidate) => {
      if (candidate._id === candidateId) {
        return { ...candidate, selected: true };
      }
      return { ...candidate, selected: false };
    });
    setCandidates(updatedCandidates);
    setSelectedCandidateId(candidateId);
  };


  const checkVotingStat = async() => {

    try{
    const token = localStorage.getItem('token');
    const votingStatusOfUser = await axios.get('http://localhost:8080/api/checkVotingStat', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // return {votingStatusO}
    const { votingStatus } = votingStatusOfUser.data; // Extract the votingStatus property from the response data
    setVotingStatus(votingStatus);
    } catch(error){
      console.error('Error checking voting status:', error);
    }

  };

  const handleVoteSubmit = async () => {

    if (selectedCandidateId) {
      try {
        const token = localStorage.getItem('token');
        console.log(token);
        const response = await axios.post(
          'http://localhost:8080/api/vote',
          { selectedCandidateId }
        );
        setSuccessMessage(response.data.message);


        const setVoteStatRes = await axios.post(
          'http://localhost:8080/api/setVoteStat',
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setVoteStatMessage(setVoteStatRes.data.message);
        // if (voteStatRes.status === 404) {
        //   setVotingStatus(true);

        // }
        

        // Navigate to the main page after a delay
        // setTimeout(() => {
        //   nav('/student-main'); 
        // }, 2000); 
      }
      catch (error) {
        console.error('Error submitting vote:', error);
      }
    } else {
      console.log('No candidate selected');
    }
  };

  checkVotingStat();

  if (votingStatus) {
    return (
      <div className='already-voted'>
        <h1 className='already-voted-you'>You have already voted</h1>
        <p className='already-voted-thanks'>Thank you for your participation!</p>
      </div>

    );
  } else {


    return (


      <>
    
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

      <div className="cast-vote-container">
           <div className="cast-vote-banner">
          <h2 className="cast-vote-title">Iztech Online Election System</h2>
          <p className="cast-vote-subtitle">Cast your vote below</p>
           </div>

        <div className="candidates-list">
          {candidates.length > 0 ? (
            <ul className="candidates-grid">
              {candidates.map((candidate) => (
                <li className="candidate-item" key={candidate._id}>
                  <div className="picture-frame">
                    <img src={`data:image/jpeg;base64,${candidate.pic}`} alt={candidate.name} />
                  </div>
                  <div className="candidate-info">
                    <label htmlFor={candidate._id}>{candidate.name}</label>
                    <input
                      name='vote'
                      type="checkbox"
                      id={candidate._id}
                      checked={selectedCandidateId === candidate._id}
                      onChange={() => handleCandidateSelection(candidate._id)}
                    />
                  </div>
                  
                </li>
              ))}
            
            </ul>

          ) : (
            <p>There are no candidates for your department...</p>
          )}
        </div>
        <div className="submit-section">
                    <button onClick={handleVoteSubmit}>Submit Vote</button>
                      {successMessage && <p className="success-message">{successMessage}</p>}
                      {setsuccessMessage && <p className='success-message'> {setsuccessMessage}</p>}
                  </div>

      </div>

        </div>
      </div>


      </>
    );
  }
}


export default CastVote;