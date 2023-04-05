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
      <header className="App-header">
        <h1>ClassCove</h1>
        <div className="nav-container">
          
          <button className="nav-button" onClick={() => navigate('/dashboard')}>Home</button>

          <button className="nav-button" onClick={() => navigate('/login')}>Login</button>
          
          <button className="nav-button" onClick={() => navigate('/register')}>Sign Up</button>

    
        </div>
      </header>
      <img src={logo} className="App-logo" alt="logo" />
      <div className="App-buttons">
        
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