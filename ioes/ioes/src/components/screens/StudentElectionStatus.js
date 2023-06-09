import logo from './iyteee.png';
import { Link } from 'react-router-dom';

function StudentElectionStatus(){

    return(
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
        <Link to="/student-main/election-result">Election Result</Link>
        <Link to ="/student-main/help">Help</Link>
        <Link to="/">Log Out</Link>
      </div>
    </div>
  </div>





        </>
    );
}

export default StudentElectionStatus;