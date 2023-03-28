import requests
url = 'https://www.ratemyprofessors.com/graphql'
headers = {
    "Authorization": "Basic dGVzdDp0ZXN0",
"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
"Content-Type": "application/json"
}
data = {
    "query": "query TeacherSearchResultsPageQuery(\n  $query: TeacherSearchQuery!\n  $schoolID: ID\n) {\n  search: newSearch {\n    ...TeacherSearchPagination_search_1ZLmLD\n  }\n  school: node(id: $schoolID) {\n    __typename\n    ... on School {\n      name\n    }\n    id\n  }\n}\n\nfragment TeacherSearchPagination_search_1ZLmLD on newSearch {\n  teachers(query: $query, first: 9, after: \"\") {\n    didFallback\n    edges {\n          node {\n        ...TeacherCard_teacher\n        id\n        __typename\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    resultCount\n    \n  }\n}\n\nfragment TeacherCard_teacher on Teacher {\n  id\n     ...CardFeedback_teacher\n  ...CardSchool_teacher\n  ...CardName_teacher\n  ...TeacherBookmark_teacher\n}\n\nfragment CardFeedback_teacher on Teacher {\n  wouldTakeAgainPercent\n }\n\nfragment CardSchool_teacher on Teacher {\n    courseCodes {courseName courseCount}\n}\n\nfragment CardName_teacher on Teacher {\n    lastName\n}\n\nfragment TeacherBookmark_teacher on Teacher {\n  id\n  }\n",
    "variables": {
        "query": {
            "text": "",
            "schoolID": "U2Nob29sLTQ1",
            "fallback": "true",
            "departmentID": "null"
        },
        "schoolID": "U2Nob29sLTQ1"
    }
}


x = requests.post(url, headers = headers, json = data)

print(x.text)