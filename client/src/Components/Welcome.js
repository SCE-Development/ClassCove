import { Link, Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom';
import { React, useState } from 'react';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import "../stylesheets/login.css";
import "../stylesheets/welcome.css";

function Welcome() {
    const [onLogin, setOnLogin] = useState("onLogin");
    const [isSidebarOnLeft, setIsSidebarOnLeft] = useState(true);

    const handleClick = () => {
        if(onLogin === "onLogin") {
            setOnLogin("onRegister");
        } else {
            setOnLogin("onLogin");
        }

        setIsSidebarOnLeft(!isSidebarOnLeft);
    }

    return (
        <div className="wrapper">

          <div className={`sidebar ${isSidebarOnLeft ? 'left' : 'right'}`} onClick={handleClick}>
            <strong>{isSidebarOnLeft ? 'Register' : 'Log In'}</strong>
          </div>

          <div className="content">
            {onLogin === "onLogin" ? <Login /> : <Register />}
          </div>

        </div>
      );

    
}

export default Welcome;