import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() { 
  const navigate = useNavigate();
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
    }
  }

  return( 
    <div>
      <h1>please log in</h1>
      <label htmlFor="username">Username</label>
      <input name="username" placeholder="username" type="text" id="username" />
      <label htmlFor="password">Password</label>
      <input name="password" type="password" id="password" />
      <button onClick={() => sendLogIn()}>Log In</button>
    </div>
  )
}

export default Login;