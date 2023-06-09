import requests
import json
url = 'https://www.ratemyprofessors.com/graphql'

headers = {
    'Accept': '*/*',
    'Accept-Language': 'en-US,en;q=0.9',
    'Authorization': 'Basic dGVzdDp0ZXN0',
    'Connection': 'keep-alive',
    'Content-Type': 'application/json',
    # 'Cookie': 'ccpa-notice-viewed-02=true; ad_blocker_overlay_2019=false; previousSchoolID=1072; cid=WDjPxAq3FF-20221123; userSchoolId=U2Nob29sLTg4MQ==; userSchoolLegacyId=881; userSchoolName=San%20Jose%20State%20University',
    'Origin': 'https://www.ratemyprofessors.com',
    'Referer': 'https://www.ratemyprofessors.com/search/teachers?query=*&sid=881',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
    'sec-ch-ua': '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
}
# query for list for schools
json_data = {
    'query': 'query SchoolSearchPaginationQuery(\n  $count: Int!\n  $cursor: String\n  $query: SchoolSearchQuery!\n) {\n  search: newSearch {\n    ...SchoolSearchPagination_search_1jWD3d\n  }\n}\n\nfragment SchoolSearchPagination_search_1jWD3d on newSearch {\n  schools(query: $query, first: $count, after: $cursor) {\n    edges {\n      cursor\n      node {\n        name\n        ...SchoolCard_school\n        id\n        __typename\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    resultCount\n  }\n}\n\nfragment SchoolCard_school on School {\n  legacyId\n  name\n  numRatings\n  avgRating\n  avgRatingRounded\n  ...SchoolCardHeader_school\n  ...SchoolCardLocation_school\n}\n\nfragment SchoolCardHeader_school on School {\n  name\n}\n\nfragment SchoolCardLocation_school on School {\n  city\n  state\n}\n',
    'variables': {
        'count': 9010,
        'cursor': 'YXJyYXljb25uZWN0aW9uOjc=',
        'query': {
            'text': '',
        },
    },
}
response = requests.post(url, headers=headers, json=json_data)
data = json.loads(response.text)

for school in range(0, 9010):
    curid = data["data"]["search"]["schools"]["edges"][school]["node"]["id"]
    json_data = {
        'query': 'query TeacherSearchResultsPageQuery(\n  $query: TeacherSearchQuery!\n  $schoolID: ID\n) {\n  search: newSearch {\n    ...TeacherSearchPagination_search_1ZLmLD\n  }\n  school: node(id: $schoolID) {\n    __typename\n    ... on School {\n      name\n    }\n    id\n  }\n}\n\nfragment TeacherSearchPagination_search_1ZLmLD on newSearch {\n  teachers(query: $query, first: 8, after: "") {\n    didFallback\n    edges {\n      cursor\n      node {\n        ...TeacherCard_teacher\n        id\n        __typename\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    resultCount\n    filters {\n      field\n      options {\n        value\n        id\n      }\n    }\n  }\n}\n\nfragment TeacherCard_teacher on Teacher {\n  id\n  legacyId\n  avgRating\n  numRatings\n  ...CardFeedback_teacher\n  ...CardSchool_teacher\n  ...CardName_teacher\n  ...TeacherBookmark_teacher\n}\n\nfragment CardFeedback_teacher on Teacher {\n  wouldTakeAgainPercent\n  avgDifficulty\n}\n\nfragment CardSchool_teacher on Teacher {\n  department\n  school {\n    name\n    id\n  }\n}\n\nfragment CardName_teacher on Teacher {\n  firstName\n  lastName\n}\n\nfragment TeacherBookmark_teacher on Teacher {\n  id\n  isSaved\n}\n',
        'variables': {
            'query': {
                'text': '',
                'schoolID': curid + '=',
                'fallback': True,
                'departmentID': None,
            },
            'schoolID': curid + '=',
        },
    }

print(response.text)
