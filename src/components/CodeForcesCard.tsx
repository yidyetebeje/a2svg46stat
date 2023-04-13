import { CodeforceStatRes } from "@/app/api/codeforces/[username]/route";
import { Suspense } from "react";
import CodeForcesIcon from "./Icons/CodeForce";
async function getData(username: string) {
    const data = await fetch(`https://a2svg46stat.vercel.app/api/codeforces/${username}`, 
         {
        cache: 'no-store',
        }
    );
    return await data.json() as CodeforceStatRes;
}
export const dynamic = 'force-dynamic'
export default async function CodeForceCard({username}: {username: string}) {
    const data = await getData(username);
    console.log(data, "data recieved");
    return (
        <Suspense fallback={"loading"}>
            <div className="flex flex-col gap-2 w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 py-5 px-10 text-sm font-semibold">
            <div className="flex align-middle justify-start items-center mb-1">
                <svg className="w-7 h-7 mr-2 -ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="code-forces"><path fill="#F44336" d="M24 19.5V12a1.5 1.5 0 0 0-1.5-1.5h-3A1.5 1.5 0 0 0 18 12v7.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5z" /><path fill="#2196F3" d="M13.5 21a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 13.5 3h-3C9.673 3 9 3.672 9 4.5v15c0 .828.673 1.5 1.5 1.5h3z" /><path fill="#FFC107" d="M0 19.5c0 .828.673 1.5 1.5 1.5h3A1.5 1.5 0 0 0 6 19.5V9a1.5 1.5 0 0 0-1.5-1.5h-3C.673 7.5 0 8.172 0 9v10.5z" /></svg>
                <h3 className="text-2xl text-blue-700 font-bold">{data.userInfo[0].handle}</h3>
            </div>
            <div className="flex justify-between items-center mb-2">
                <p className=" text-gray-500 first-letter:capitalize">{data.userInfo[0].rank}<span className="dark:text-white">(max: </span>{data.userInfo[0].maxRank })</p>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                    <p>Contest Rating</p>
                </div>
                <p>{data.userInfo[0].rating}</p>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68L9.669.864zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702 1.509.229z" />
                        <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z" />
                    </svg>
                    <p>Max Rating</p>
                </div>
               
                <p>{data.userInfo[0].maxRating}</p>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5 mr-1" viewBox="0 0 16 16">
                        <path d="M14.5 2h-3c-0.011 0 -0.02 0.005 -0.03 0.006 -0.326 -0.562 -0.683 -0.872 -0.71 -0.893A0.501 0.501 0 0 0 10.443 1h-4.886a0.497 0.497 0 0 0 -0.317 0.114c-0.026 0.021 -0.385 0.331 -0.71 0.893C4.52 2.006 4.511 2 4.5 2H1.5a0.498 0.498 0 0 0 -0.497 0.555c0.17 1.53 1.284 4.469 4.257 4.888a12.252 12.252 0 0 0 1.155 1.401c0.024 0.025 0.056 0.039 0.084 0.059V10h-1a0.5 0.5 0 0 0 -0.5 0.5v1.5H4a0.5 0.5 0 0 0 -0.5 0.5v2a0.5 0.5 0 0 0 0.5 0.5h8a0.5 0.5 0 0 0 0.5 -0.5v-2a0.5 0.5 0 0 0 -0.5 -0.5h-1v-1.5a0.5 0.5 0 0 0 -0.5 -0.5h-1v-1.097c0.029 -0.019 0.06 -0.034 0.084 -0.059a12.315 12.315 0 0 0 1.155 -1.401c2.974 -0.418 4.088 -3.357 4.257 -4.888a0.498 0.498 0 0 0 -0.124 -0.389A0.495 0.495 0 0 0 14.5 2zM2.102 3h2.028c-0.058 0.227 -0.105 0.466 -0.121 0.732 -0.051 0.805 0.129 1.639 0.534 2.497C2.926 5.574 2.314 3.887 2.102 3zM11.5 14H4.5v-1h7v1zm-1.5 -2h-4v-1h4v1zm-2.5 -2v-1h1v1h-1zm1.505 -2h-2.01c-1.391 -1.51 -2.061 -2.917 -1.99 -4.184 0.053 -0.962 0.527 -1.576 0.752 -1.815h4.486c0.226 0.241 0.699 0.855 0.752 1.816 0.07 1.268 -0.599 2.675 -1.99 4.184zm2.455 -1.776c0.404 -0.856 0.583 -1.689 0.532 -2.494A3.913 3.913 0 0 0 11.871 3h2.023c-0.218 0.882 -0.839 2.568 -2.434 3.224z" />
                    </svg>
                    <p>Contests</p>
                </div>
                <p>{data.res.contests}</p>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5 mr-1" viewBox="0 0 16 16">
                        <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z" />
                        <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z" />
                    </svg>
                    <p>problem solved</p>
                </div>
                <p>{data.res.solved}</p>
            </div>
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="mr-1 w-5 h-5" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M2.333 5.333a3.667 3.667 0 1 1 5.731 3.031 6.003 6.003 0 0 1 3.933 5.453.5.5 0 0 1-1 .03 5 5 0 0 0-9.995 0 .5.5 0 0 1-.999-.029 6.003 6.003 0 0 1 3.933-5.454 3.663 3.663 0 0 1-1.603-3.031zM6 2.667A2.667 2.667 0 1 0 6 8a2.667 2.667 0 0 0 0-5.333z" /><path d="M11.527 5.333c-.099 0-.195.007-.289.02a.5.5 0 1 1-.141-.989 3.02 3.02 0 0 1 2.253 5.398 4.46 4.46 0 0 1 2.637 4.071.5.5 0 0 1-1 0 3.462 3.462 0 0 0-2.464-3.315l-.356-.107V9.294l.273-.139a2.02 2.02 0 0 0-.913-3.822z" />
                    </svg>
                    <p>Friend Of</p>
                </div>
                <p>{data.userInfo[0].friendOfCount}</p>
            </div>
            <div className="flex justify-center items-center text-xs flex-wrap gap-2">
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>OK: {data.res.accepted}</p>
                </div>
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1 text-red-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                    <p>Wrong: {data.res.wrongAnswer}</p>
                </div>
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1 text-yellow-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                    <p>TLE: {data.res.timeLimitExceeded}</p>
                </div>
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1 text-teal-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
                    </svg>

                    <p>MLE: {data.res.memoryLimitExceeded}</p>
                </div>

            </div>
            </div>
        </Suspense>
    )
}