import { LeetCodeUser, MatchedUser } from './../../../../interfaces/leetcoderes';
import { fetchLeetcodeData } from './../../../../utils/leetcodequery';
import { fecthCalendar, fetchRecentSub } from '@/utils/leetcodequery';
import { NextRequest, NextResponse } from 'next/server';
import { Cal } from '../route';
import group46 from "../../../../data/a2svgroup45.json"
import { getUsers } from '../../route';
import { user } from '@/interfaces/user';
export const dynamic = 'force-dynamic'
export interface LeetCodeUserResponse {
    aggregateSubByMonth: MonthSub[];
    recentSubs: any;
    subStats: any;
    user: any;
    infoSheetProfile: user;
}
export async function GET(request: NextRequest) {
    try {
        const username = "yidnekachewtebeje";
        const { calendar, submissionStats, recentSub, userProfile } = await fetchLeetcodeData("yidnekachewtebeje");
        const cal = JSON.parse(calendar.data.matchedUser.userCalendar.submissionCalendar) as Cal;
        const subStats = submissionStats.data.matchedUser.submitStats;
        const recentSubs = recentSub;
        const aggregateSubByMonth = aggregateSubmission(cal);
        const user: LeetCodeUser = {
            ranking: userProfile.data.matchedUser.profile.ranking,
            username: userProfile.data.matchedUser.username,
            userAvatar: userProfile.data.matchedUser.profile.userAvatar,
        };
        const res = {
            aggregateSubByMonth,
            recentSubs,
            subStats,
            user,
        }
        return NextResponse.json(res);
    } catch (e) {
        return NextResponse.json({error: "can't fetch data"}, )
    }
  
}
export interface MonthSub {
    month: string;
    submission: number;
    year: number;
}
export function aggregateSubmission(calendar: Cal) {
    console.log(calendar)
    let activeDays = calendar; 
    activeDays = activeDays;
    let days = Object.entries(activeDays);
    days.sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
    days = days.map((day) => {
        let date = new Date(parseInt(day[0]) * 1000);
        return [date.toDateString(), day[1]];
    });
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    let res: MonthSub[] = [];
    for (let i = 0; i <= currentMonth; i++) {
        let month = days.filter((day) => new Date(day[0]).getMonth() == i && new Date(day[0]).getFullYear() == currentYear);
        let submission = month.reduce((acc, cur) => acc + parseInt(cur[1]), 0);
        res.push({ month: i.toString(), submission: submission, year: currentYear });
    }
    let month = days.filter((day) => new Date(day[0]).getMonth() == 11 && new Date(day[0]).getFullYear() == currentYear - 1);
    let submission = month.reduce((acc, cur) => acc + parseInt(cur[1]), 0);
    res.push({ month: "11", submission: submission, year: currentYear - 1});
    return res;
}
