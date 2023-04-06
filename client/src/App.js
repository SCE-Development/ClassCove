import { Link, Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom';
import React from 'react';
import logo from './logo.svg';
import Register from './Components/Register';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Router from './Router';
import './App.css';

function Root() {
 
  const navigate = useNavigate();

  return (
    <div className="App">
      <div className="nav-container">
        <div className="name-container">
          <h1 id="navbar-logo" onClick={() => navigate('')}>ClassCove</h1>
        </div>
        <div login-register-container>
          <a class="login-register" onClick={() => navigate('/register')}> <button id="register-button" class="navbar-button"><p id="register-text">Register</p></button></a>
          <a class="login-register" onClick={() => navigate('/login')}><button id="login-button" class="navbar-button"><span>Sign In</span></button></a>
        </div>

      </div>

      
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
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