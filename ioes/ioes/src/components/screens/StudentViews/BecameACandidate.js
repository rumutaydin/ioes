import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "./iyteee.png";
import "./BecomeACandidate.css";

function BecameACandidate() {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);
  const [activeStu, setActiveStu] = useState(false);
  const [discipPunish, setDiscipPunish] = useState(false);
  const [grade, setGrade] = useState(0);
  const [gpa, setGpa] = useState(0);
 // const [startDT, setStartDT] = useState(null);
 // const [endDT, setEndDT] = useState(null);
  const [isElectionActive, setIsElectionActive] = useState(false);

  const handleFile1Change = (event) => {
    setFile1(event.target.files[0]);
  };

  const handleFile2Change = (event) => {
    setFile2(event.target.files[0]);
  };

  const handleFile3Change = (event) => {
    setFile3(event.target.files[0]);
  };

  useEffect(() => {
    // Fetch candidates when the department number is available
    fetchElection();
   // checkElectionStatus();
    checkEligibility();
  }, []);

  useEffect(() => {
    if (isElectionActive) {
      console.log("ne bakıyon, election active lan");
    }
  }, [isElectionActive]);

/*
  const checkElectionStatus = () => {
    const currentDateTime = new Date();
    const options = {
      timeZone: 'Europe/Istanbul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    const turkeyTimeString = currentDateTime.toLocaleString('en-US', options);
    console.log('Start DT:', startDT);
    console.log('End DT:', endDT);
    console.log('Current Time:', turkeyTimeString);
    console.log('Current Time ın amerıca:', currentDateTime);
    console.log(startDT, 'BBBBBBBBBBBBBBBBBBBBBBBBBBBB');
    console.log(turkeyTimeString, 'cccccccccccccccccccccccccccccc');
    console.log(turkeyTimeString >= startDT && turkeyTimeString <= endDT, 'AAAAAAAAAAAAAAAAAAAAAAAAAA');
    setIsElectionActive( currentDateTime >= startDT && currentDateTime <= endDT);      ///// aktif
  };
  */


  const fetchElection = async () => {
    try {
      const electionResponse = await axios.get('http://localhost:8080/api/getElection');
        if (electionResponse.status === 200) {
          const  electionData  = electionResponse.data;
          
          const electionStartDate = `${electionData.startDate}T${electionData.startTime}:00`;
          const elStartDT = new Date(electionStartDate)
          const electionEndDate = `${electionData.endDate}T${electionData.endTime}:00`;
          const elEndDT = new Date(electionEndDate)
          const currentDateTime = new Date();

          console.log('Start Date: fetchelectiondayım', elStartDT);
          //console.log('End Date: fetchelectiondayım', elEndDT);
          setIsElectionActive( currentDateTime >= elStartDT && currentDateTime <= elEndDT); 

        } else {
          console.error('Failed to fetch election document');
        }
    }catch (error) {
      console.error(error);
    }
  };

  const uploadFiles = async () => {
    if (!file1 || !file2 || !file3) {
      alert("Files not selected!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file1);
    formData.append("file", file2);
    formData.append("file", file3);

    const token = localStorage.getItem("token");

    fetch("http://localhost:8080/api/becomecandidate", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 400) {
            return response.json();
          } else {
            throw new Error("Error " + response.status);
          }
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("PDF documents uploaded succesfully!");
        }
      })
      .catch((error) => {
        alert("Error" + error);
      });
  };

  const deleteFiles = async () => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8080/api/deletecandidate", {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(" Error " + response.status);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("PDF documents deleted succesfully!");
        }
      })
      .catch((error) => {
        alert(" Error " + error);
      });
  };

  const checkEligibility = async () => {
    try {
      const token = localStorage.getItem("token");
      const eligibilityOfUser = await axios.get("http://localhost:8080/api/checkEligibility", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { activeStu, discipPunish, grade, gpa } = eligibilityOfUser.data; // Response verisinden verileri çıkartın
      setActiveStu(activeStu);
      setDiscipPunish(discipPunish);
      setGrade(grade);
      setGpa(gpa);

    } catch (error) {
      console.error("Error checking eligibility:", error);
    }
  };


  

  
    return (
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
              <Link to="/student-main/election-result">Election Result</Link>
              <Link to ="/student-main/help">Help</Link>
              <Link to="/">Log Out</Link>

             







            </div>

            {activeStu && !discipPunish && grade >= 2 && gpa > 2.75 && !isElectionActive && (
            <div className="form-container">
              <h2>Upload Documents</h2>
              <div>
                <input type="file" accept=".pdf" onChange={handleFile1Change} />
                <br />
                <input type="file" accept=".pdf" onChange={handleFile2Change} />
                <br />
                <input type="file" accept=".pdf" onChange={handleFile3Change} />
                <br />
                <button onClick={uploadFiles}>Upload</button>
                <button onClick={deleteFiles}>Delete</button>
              </div>
            </div>
            )}

            {(!activeStu || discipPunish || grade < 2 || gpa <= 2.75) && (

              <div className="form-container">
              <h2>You are not eligible to be a candidate</h2>
              <p>Please go to the main page!</p>
            </div>
            )}

            {isElectionActive && (
              <div className="form-container">
              <h2>There is an ongoing election process</h2>
              <p>You can not apply for candidacy!</p>
            </div>
              )}
          </div>
        </div>
    );
  }; 


export default BecameACandidate;