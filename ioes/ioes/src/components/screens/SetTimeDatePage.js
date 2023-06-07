import React, { useState, useEffect } from 'react';
import './SetTimeDatePage.css';



/*

// UPDATE VE GERİ DÖNDÜĞÜNDE MESAJ VERME OLMADAN ÇALIŞAN KISIM

const SetTimeDatePage = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [election, setElection] = useState(null);

  useEffect(() => {
    fetchElection();
  }, []);

  const fetchElection = async () => {
    try {
      const response = await fetch('/api/election');
      if (response.ok) {
        const electionData = await response.json();
        setElection(electionData);
      } else {
        console.error('Failed to fetch election document');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/election', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ startDate, endDate, startTime, endTime }),
      });

      if (response.ok) {
        console.log('Election document created successfully');
        // Reset the form after submission
        setStartDate('');
        setEndDate('');
        setStartTime('');
        setEndTime('');
        fetchElection(); // Fetch the updated election document
      } else {
        console.error('Failed to create election document');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="set-time-date-page">
      <h2>Set Election Time and Date</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="start-date">Election Start Date:</label>
          <input type="date" id="start-date" value={startDate} onChange={handleStartDateChange} />
        </div>
        <div className="form-group">
          <label htmlFor="end-date">Election End Date:</label>
          <input type="date" id="end-date" value={endDate} onChange={handleEndDateChange} />
        </div>
        <div className="form-group">
          <label htmlFor="start-time">Election Start Time:</label>
          <input type="time" id="start-time" value={startTime} onChange={handleStartTimeChange} />
        </div>
        <div className="form-group">
          <label htmlFor="end-time">Election End Time:</label>
          <input type="time" id="end-time" value={endTime} onChange={handleEndTimeChange} />
        </div>
        <button type="submit">Save</button>
      </form>
      {election && (
        <div className="election-info">
          <h3>Election Document:</h3>
          <p>Start Date: {election.startDate}</p>
          <p>End Date: {election.endDate}</p>
          <p>Start Time: {election.startTime}</p>
          <p>End Time: {election.endTime}</p>
        </div>
      )}
    </div>
  );
};

export default SetTimeDatePage;


*/



const SetTimeDatePage = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [election, setElection] = useState(null);
  const [submitted, setSubmitted] = useState(false); // Track if the election is already submitted
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchElection();
  }, []);

  const fetchElection = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/election');
      if (response.ok) {
        const electionData = await response.json();
        setElection(electionData);
      } else {
        console.error('Failed to fetch election document');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/election', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ startDate, endDate, startTime, endTime }),
      });

      if (response.ok) {
        console.log('Election document created successfully');
        setSubmitted(true); // Election is submitted
        setSuccessMessage('Election document created successfully'); // Set success message
        fetchElection();
      } else {
        console.error('Failed to create election document');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="set-time-date-page">
      <h2>Set Election Time and Date</h2>
      {!submitted && (
        <form onSubmit={handleSubmit}>
          {/* Input boxes */}
          <div className="form-group">
            <label htmlFor="start-date">Election Start Date:</label>
            <input type="date" id="start-date" value={startDate} onChange={handleStartDateChange} />
          </div>
          <div className="form-group">
            <label htmlFor="end-date">Election End Date:</label>
            <input type="date" id="end-date" value={endDate} onChange={handleEndDateChange} />
          </div>
          <div className="form-group">
            <label htmlFor="start-time">Election Start Time:</label>
            <input type="time" id="start-time" value={startTime} onChange={handleStartTimeChange} />
          </div>
          <div className="form-group">
            <label htmlFor="end-time">Election End Time:</label>
            <input type="time" id="end-time" value={endTime} onChange={handleEndTimeChange} />
          </div>
          <button type="submit">Save</button>
        </form>
      )}
      {submitted && election && (
        <div className="election-info">
          <h3>Election Document:</h3>
          <p>{successMessage}</p> {/* Display success message */}
          {/* Display election details */}
        </div>
      )}
    </div>
  );
};

export default SetTimeDatePage;