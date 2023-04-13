import { RecentAcSubmissionList, Root } from "@/interfaces/leetcoderes";

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
export async function fetchRecentSub(username: string) {
    const body = {
        variables: { username: "yidnekachewtebeje", limit: 30 },
        operationName: "recentAcSubmissions",
        query: "\n    query recentAcSubmissions($username: String!, $limit: Int!) {\n  recentAcSubmissionList(username: $username, limit: $limit) {\n    id\n    title\n    titleSlug\n    timestamp\n  statusDisplay \n lang }\n}\n    ",
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
    let data = await response.json();
    let res = data.data.recentAcSubmissionList as RecentAcSubmissionList[];
    return res;
}
export async function fetchUser(username: string) {
    const body =
    {
        query: "\n    query userPublicProfile($username: String!) {\n  matchedUser(username: $username) {\n    contestBadge {\n      name\n      expired\n      hoverText\n      icon\n    }\n    username\n    githubUrl\n    twitterUrl\n    linkedinUrl\n    profile {\n      ranking\n      userAvatar\n      realName\n      aboutMe\n      school\n      websites\n      countryName\n      company\n      jobTitle\n      skillTags\n      postViewCount\n      postViewCountDiff\n      reputation\n      reputationDiff\n      solutionCount\n      solutionCountDiff\n      categoryDiscussCount\n      categoryDiscussCountDiff\n    }\n  }\n}\n   ",
        variables: {
            username: "yidnekachewtebeje"
        },
        operationName: "userPublicProfile"
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
export const fetchLeetcodeData = async (username: string) => {
    // concurrently request
    const [calendar, submissionStats, recentSub, userProfile] = await Promise.all([
        fecthCalendar(username),
        fetchSubmissionStats(username),
        fetchRecentSub(username),
        fetchUser(username)
    ])
    return {
        calendar,
        submissionStats,
        recentSub,
        userProfile,
    }
}