import logo from './logo.svg';
import './App.css';
import StudentLogin from './components/screens/StudentLogin';
import AdminLogin from './components/screens/StudentLogin';
import StudentMainPage from './components/screens/StudentMainPage';
import AdminMainPage from './components/screens/AdminMainPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Blank from './components/screens/Blank';
import CastVote from './components/screens/CastVote';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentLogin />} />
        <Route path="/admin-login" element={<AdminLogin/>} /> 
        <Route path="/student-main" element={<StudentMainPage />} />
        <Route path="/admin-main" element={<AdminMainPage />} />
        <Route path='/become-candidate' element={<Blank />} />
        <Route path='/cast-vote' element={<CastVote />} />
        <Route path='/election-status' element={<Blank />} />
        <Route path='/election-results' element={<Blank />} />
        <Route path='/election-help' element={<Blank />} />
      </Routes>
    </Router>
  );
}

export default App;