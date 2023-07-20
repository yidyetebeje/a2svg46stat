import { codeForceUserInfo, CodeForceUserRating, CodeForceUserStatus } from "@/utils/codeforcesquery";
import { NextRequest } from "next/server";

export interface CodeforceUserStatus{
    id: number;
    contestId: number;
    creationTimeSeconds: number;
    relativeTimeSeconds: number;
    problem: {
        contestId: number;
        index: string;
        name: string;
        type: string;
        points: number;
        rating: number;
    };
    verdict: string;
    testset: string;
    passedTestCount: number;
    timeConsumedMillis: number;
    memoryConsumedBytes: number;
}
export interface CodeforceStatRes {
    userInfo: {
        handle: string;
        rating: number;
        maxRating: number;
        maxRank: string;
        rank: string;
        friendOfCount: string;
        registrationTimeSeconds: number;
    }[];
    res: {
        accepted: number;
        wrongAnswer: number;
        timeLimitExceeded: number;
        memoryLimitExceeded: number;
        runtimeError: number;
        compilationError: number;
        other: number;
        solved: number;
        contests: number;
    }
}
export const dynamic = 'force-dynamic'
export async function GET(request: NextRequest, {params}: {params: {username: string}}) {
    // extract path params
    const username = params.username;
    try {
        const userInfo = await codeForceUserInfo(username);
        console.log('userInfo', userInfo)
        const userStatus = await CodeForceUserStatus(username);
        const res = {
            accepted: 0,
            wrongAnswer: 0,
            timeLimitExceeded: 0,
            memoryLimitExceeded: 0,
            runtimeError: 0,
            compilationError: 0,
            other: 0,
            solved: 0,
            contests: 0,
        }
        let contests = await CodeForceUserRating(username);
        res.contests = contests.result.length;
        let solved = new Set();
        let id: string;

        if (userStatus.status == "OK") {
            for (let i = 0; i < userStatus.result.length; i++) {
                const submission = userStatus.result[i];
                id = submission.problem.contestId + " " + submission.problem.index;
                if (submission.verdict == "OK" && !solved.has(id)) {
                    solved.add(id);
                }
                if (submission.verdict == "OK") {
                    res.accepted++;
                }
                else if (submission.verdict == "WRONG_ANSWER") {
                    res.wrongAnswer++;
                }
                else if (submission.verdict == "TIME_LIMIT_EXCEEDED") {
                    res.timeLimitExceeded++;
                }
                else if (submission.verdict == "MEMORY_LIMIT_EXCEEDED") {
                    res.memoryLimitExceeded++;
                }
                else if (submission.verdict == "RUNTIME_ERROR") {
                    res.runtimeError++;
                }
                else if (submission.verdict == "COMPILATION_ERROR") {
                    res.compilationError++;
                }
                else {
                    res.other++;
                }
            }
        }
        res.solved = solved.size;
        return new Response(JSON.stringify({ userInfo: userInfo?.result, res }), {
            headers: { "content-type": "application/json; charset=UTF-8" },
        });
    } catch (e) {
        console.log(e)
        return new Response(JSON.stringify({ error: e }), {
            headers: { "content-type": "application/json; charset=UTF-8" },
        });
    }
}