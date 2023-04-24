import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../stylesheets/login.css";

function Login() {
    const navigate = useNavigate();
    const [errorVisible, setErrorVisible] = useState("hidden");

    async function sendLogIn() {
        let result = await axios.post("http://localhost:6969/user/log-in", {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
        });

        console.log(result);

        if (result["data"]["success"]) {
            // save cookie, then redirect to dashboard
            //document.cookie = result["data"]["cookie"];
            sessionStorage.setItem("sessionId", result["data"]["cookie"])
            navigate("/dashboard");
            return;
        }
        // login failed
        setErrorVisible("visible");
    }

    return (
        <div>
            <link
                href="http://fonts.googleapis.com/css?family=Montserrat:400,700"
                rel="stylesheet"
                type="text/css"
            ></link>
            <div className={errorVisible}>
                <p>Invalid username or password</p>
            </div>

            <div className="login-block" >
                <h1>Welcome Back!</h1>
                <input
                    type="text"
                    placeholder="Username"
                    id="username"
                    name="username"
                />
                <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    name="username"
                />
                <button onClick={() => sendLogIn()}>Log In</button>

            </div>
        </div>
    );
}

export default Login;
