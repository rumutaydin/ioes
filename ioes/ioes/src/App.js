import logo from './logo.svg';
import './App.css';
import StudentLogin from './components/screens/StudentLogin';
import AdminLogin from './components/screens/StudentLogin';
import StudentMainPage from './components/screens/StudentMainPage';
import AdminMainPage from './components/screens/AdminMainPage';
import { BrowserRouter,Routes, Route, createBrowserRouter, createRoutesFromElements,RouterProvider } from 'react-router-dom';
import Blank from './components/screens/Blank';
import CastVote from './components/screens/CastVote';
import BecameACandidate from './components/screens/BecameACandidate';
import ElectionStatus from './components/screens/ElectionStatus';
import ElectionResult from './components/screens/ElectionResult';
import Help from './components/screens/Help';



const router = createBrowserRouter(

  createRoutesFromElements(

    <>

    <Route path='/' element = {<StudentLogin/>}/>
    <Route path='student-main' element = {<StudentMainPage/>}/>
    <Route path='/student-main/became-candidate' element = {<BecameACandidate/>}/>
    <Route path='/student-main/cast-vote' element={<CastVote/>}/>
    <Route path='/student-main/election-status'element={<ElectionStatus/>}/>
    <Route path='/student-main/election-result' element= {<ElectionResult/>}/>
    <Route path='/student-main/help'element={<Help/>}/>
    <Route path='/became-candidate' element={<BecameACandidate/>}/>
    <Route path='/election-status' element={<ElectionStatus/>}/>
    
    </>

  )
)



function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;