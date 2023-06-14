import logo from './iyteee.png';
import { Link } from 'react-router-dom';

function AdminElectionStatus(){

    return(

        <>

<div className="main-container">
    <header className="header-container">
      <h1 className="header-title">IZTECH STUDENT COUNCIL ELECTION SYSTEM</h1>
      <img src={logo} alt="Logo" className="logo" />
    </header>
    <div className="content-container">
      <div className="sidebar">

        <Link to="/admin-main/set-time-date">Set Election Time and Date</Link>
          <Link to="/admin-main/see-applications">See Candidate Applications</Link>
          <Link to="/admin-main/election-results">Election Results</Link>
          <Link to="/admin-main/election-help">Help</Link>
          <Link to="/">Log Out</Link>
       
      </div>
    </div>
  </div>


        </>

    );



}

export default AdminElectionStatus