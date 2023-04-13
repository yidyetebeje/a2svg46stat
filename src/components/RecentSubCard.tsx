import { formatTimeAgo } from "@/utils/TimeFormater";
import { RecentSubmission } from "leetcode-query";

async function getData(username: string) {
    const res = await fetch(`http://127.0.0.1:3000/api/users/${username}`, {
        cache: 'no-store',
    })
    const data = await res.json()
    return data.recentSubs as RecentSubmission[] | any;
}
export default async function RecentSubCard({username}: {username: string}) {
    let data = await getData(username);
    return (

        <div className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <h1 className="text-xl font-bold py-2 px-4">LeetCode Recent Activity</h1>
            {data.map((sub: any | RecentSubmission) => {
                return (
                    <a href={`https://leetcode.com/submissions/detail/${sub.id}/`} target="_blank" key={sub.id}  aria-current="true" className="grid grid-cols-2 justify-between items-center  w-full px-4 py-2 text-white bg-blue-700 border-b border-gray-200 cursor-pointer dark:bg-gray-800 dark:border-gray-600">
                        <div>
                            <p className="text-sm font-bold">{sub.title}</p>
                            {sub.statusDisplay === "Accepted" ? <p className="text-green-500 font-semiBold">{sub.statusDisplay}</p> : <p className="text-red-500 font-semiBold">{sub.statusDisplay}</p>}
                        </div>
                        <p className="text-gray-500 text-sm justify-self-end">{formatTimeAgo(new Date(parseInt(sub.timestamp) * 1000))}</p>
                    </a>
                )
            })}
        </div>

    )
}