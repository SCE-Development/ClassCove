import { Link, Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom';
import { React, useState } from 'react';
import Register from './Components/Register';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Welcome from './Components/Welcome';
import Recommendation from "./Components/Recommendation";
import './App.css';


function Root() {
 
  const navigate = useNavigate();

  return (
    <div className="App">
      <div className="nav-container">
        <div className="name-container">
          <h1 className="navbar-logo" onClick={() => navigate('/dashboard')}>ClassCove</h1>
        </div>
        <div className="login-register-container">
          <a className="login-register" onClick={() => navigate('/register')}> <button id="register-button" className="navbar-button"><p id="register-text">Register</p></button></a>
          <a className="login-register" onClick={() => navigate('/login')}><button id="login-button" className="navbar-button"><span>Sign In</span></button></a>
        </div>

      </div>

      <div className="main-content">
        <Routes>
          <Route path="/" exact element={<Welcome />} />
          <Route path="/welcome" exact element={<Welcome />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/professors" exact element={<Recommendation />} />
        </Routes>
      </div>

      <div className="footer-container">
        <footer>
          <h1 className="navbar-logo">ClassCove</h1>
          <div className="columns">
            <div id="column1">
              <h3>About ClassCove</h3>
              <p className="footer-text">Thank you for using ClassCove. This website is currently a work in progress</p>
              <p className="footer-text">Copyright © 2023 ClassCove, Inc.</p>
            </div>
            <div id="column2">
              <h3>Contact Us</h3>
              <p className="footer-text">For general inquiries or feedback, please do not hesitate to contact us at</p>
              <p className="footer-text">classcove@gmail.com</p>
            </div>
          </div>
          
        </footer>
      </div>
      
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  );
}

export default App;