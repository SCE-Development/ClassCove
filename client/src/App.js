import { Link, Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom';
import { React, useState } from 'react';
import Register from './Components/Register';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Welcome from './Components/Welcome';
import './App.css';

import Recommendation from "./Components/Recommendation";

function Root() {
 
  const navigate = useNavigate();

  return (
    <div className="App">
      <div className="nav-container">
        <div className="name-container">
          <h1 id="navbar-logo" onClick={() => navigate('/dashboard')}>ClassCove</h1>
        </div>
        <div className="login-register-container">
          <a className="login-register" onClick={() => navigate('/register')}> <button id="register-button" className="navbar-button"><p id="register-text">Register</p></button></a>
          <a className="login-register" onClick={() => navigate('/login')}><button id="login-button" className="navbar-button"><span>Sign In</span></button></a>
        </div>

      </div>

      
      <Routes>
        <Route path="/" exact element={<Welcome />} />
        <Route path="/welcome" exact element={<Welcome />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/professors" exact element={<Recommendation />} />
      </Routes>
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