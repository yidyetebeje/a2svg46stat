import { leetcoderes } from './../../interfaces/leetcoderes';
import { fecthCalendar } from './../../utils/leetcodequery';
import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { LeetCode, UserProfile } from 'leetcode-query';
import * as group46 from '@/data/a2svgroup45.json';
import { user } from '@/interfaces/user';
export const revalidate = 0;
export const dynamic = true;

export async function GET(request: NextRequest) {
    try {
        let { username, mp } = getUsers();
        const res: leetcoderes[] = [];
        const leetcode = new LeetCode();
        await Promise.all(username.map(async (us: string) => {
            let user = await leetcode.user(us);
            let calendar = await fecthCalendar(us);
            let userres: leetcoderes = {
                Name: mp.get(us)?.Name,
                username: us,
                easy: user.matchedUser?.submitStats.acSubmissionNum.filter((u) => u['difficulty'] == "Easy")[0].count,
                medium: user.matchedUser?.submitStats.acSubmissionNum.filter((u) => u['difficulty'] == "Medium")[0].count,
                hard: user.matchedUser?.submitStats.acSubmissionNum.filter((u) => u['difficulty'] == "Hard")[0].count,

                total: user.matchedUser?.submitStats.acSubmissionNum.filter((u) => u['difficulty'] == "All")[0].count,
                easysub: user.matchedUser?.submitStats.totalSubmissionNum.filter((u) => u['difficulty'] == "Easy")[0].submissions,
                mediumsub: user.matchedUser?.submitStats.totalSubmissionNum.filter((u) => u['difficulty'] == "Medium")[0].submissions,
                hardsub: user.matchedUser?.submitStats.totalSubmissionNum.filter((u) => u['difficulty'] == "Hard")[0].submissions,
                totalsub: user.matchedUser?.submitStats.totalSubmissionNum.filter((u) => u['difficulty'] == "All")[0].submissions,
                currentStreak: calendar.data.matchedUser.userCalendar.streak,
                totalActiveDays: calendar.data.matchedUser.userCalendar.totalActiveDays,
                submissionCalendar: calendar.data.matchedUser.userCalendar.submissionCalendar
            };
            res.push(userres);
        }));
        return NextResponse.json({ res });
    } catch (e) {
        return NextResponse.json({ error: "error getting user" });
    }
  
   
}

export function getUsers() {
    try {
        let users = JSON.parse(JSON.stringify(group46));
        let userslist: user[] = Object.values(users);
        let mp = new Map<string, user>();
        userslist.forEach((u: user) => {
            if (u.Leetcode != null && u.Leetcode.indexOf("https://leetcode.com/") != -1) {
                mp.set(u.Leetcode.replace("https://leetcode.com/", "").replace("/", ""), u);
            }
        });
        let username = userslist.map((u: user) => u.Leetcode);
        username = username.filter((u: string) => u != null && u?.indexOf("https://leetcode.com/") != -1).map((u: string) => u?.replace("https://leetcode.com/", "")).map((u: string) => u?.replace("/", ""));
        return { username, mp };
    } catch (e) {
        throw new Error("Error in getting users");
    }
}
