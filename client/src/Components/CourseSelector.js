function CourseSelector(props) {
    return( 
        <div className="course"> 
            <h2>Select a course</h2>
            <select name="course">
                {props.courses.map(course =>
                    <option key={course} value={course}>{course}</option>
                )};
            </select>
        </div>
    )
}

export default CourseSelector