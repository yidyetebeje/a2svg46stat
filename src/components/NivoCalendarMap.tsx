'use client';
import { ResponsiveCalendar } from '@nivo/calendar'
import { calData } from './nivodata';
import React, { useEffect, useState } from 'react';
import { fecthCalendar } from '@/utils/leetcodequery';
import { Cal } from '@/app/api/users/route';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
interface NivoCal {
    day: string;
    value: number;
}
function format(date: Date) {
    if (!(date instanceof Date)) {
        throw new Error('Invalid "date" argument. You must pass a date instance')
    }

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
}
export default function NivoCalendarMap() {
    const [data, setData] = useState<NivoCal[]>([]);
    useEffect(() => {
        const getData = async () => {
            let res = await fetch('/api/calendar')
            res = await res.json();
            let cal = JSON.parse(res.data.matchedUser.userCalendar.submissionCalendar);
            console.log(cal, "cal");
            let activeDays = cal;
            activeDays = activeDays;
            let days = Object.entries(activeDays);
            days.sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
            days = days.map((day) => {
                let date = new Date(parseInt(day[0]) * 1000);
                return [format(date), day[1]];
            });
            const data = days.map((day) => {
                return {
                    day: day[0].toLocaleLowerCase(),
                    value: day[1] as number
                }
            })
            console.log(data, "data");
            setData(data);
        }
        getData();
        console.log(data, "data");
    }, [])
    return (
        <div className="w-5/6 h-2/3 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" >
            <ResponsiveCalendar
                data={data}
                from="2023-01-01"
                to="2023-07-12"
                emptyColor="#eeeeee"
                colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
                margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                yearSpacing={40}
                monthBorderColor="#ffffff"
                dayBorderWidth={2}
                dayBorderColor="#ffffff"
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'row',
                        translateY: 36,
                        itemCount: 4,
                        itemWidth: 42,
                        itemHeight: 36,
                        itemsSpacing: 14,
                        itemDirection: 'right-to-left'
                    }
                ]}
            />
        </div>
    )
}