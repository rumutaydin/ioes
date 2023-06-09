import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
  );
};

export default AdminElectionResult;