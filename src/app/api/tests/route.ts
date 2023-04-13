
import { contest } from './../../../data/contests';
import { codeForceUserInfo, CodeForceUserRating, CodeForceUserStatus, ContestStanding } from '@/utils/codeforcesquery';
import { NextRequest, NextResponse } from 'next/server';
import { contests } from '@/data/contests';
import { collection, doc, DocumentData, getDocs, setDoc } from 'firebase/firestore';
import { db } from '@/utils/firebaseConfig';
import group46 from '@/data/a2svgroup45.json';
import { user } from '@/interfaces/user';
export interface ContestRows {
    party: {
        members: {
            handle: string;
        }[];
    };
    rank: number;
    points: number;

}
export interface problemResults {
    points: number;
    rejectedAttemptCount: number;
    type: string;
    bestSubmissionTimeSeconds: number;
    problem: {
        contestId: number;
        index: string;
        name: string;
        type: string;
        points: number;
        rating: number;
    };
}
export interface ContestResult {
    problems: {
        contestId: number;
        index: string;
        name: string;
        type: string;
        points: number;
        rating: number;
    }[];
    rows: ContestRows[];
    contest: {
        id: number;
        name: string;
        type: string;
        phase: string;
        frozen: boolean;
        durationSeconds: number;
        startTimeSeconds: number;
        relativeTimeSeconds: number;
    };
}
export interface ContestStandingRes {
    id: number;
    status: string;
    result: ContestResult;
}
export interface Contest {
    contestId: number;
    contestName: string;
    rank: number;
    solved: number;
    total: number;
}
export interface ContestHistory {
    contestId: number;
    contestName: string;
    globalRank: number;
    localRank: number;
    solved: number;
    total: number;
    penalty: number;
}
export const dynamic = 'force-dynamic'
export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const username = url.searchParams.get('username');
    try {
        const codeforces: DocumentData[] = [];
        const ref = collection(db, 'contests');
        const contest = await getDocs(ref);
        contest.forEach((doc) => {
            codeforces.push(doc.data());
        });
        const userContestHistory = [];
        for (let i = 0; i < codeforces.length; i++) {
            const contest = codeforces[i] as ContestStandingRes;
            const userRank = codeforces[i].result.rows.filter((contest: ContestRows) => contest.party?.members[0]?.handle == username);
            const numberOfProblemSolved = userRank[0]?.points;
            const mapSolvedProblem = new Map();
            userRank[0]?.problemResults.forEach((problem:problemResults,x:number) => {
                mapSolvedProblem.set(codeforces[i].result.problems[x], problem);
            });
            const problems = Array.from(mapSolvedProblem);               
            const numberOfProblems = codeforces[i].result.problems.length;
            const localAttendant = JSON.parse(JSON.stringify(group46));
            let localAttendantRank = codeforces[i].result.rows.filter((contestRow: ContestRows) => localAttendant.some((contest: user) => contest.Codeforces == `https://codeforces.com/profile/${contestRow.party?.members[0]?.handle}`));
            localAttendantRank = localAttendantRank.sort((a: ContestRows, b: ContestRows) => a.rank - b.rank);
            let localUserRank = localAttendantRank.findIndex((contestRow: ContestRows) => contestRow.party?.members[0]?.handle == username);
            userContestHistory.push({
                contestId: contest.id,
                contestName: contest.result.contest.name,
                globalRank: userRank[0]?.rank,
                localRank: localUserRank + 1,
                solved: numberOfProblemSolved,
                total: numberOfProblems,
                problems,
                penalty: userRank[0]?.penalty,
            });

        }
        return NextResponse.json(userContestHistory);
    } catch (e) {
        console.log(e)
        return NextResponse.json({ error: e })
    }
    
}