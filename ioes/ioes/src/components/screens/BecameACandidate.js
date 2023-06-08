import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "./iyteee.png";
import "./BecomeACandidate.css";

function BecameACandidate() {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);

  const handleFile1Change = (event) => {
    setFile1(event.target.files[0]);
  };

  const handleFile2Change = (event) => {
    setFile2(event.target.files[0]);
  };

  const handleFile3Change = (event) => {
    setFile3(event.target.files[0]);
  };

  const uploadFiles = () => {
    if (!file1 || !file2 || !file3) {
      alert("Files not selected!!");
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
            throw new Error("Dosya yükleme hatası: " + response.status);
          }
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("PDF files uploaded successfully!");
        }
      })
      .catch((error) => {
        alert("Dosya yükleme hatası: " + error);
      });
  };

  const deleteFiles = () => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8080/api/deletecandidate", {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Dosya silme hatası: " + response.status);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("PDF files deleted successfully!");
        }
      })
      .catch((error) => {
        alert("Dosya silme hatası: " + error);
      });
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
            <Link to="/student-main">Student Main</Link>
            <Link to="/student-main/cast-vote">Cast Vote</Link>
            <Link to="/student-main/election-status">Election Status</Link>
            <Link to="/student-main/election-result">Election Result</Link>
            <Link to="/student-main/help">Help</Link>
          </div>
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
        </div>
      </div>
    </>
  );
}

export default BecameACandidate;