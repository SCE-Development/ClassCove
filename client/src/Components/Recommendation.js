import {useEffect, useState} from "react"; 
import { useLocation } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

function Recommendation() { 
    const location = useLocation(); 

    const [professors, setProfessors] = useState([]);
    const [course, setCourse] = useState("");

    useEffect(() => { 
        console.log(location.state);
        setProfessors(location.state.professors); 
        setCourse(location.state.course);
    }, [location.state])

    function professorRecs() { 
        if (professors !== []) 
            return professors.map(prof => (
                <div> 
                    <p key={prof.firstName + " " + prof.lastName}>{prof.firstName + " " + prof.lastName}</p>
                    <p key={`${prof.firstName + " " + prof.lastName + "rating"}`}>Rating: {prof.avgRating}</p>
                    <p key={`${prof.firstName + " " + prof.lastName + "wouldTakeAgain"}`}>
                        Would take again: {Math.max(prof.wouldTakeAgainPercent, 0)}% 
                    </p>
                </div>
            ))

        return <p>No professors found</p>    
    }

    return(
        <div>
            <p>Try these professors for {course}</p>
            {professorRecs()}
        </div>
    )
}

export default Recommendation;