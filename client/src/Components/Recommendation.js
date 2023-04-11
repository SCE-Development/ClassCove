import {useEffect, useState} from "react"; 
import { useLocation } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

function Recommendation() { 
    const location = useLocation(); 
    const navigate = useNavigate() 

    const [professors, setProfessors] = useState([{"default": "No professors found"}]);
    const [course, setCourse] = useState("No Course");

    useEffect(() => { 
        console.log(location.state);
        setProfessors(location.state.professors); 
        setCourse(location.state.course);
    }, [])

    return(
        <div>
            <p>Try these professors for {course}</p>
            {professors.map(prof => (<p key={prof.firstName + " " + prof.lastName}>{prof.firstName + " " + prof.lastName}</p>))} 
        </div>
    )
}

export default Recommendation;