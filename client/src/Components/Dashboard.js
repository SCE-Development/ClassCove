import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../stylesheets/login.css";
import CourseSelector from "./CourseSelector";

import { Link } from 'react-router-dom'

function Dashboard() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [courses, setCourses] = useState([]);

    // use this map to display data about professors
    const [course, setCourse] = useState("");
    const [professors, setProfessors] = useState("");
    const [courseProfMap, setCourseProfMap] = useState({});    

    useEffect(() => {
        async function getUser() {
            // return user from express route using session cookie
            let loggedIn = await axios.post(
                "http://localhost:6969/user/isLoggedIn",
                {
                    session: sessionStorage.getItem("sessionId"),
                }
            );
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
        await axios.post("http://localhost:6969/user/logout", {
            session: sessionStorage.getItem("sessionId"),
        });
    }

    async function getCourses(event) {
        let university = event.target.value;
        let url = await fetch(`http://localhost:3000/${university}Courses.json`);
        let data = await url.json();

        data = data["data"];
        let edges = data["search"]["teachers"]["edges"];

        let courseToProf = {};
        let allCourses = new Set();

        for (let edge of edges) {
            let courses = edge["node"]["courseCodes"];
            let professor = edge["node"]

            courses.forEach((course) => {
                // do not add classes with names that start with a digit
                course = course["courseName"];
                if (!(course.charAt(0) >= '0' && course.charAt(0) <= '9')) {
                    if (!(course in courseToProf)) {
                        courseToProf[course] = [];
                        allCourses.add(course);
                    }

                    // add the professor to this course 
                    courseToProf[course].push(professor);
                }
            });
        }

        // alphabetically sort every course, converting to array first
        allCourses = Array.from(allCourses);
        allCourses.sort();

        setCourses(allCourses);
        setCourseProfMap(courseToProf);

        console.log(courseToProf);
    }

    return (
        <div id="dashboard-content">
            <link
                href="http://fonts.googleapis.com/css?family=Montserrat:400,700"
                rel="stylesheet"
                type="text/css"
            ></link>
            <div className="dashboard-section">
                <div id="dashboard-header">
                    <h1>Ready to start planning, {userName}? </h1>
                </div>
                <div className="dashboard-container">
                    <div className="school">
                        <h2>Select a school</h2>
                        <select onChange={(event) => getCourses(event)} className="dropdown">
                            <option>Select a School</option>
                            <option>SJSU</option>
                        </select>
                    </div>

                    <CourseSelector courses={courses} setCourse={setCourse} courseProfMap={courseProfMap}
                        setProfessors={setProfessors} />

                    <button onClick={() => logout()}> Log out </button>

                    <div>
                        <Link to="/professors" state={{ professors: professors, course: course }}>
                        Search Professors
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
