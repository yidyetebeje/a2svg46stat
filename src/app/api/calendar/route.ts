import { fecthCalendar } from "@/utils/leetcodequery";
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    try {
        const cal = await fecthCalendar("yidnekachewtebeje");
        return NextResponse.json(cal);
    } catch (e) {
        console.log(e)
        return NextResponse.json({ error: e })
    }

}