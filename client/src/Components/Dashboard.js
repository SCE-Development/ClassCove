import {useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import "../stylesheets/login.css";

function Dashboard() { 
    const navigate = useNavigate();
    const [userName, setUserName] = useState("")

    useEffect(() => {
        console.log(document.cookie);

        async function getUser() { 
            // return user from express route using session cookie
            let loggedIn = await axios.post("http://localhost:6969/isLoggedIn", { 
                session: document.cookie
            })
            loggedIn = loggedIn["data"]; 

            if (loggedIn["success"]) {
              setUserName(loggedIn["userName"]); 
              return;
            }
            // user has no session, boot them to the login page
            navigate("/login");
        }
        
        getUser();
      }, []);

      async function logout() { 
        navigate("/login");
        await axios.post("http://localhost:6969/logout", { 
            session: document.cookie
        })
      }

    return( 
        <div> 
            <link href='http://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css'></link>
            <h1>Ready to start planning, {userName}? </h1>
            <div className="dashboard-section">
                <div className="dashboard-container">
                    <div className="school">
                        <h2>Select a school</h2>
                        <select className="dropdown">
                            <option>Select your school...</option>
                        </select>
                    </div>
                    <div className="course">
                        <h2>Select a course</h2>
                        <select className="dropdown">
                            <option>Select a course...</option>
                        </select>
                    </div>
                <button onClick={() => logout()}> Log out </button>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;