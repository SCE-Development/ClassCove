import { Link, Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom';
import { React, useState } from 'react';
import logo from './logo.svg';
import Register from './Components/Register';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Welcome from './Components/Welcome';
import Router from './Router';
import './App.css';

function Root() {
 
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState("login");

  return (
    <div className="App">
      <div className="nav-container">
        <div className="name-container">
          <h1 id="navbar-logo" onClick={() => navigate('/dashboard')}>ClassCove</h1>
        </div>
        <div className="login-register-container">
          <a class="login-register" onClick={() => navigate('/register')}> <button id="register-button" class="navbar-button"><p id="register-text">Register</p></button></a>
          <a class="login-register" onClick={() => navigate('/login')}><button id="login-button" class="navbar-button"><span>Sign In</span></button></a>
        </div>

      </div>

      
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/welcome" element={<Welcome />} />
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