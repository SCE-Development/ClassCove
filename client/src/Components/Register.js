// replace the form action with a real url when ready
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Register() { 
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
          console.log('redirect');
        }
    } 

    async function sendRegistration() { 
        let registration = await axios.post('http://localhost:6969/sign-up', { 
            "username": document.getElementById('username').value, 
            "password": document.getElementById('password').value 
        })

        if (registration["data"]["success"]) 
            await sendLogIn();
    }

    return(
        <div> 
            <div> 
                <p>Invalid username or password</p>
            </div>

            <h1>Sign Up</h1>
            <label htmlFor="username">Username</label>
            <input name="username" placeholder="username" type="text" id="username" />
            <label htmlFor="password">Password</label>
            <input name="password" type="password" id="password"/>
            <button onClick={() => sendRegistration()}>Sign Up</button>
        </div>
    )
}

export default Register