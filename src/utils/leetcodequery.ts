import { Root } from "@/interfaces/leetcoderes";

export async function fecthCalendar(username: string) {
    const body = {
        operationName: "userProfileCalendar",
        variables: {
            username,
        },
        query: "\n    query userProfileCalendar($username: String!, $year: Int) {\n  matchedUser(username: $username) {\n    userCalendar(year: $year) {\n      activeYears\n      streak\n      totalActiveDays\n      dccBadges {\n        timestamp\n        badge {\n          name\n          icon\n        }\n      }\n      submissionCalendar\n    }\n  }\n}\n    "
    }
    const response = await fetch("https://leetcode.com/graphql", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/json",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin"
        },
        "body": JSON.stringify(body),
        "method": "POST",
        'cache': 'no-store',
    })
    const data = await response.json();
    return data;
}
export async function fetchSubmissionStats(username: string) {
    const body = {
        operationName: "userProfileSubmissionStats",
        variables: {
            username,
        },
        query: "\n    query userProfileSubmissionStats($username: String!) {\n  matchedUser(username: $username) {\n    submitStats {\n      acSubmissionNum {\n        difficulty\n        count\n      }\n      totalSubmissionNum {\n        difficulty\n        submissions\n      }\n    }\n  }\n}\n    "
    }
    const response = await fetch("https://leetcode.com/graphql", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/json",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin"
        },
        "body": JSON.stringify(body),
        "method": "POST",
        'cache': 'no-store',
    })
    const data = await response.json() as Root;
    return data;
}
