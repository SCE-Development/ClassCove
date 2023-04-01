// replace the form action with a real url when ready
import axios from "axios";

function Register() { 
    function sendRegistration() { 
        axios.post('http://localhost:6969/sign-up', { 
            "username": document.getElementById('username').value, 
            "password": document.getElementById('password').value 
        })
    }

    return(
        <div>
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