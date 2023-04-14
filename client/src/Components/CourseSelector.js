import { useEffect, useState } from "react";
import Select from 'react-select';

function CourseSelector(props) {
    const [selectOptions, setSelectOptions] = useState([]); 
    useEffect(() => { 
        let options = [];
        for (let course of props.courses) { 
            options.push({value: course, label: course});
        }

        setSelectOptions(options);
        console.log(options);
    }, [props.courses])

    function setCourse(e) { 
        // e.target.value is the course the user chose
        console.log(e);
        props.setCourse(e.value);

        props.setProfessors(props.courseProfMap[e.value]);
        console.log(props.courseProfMap[e.value]);
    }
    return( 
        <div className="course"> 
            <h2>Select a course</h2>
            <Select options={selectOptions} onChange={(e) => setCourse(e)} /> 
        </div>
    )
}


export default CourseSelector