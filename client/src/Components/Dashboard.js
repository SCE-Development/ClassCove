import {useState, useEffect } from "react"
import axios from "axios"

function Dashboard() { 
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

            console.log(loggedIn);
            if (loggedIn["success"]) setUserName(loggedIn["userName"]);
        }
        
        getUser();
      }, []);

    return( 
        <div> 
            <p> Your cookie is {session} </p>
            <h1>Welcome {userName} </h1>
        </div>
    )
}

export default Dashboard;