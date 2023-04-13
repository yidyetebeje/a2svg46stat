'use client';
import React, { use, useEffect, useLayoutEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    Filler,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { LeetCodeUserResponse, MonthSub } from '@/app/api/users/[username]/route';
import { monthOptions } from './ActiveDaysTable';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

export const options = {
    responsive: true,
    
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: false,
            text: 'LeetCode Submission',
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
    ],
};

export default function LeetCodeSubmissionChart({username}: {username: string}) {
    const [api, setApi] = useState<MonthSub[]>();
    useLayoutEffect(() => {
        fetchData();
    }, [])
    const fetchData = async () => {
        let data = await fetch(`/api/users/${username}`, {
            cache: 'no-store',
        });
        let d = await data.json() as LeetCodeUserResponse;
        let result = d.aggregateSubByMonth;
        result.sort((a, b) => {
            if (a.year == b.year) return parseInt(a.month) - parseInt(b.month);
            else return a.year - b.year;
        })
        setApi(result)
    }
    const data = React.useMemo(() => {
        return {
            labels: api?.map((sub: MonthSub)=> monthOptions[parseInt(sub.month)].value) || ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'LeetCode Submissions',
                    data: api?.map((sub)=> sub.submission) || [0, 0, 0, 0, 0, 0, 0],
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
            ],
        }
    },[api])
    const memoizedChart = React.useMemo(() => {
        return (
            <Line data={data} options={options} />
        );
    }, [api]);
    return (
        <div className="w-2/3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            {memoizedChart}
        </div> 
    )
    
}