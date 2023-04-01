import {useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";

function Dashboard() { 
    const navigate = useNavigate();
    const [session, setSession] = useState(""); 
    const [userName, setUserName] = useState("")

    useEffect(() => {
        console.log(document.cookie);
        setSession(document.cookie);

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
            <p> Your cookie is {session} </p>
            <h1>Welcome {userName} </h1>
            <button onClick={() => logout()}> Log out </button>
        </div>
    )
}

export default Dashboard;