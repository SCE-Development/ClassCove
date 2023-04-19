import json
import re

'''
This script is used to clean the course data.
Removes courses that are not in the format of "DEPT123" or "DEPT123A"
'''

f = open("SJSUCourses_ORIGINAL.json")

data = json.load(f)


pattern = r'^[A-Z]{2,4}[1-9]{1}[0-9]{,3}[A-Z]{,2}$'

items_removed = 0

dep_course = {}

# Removes courses that are not in the format of "DEPT123" or "DEPT123A"
def remove_stupid_names(lst):
    lst[:] = [item for item in lst if (bool(re.match(pattern, item["courseName"].upper())) and len(item["courseName"]) < 10 and item["courseCount"] > 2)]
    for course in lst:
        if course["courseName"] in dep_course:
            dep_course[course["courseName"]] += 1
        else:
            dep_course[course["courseName"]] = 1

# Removes courses that are in mispelled departments
def remove_dupe_departments(lst):
    for course in lst:
        if dep_course[course["courseName"]] < 10:
            lst.remove(course)


professors = data["data"]["search"]["teachers"]["edges"]

for professor in professors:
    courses = professor["node"]["courseCodes"]
    start = len(courses)
    remove_stupid_names(courses)
    items_removed += start - len(courses)


for professor in professors:
    courses = professor["node"]["courseCodes"]
    start = len(courses)
    remove_dupe_departments(courses)
    items_removed += start - len(courses)


print("Number of Courses Removed: " + str(items_removed))

f.close()

with open("SJSUCourses.json", "w") as json_file:
    json.dump('', json_file)
    json_string = json.dumps(data)
    json_file.write(json_string)


