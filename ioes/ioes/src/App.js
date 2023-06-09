import logo from './logo.svg';
import './App.css';
import StudentLogin from './components/screens/StudentLogin';
import AdminLogin from './components/screens/AdminLogin';
import StudentMainPage from './components/screens/StudentMainPage';
import AdminMainPage from './components/screens/AdminMainPage';
import { BrowserRouter as Router, Route, Routes ,createRoutesFromElements,RouterProvider, createBrowserRouter, Navigate} from 'react-router-dom';
import Blank from './components/screens/Blank';
import CastVote from './components/screens/CastVote';
import BecameACandidate from './components/screens/BecameACandidate';
import ElectionStatus from './components/screens/ElectionStatus';
import ElectionResult from './components/screens/ElectionResult';
import SeeApplications from './components/screens/SeeApplications';
import Help from './components/screens/Help';

import SetTimeDatePage from './components/screens/SetTimeDatePage';
import Option from './components/screens/2-ilksayfa';               ////////////////////////////// aşağıda studentlogin rootsu değiştirdim


const router = createBrowserRouter(

  createRoutesFromElements(

    <>

    <Route path='/' element = {<Option/>}/>

    <Route path="/student-login" element={<StudentLogin />} />
    <Route path="/admin-login" element={<AdminLogin/>} /> 
    <Route path="/admin-main" element={<AdminMainPage />} />


    <Route path='/student-main' element = {<StudentMainPage/>}/>
    <Route path='/student-main/became-candidate' element = {<BecameACandidate/>}/>
    <Route path='/student-main/cast-vote' element={<CastVote/>}/>
    <Route path='/student-main/election-status'element={<ElectionStatus/>}/>
    <Route path='/student-main/election-result' element= {<ElectionResult/>}/>
    <Route path='/student-main/help'element={<Help/>}/>

    
    </>

  )
)


function App() {
  const isLoggedIn = !!localStorage.getItem('token'); ///////////////

  return (
    <Router>
      <Routes>
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/admin-login" element={<AdminLogin/>} /> 

        <Route
          path="/student-main"
          element={
            isLoggedIn ? (
              <StudentMainPage />
            ) : (
              <Navigate to="/student-login" replace />
            )
          }
        />
        <Route path="/admin-main" element={<AdminMainPage />} />
        <Route path='/student-main/became-candidate' element={<BecameACandidate />} />
        <Route path='/student-main/cast-vote' element={<CastVote />} />
        <Route path='/student-main/election-status' element={<ElectionStatus />} />
        <Route path='/student-main/election-result' element={<ElectionResult />} />
        <Route path='/student-main/help' element={<Help />} />

        <Route path='/' element={<Option />} />       
        <Route path='/set-time-date' element={<SetTimeDatePage />} />   
        <Route path='/see-applications' element={<SeeApplications />} />   
        <Route path="/admin-main" element={isLoggedIn ? <AdminMainPage /> : <Navigate to="/admin-login" />} />
        <Route path="*" element={<Navigate to="/student-login" />} />
        
      </Routes>
    </Router>
  );
}


export default App;




