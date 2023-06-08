import logo from './iyteee.png';
import { Link } from 'react-router-dom';

function AdminElectionResult(){

    return(

        <>
        
        <div className="main-container">
    <header className="header-container">
      <h1 className="header-title">IZTECH STUDENT COUNCIL ELECTION SYSTEM</h1>
      <img src={logo} alt="Logo" className="logo" />
    </header>
    <div className="content-container">
      <div className="sidebar">
       
      </div>
    </div>
  </div>
       
        
        </>
    );
}

export default AdminElectionResult;