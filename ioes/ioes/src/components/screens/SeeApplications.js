import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './iyteee.png';
import { Link } from 'react-router-dom';

function SeeApplications() {
  const [stuWithDocs, setStuWithDocs] = useState([]);
  const [message, setMessage] = useState('');
  

  useEffect(() => {
    fetchDocs();
  }, []);

  const fetchDocs = async () => {
    try {
      const stuWithDocRes = await axios.get('http://localhost:8080/api/students/valid-docs');
      const { students } = stuWithDocRes.data;
      setStuWithDocs(students);
    } catch (error) {
      console.error(error);
    }
  };


  const acceptApplication = async (studentId) => {
    try {
      await axios.put(`http://localhost:8080/api/students/accept/${studentId}`);
      // Refresh the list of applications
      fetchDocs();
      
      setMessage(`${getStudentName(studentId)} is accepted.`);
    } catch (error) {
      console.error(error);
    }
  };

  const rejectApplication = async (studentId) => {
    try {
      await axios.put(`http://localhost:8080/api/students/reject/${studentId}`);
      // Refresh the list of applications
      fetchDocs();
      
      setMessage(`${getStudentName(studentId)} is rejected.`);
    } catch (error) {
      console.error(error);
    }
  };

  const getStudentName = (studentId) => {
    const student = stuWithDocs.find((stu) => stu._id === studentId);
    return student ? student.name : '';
  };

  const downloadFile = (fileData, fileName) => {
    const fileBlob = new Blob([fileData], { type: 'application/pdf' });
    const fileUrl = URL.createObjectURL(fileBlob);
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(fileUrl);
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
              <Link to="admin-main/election-help">Help</Link>
              <Link to="/">Log Out</Link>
    
            </div>
    
    <div className="cast-vote-container">
      <div className="cast-vote-banner">
        <h1 className="cast-vote-title">Iztech Online Election System</h1>
        <h2 className="cast-vote-subtitle">Candidate Applications</h2>
      </div>

      <div className="doc-list">
        {stuWithDocs.length > 0 ? (
          <ul>
            {stuWithDocs.map((student, index) => (
              <li key={index}>
                <h3>{student.name}</h3>
                {student.validDocs.map((doc, docIndex) => (
                  <div key={docIndex}>
                    <p>File Name: {doc.fileName}</p>
                    <button onClick={() => downloadFile(doc.fileData.buffer, doc.fileName)}>
                      Download
                    </button>
                  </div>
                ))}
                <div>
                  <button onClick={() => acceptApplication(student._id)}>Accept</button>
                  <button onClick={() => rejectApplication(student._id)}>Reject</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>There are no applications...</p>
        )}
      </div>
      {message && <p>{message}</p>}
    </div>

    </div>
    </div>

    </>
  );
}

export default SeeApplications;
