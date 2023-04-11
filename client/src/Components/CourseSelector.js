function CourseSelector(props) {

    function setCourse(e) { 
        // e.target.value is the course the user chose
        props.setCourse(e.target.value);
        console.log(e.target.value);

        props.setProfessors(props.courseProfMap[e.target.value]);
        console.log(props.courseProfMap[e.target.value]);
    }
    return( 
        <div className="course"> 
            <h2>Select a course</h2>
            <select name="course" onChange={(e) => setCourse(e)}>
                <option key="default" value="none">Choose a course</option>
                {props.courses.map(course =>
                    <option key={course} value={course}>{course}</option>
                )};
            </select>
        </div>
    )
}

export default CourseSelector