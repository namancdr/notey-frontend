import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './components/Home';
import NoteState from './context/notes/NoteState'
import Login from './components/Login';
import Signup from './components/Signup';
import AlertState from './context/alert/AlertState';
import AlertContainer from './components/AlertContainer';
import Profile from './components/Profile';


function App() {  

  return (
    <>
    <AlertState>
    <NoteState>
    <Router>
      <Navbar /> 
      <AlertContainer />
      <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
    </NoteState>
    </AlertState>
    </>
  );
}

export default App;
