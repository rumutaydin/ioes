import logo from './logo.svg';
import './App.css';
import StudentLogin from './components/screens/StudentLogin';
import AdminLogin from './components/screens/AdminLogin';
import StudentMainPage from './components/screens/StudentMainPage';
import AdminMainPage from './components/screens/AdminMainPage';
import { BrowserRouter as Router, Route, Routes , Navigate} from 'react-router-dom';
import Blank from './components/screens/Blank';
import CastVote from './components/screens/CastVote';

import SetTimeDatePage from './components/screens/SetTimeDatePage';
import Option from './components/screens/2-ilksayfa';               ////////////////////////////// aşağıda studentlogin rootsu değiştirdim

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
        <Route path='/become-candidate' element={<Blank />} />
        <Route path='/cast-vote' element={<CastVote />} />
        <Route path='/election-status' element={<Blank />} />
        <Route path='/election-results' element={<Blank />} />
        <Route path='/election-help' element={<Blank />} />

        <Route path='/' element={<Option />} />       
        <Route path='/set-time-date' element={<SetTimeDatePage />} />   
        <Route path='/see-applications' element={<Blank />} />   
        <Route path="/admin-main" element={isLoggedIn ? <AdminMainPage /> : <Navigate to="/admin-login" />} />
        <Route path="*" element={<Navigate to="/student-login" />} />
        
      </Routes>
    </Router>
  );
}

export default App;





