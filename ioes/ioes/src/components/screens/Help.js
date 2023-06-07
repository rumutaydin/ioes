import logo from './iyteee.png';
import { Link } from 'react-router-dom';

function Help(){

    return(

        <>

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


        </>

    );



}

export default Help