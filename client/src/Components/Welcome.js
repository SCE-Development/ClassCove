import { React, useState } from 'react';
import Login from './Login';
import Register from './Register';
import "../stylesheets/login.css";
import "../stylesheets/welcome.css";

function Welcome() {
  const [onLogin, setOnLogin] = useState("onLogin");

  const sidebarOnLeft = () => {
    if (onLogin === "onLogin") {
      setOnLogin("onRegister");
    } else {
      setOnLogin("onLogin");
    }
  };

  const leftDisappear = () => {
    const sidebarLeft = document.getElementsByClassName("sidebar-left")[0];
    const content = document.getElementsByClassName("content")[0];
    const text = document.getElementById("text");
    if (sidebarLeft) {
      text.style.fontSize = "0px";
      text.style.transition = "all ease-in-out 200ms";
      sidebarLeft.style.width = "0px";
      sidebarLeft.style.transition = "all ease-in-out 200ms";
    }
  };

  const rightDisappear = () => {
    const sidebarRight = document.getElementsByClassName("sidebar-right")[0];
    const text = document.getElementById("text");
    if (sidebarRight) {
      text.style.fontSize = "0px";
      text.style.transition = "all ease-in-out 200ms";
      sidebarRight.style.width = "0px";
      sidebarRight.style.transition = "all ease-in-out 200ms";
    }
  };

  const rightAppear = () => {
    const sidebarRight = document.getElementsByClassName("sidebar-right")[0];
    const sidebarLeft = document.getElementsByClassName("sidebar-left")[0];
    const text = document.getElementById("text");
    if (sidebarLeft) {
    text.style.fontSize = "18px";
    text.style.transition = "all ease-in-out 200ms";
    sidebarRight.style.width = "110px";
    sidebarRight.style.transition = "all ease-in-out 200ms";
    }
  };

  return (
    <div className="wrapper">
      {onLogin === "onLogin" && (
        <div
          className="sidebar-left"
          onClick={() => {
            leftDisappear();
            setTimeout(() => sidebarOnLeft(), 200);
          }}
          style={{ display: onLogin === "onLogin" ? "block" : "none" }}
        >
          <div className="textBox">
            <strong id="text">Sign Up</strong>
          </div>
        </div>
      )}

      <div className="content">
        {onLogin === "onLogin" ? <Login /> : <Register />}
      </div>

      {onLogin === "onRegister" && (
        <div
          className="sidebar-right"
          onClick={() => {
            rightDisappear();
            setTimeout(() => sidebarOnLeft(), 200);
          }}
          style={{ display: onLogin === "onLogin" ? "none" : "block" }}
        >
          <div className="textBox">
            <strong id="text">Log In</strong>
          </div>
        </div>
      )}
    </div>
  );
}

export default Welcome;
