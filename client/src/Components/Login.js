import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../stylesheets/login.css";

function Login() { 
  const navigate = useNavigate();
  const [errorVisible, setErrorVisible] = useState("hidden"); 

  async function sendLogIn() { 
    let result = await axios.post('http://localhost:6969/log-in', { 
        "username": document.getElementById('username').value, 
        "password": document.getElementById('password').value 
    })

    console.log(result);

    if (result["data"]["success"]) {
      // save cookie, then redirect to dashboard
      document.cookie = result["data"]["cookie"];
      navigate("/dashboard");
      return;
    } 
    // login failed
    setErrorVisible("visible");
  }

  return( 
    <div>
      <link href='http://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css'></link>
      <div className={errorVisible}> 
        <p>Invalid username or password</p>
      </div>

      <div className="login-block">
        <h1>Login</h1>
        <input type="text" placeholder="username" id="username" name="username" />
        <input type="password" placeholder="password" id="password" name="username" />
        <button onClick={() => sendLogIn()}>Log In</button>

        <a href="/register">Get me to that 💰💰💰💰 register</a>
      </div>

    </div>
  )
}

export default Login;