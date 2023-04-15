import { user } from "@/interfaces/user";
import { fecthCalendar } from "@/utils/leetcodequery";
import { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import ts, { moveSyntheticComments } from "typescript";
import { getUsers } from "../route";
export interface Cal {
    date: string;
    active: boolean;
    submission: number;
}
export interface Res {
    activeDays: Cal[];
    user: string;
}
export const dynamic = 'force-dynamic'
export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const recievedMonth = url.searchParams.get("month") || new Date().getMonth().toString();
    const recievedYear = url.searchParams.get("year") || new Date().getFullYear().toString();
    const { username, mp } = getUsers();
    let res: Res[] = [];
    await Promise.all(username.map(async (us: string) => {
        let cal = await userCalendar(recievedMonth, recievedYear, us);
        let userres: Res = {
            activeDays: cal,
            user: mp.get(us)?.Name || us
        };
        res.push(userres);
    }));
    // create an array of date starting month upto current date
    // get number of date of the month
    return NextResponse.json({res});
    
}

async function userCalendar(recievedMonth: string, recievedYear: string, username: string) {
    let calendar = await fecthCalendar(username);
    let activeDays = JSON.parse(calendar.data.matchedUser?.userCalendar?.submissionCalendar);
    activeDays = activeDays;
    let days = Object.entries(activeDays);
    // change unix time to date
    days.sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
    days = days.map((day) => {
        let date = new Date(parseInt(day[0]) * 1000);
        return [date.toDateString(), day[1]];
    });
    days = days.filter((day) => new Date(day[0]).getMonth() == parseInt(recievedMonth) && new Date(day[0]).getFullYear() == parseInt(recievedYear));

    // create an array of date starting month upto current date
    // get number of date of the month
    let month = parseInt(recievedMonth);
    let year = parseInt(recievedYear);
    let daysInMonth = new Date(year, month + 1, 0).getDate();
    let res: Cal[] = [];
    let j = 0;
    for (let i = 1; i <= daysInMonth; i++) {
        let active = days.filter((day) => new Date(day[0]).getDate() == i);
        //@ts-ignore
        res.push({ date: i, active: active?.length > 0, submission: active?.length > 0 ? parseInt(active[0][1]) || 0 : 0 });

    }
    return res;
}
