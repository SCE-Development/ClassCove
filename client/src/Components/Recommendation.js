import {useEffect, useState} from "react"; 
import { useLocation } from 'react-router-dom'
import React from 'react'
import "../stylesheets/login.css";

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
        if (course !== "") 
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
        <link
            href="http://fonts.googleapis.com/css?family=Montserrat:400,700"
            rel="stylesheet"
            type="text/css"
        ></link>
        
        <div className="recommendation-section">
            <div id="dashboard-header">
                <h1 className="title">Try these professors for {course} </h1>
            </div>
            <div className="recommendation-container">
                {professorRecs()}
            </div>
        </div>
    </div>
    )
}

export default Recommendation;