import logo from './logo.svg';
import './App.css';
import Login from './components/screens/Login';
import StudentMainPage from './components/screens/StudentMainPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Blank from './components/screens/Blank';
import CastVote from './components/screens/CastVote';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<StudentMainPage />} />
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