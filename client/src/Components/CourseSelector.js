import { useEffect, useState } from "react";
import Select from 'react-select';

function CourseSelector(props) {
    const [selectOptions, setSelectOptions] = useState([]); 

    // combine departments and course numbers to search 
    const [deps, setDeps] = useState([]); 
    const [depsCourseNums, setDepsCourseNums] = useState({}); 

    const [selectedDep, setSelectedDep] = useState("");
    const [selectedCourseNum, setSelectedCourseNum] = useState("");
    const [courseNumsForSelectedDep, setCourseNumsForSelectedDep] = useState([]);

    useEffect(() => { 
        let options = [];
        for (let course of props.courses) { 
            options.push({value: course, label: course});
        }

        setSelectOptions(options);
        console.log("options" + options);

        let depsCourseNumbers = getDepsCourseNums(props.courses); 
        setDepsCourseNums(depsCourseNumbers); 

        let departments = []
        for (let dep of Object.keys(depsCourseNumbers)) { 
            departments.push({value: dep, label: dep});
        }

        setDeps(departments);
        console.log(depsCourseNumbers);
    }, [props.courses])

    function setCourse(course) { 
        // e.target.value is the course the user chose
        console.log(course);
        props.setCourse(course);

        props.setProfessors(props.courseProfMap[course]);
        console.log(props.courseProfMap[course]);
    }

    function getDepsCourseNums(courses) { 
        let deps = {}; 
        for (let c of courses) { 
            let dep = getCourseDepartment(c);
            // add dep to dict
            if (!(deps.hasOwnProperty(dep))) deps[dep] = [];
            deps[dep].push(getCourseNumber(c));
        }

        return deps;
    }

    function getCourseDepartment(course) { 
        // get a course's dep.
        let dep = ""; 
        for (let i = 0; i < course.length; i++) { 
            // get substring before first digit
            if (course[i] >= '0' && course[i] <= '9') return dep;
            dep += course[i];
        }

        return dep
    }

    function getCourseNumber(course) { 
        let dep = ""; 
        // boolean to extract shit after the department
        let finding = false;

        for (let i = 0; i < course.length; i++) { 
            // get substring before first digit
            if (course[i] >= '0' && course[i] <= '9') finding = true;
            if (finding) dep += course[i];
        }
        return dep 
    }

    function setDepartment(e) { 
        // e.valueis selected department 
        setSelectedDep(e.value);

        // get course nums for department
        let nums = [];
        for (let num of depsCourseNums[e.value]) { 
            nums.push({value: num, label: num});
        }
        setCourseNumsForSelectedDep(nums);

        setCourse(e.value); // no courseNum yet
        setSelectedCourseNum(""); // wipe selected courseNum
    }

    function setCourseNum(e) { 
        setSelectedCourseNum(e.value); 
        setCourse(selectedDep + e.value);

        console.log(e.value);
        console.log(selectedDep + e.value);
    }

    return( 
        <div className="course"> 
            <h2>Select a course</h2>

            <h4>Department</h4>
            <Select options={deps} onChange={(e) => setDepartment(e)} /> 

            <h4>Course Number</h4>
            <Select value={{label: selectedCourseNum}} options={courseNumsForSelectedDep} 
                onChange={(e) => setCourseNum(e)} /> 

        </div>
    )
}


export default CourseSelector