import './App.css';
import React ,{useState} from 'react';
import ReactDOM from 'react-dom'
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const[showSignup,setShowsignup] = useState(true);
  
  const togglePage = ()=>{
    setShowsignup(!showSignup);
  };
  return (
    <div className='App'>
      <h1 style={{color:'#FF8C00'}}>Jobfinder</h1>
      {showSignup ?(<Signup togglePage={togglePage}/>):(<Login togglePage={togglePage}/>)}
    </div>
   )
}
export default App;
