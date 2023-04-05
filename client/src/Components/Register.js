// replace the form action with a real url when ready
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import "../stylesheets/login.css";

function Register() { 
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
        else
            setErrorVisible("visible");
    }

    return(
        <div> 
            <link href='http://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css'></link>
            <div className={errorVisible}> 
                <p>Oh nah!! That username is TAKEN.</p>
            </div>
            <div className="register-block">
                <h1>Sign Up</h1>
                <label htmlFor="username">Username</label>
                <input name="username" placeholder="username" type="text" id="username" />
                <label htmlFor="password">Password</label>
                <input name="password" placeholder="password" type="password" id="password"/>
                <button onClick={() => sendRegistration()}>Sign Up</button>
            </div>
        </div>
    )
}

export default Register