import { fecthCalendar } from '@/utils/leetcodequery';
import { NextRequest, NextResponse } from 'next/server';
import { Cal } from '../route';
export async function GET(request: NextRequest) {
    const data = await aggregateSubmission("yidnekachewtebeje")
    return NextResponse.json({ data });
}
export interface MonthSub {
    month: string;
    submission: number;
    year: number;
}
export async function aggregateSubmission(username: string) {
    let calendar = await fecthCalendar(username);
    let activeDays = JSON.parse(calendar.data.matchedUser.userCalendar.submissionCalendar) as Cal; 
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