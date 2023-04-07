const fs = require('fs');

let data = fs.readFileSync('SJSUCourses.json');
data = JSON.parse(data)["data"];
let edges = data["search"]["teachers"]["edges"]; 

let allCourses = new Set();
for (let edge of edges) { 
    let courses = edge["node"]["courseCodes"]; 
    courses.forEach(course => allCourses.add(course["courseName"]));
}

// alphabetically sort every course, converting to array first
allCourses = Array.from(allCourses)
allCourses.sort();

console.log(allCourses);