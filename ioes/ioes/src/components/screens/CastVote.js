import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CastVote.css';

const CastVote = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/candidates');
      setCandidates(response.data);
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
                <label htmlFor={candidate._id}>{candidate.name}</label>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading candidates...</p>
        )}
      </div>
    </div>
  );
}

export default CastVote;