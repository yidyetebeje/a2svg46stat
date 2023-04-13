import { getUsers } from "@/app/api/route";
import { LeetCodeUserResponse } from "@/app/api/users/[username]/route";
import CodeForceContestProgressTable from "@/components/CodeForceContestProgressTable";
import CodeForceCard from "@/components/CodeForcesCard";

import LeetCodeSubmissionChart from "@/components/LeetCodeSubmissionChart";
import ProfileCard from "@/components/ProfileCard";
import RecentSubCard from "@/components/RecentSubCard";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
export const dynamic = 'force-dynamic'
export default async function Page({params}: {params: {user: string}}) {
    const username = params.user;
    const infoSheetProfile = getUsers();
    let codeforces = infoSheetProfile.mp.get(username)?.Codeforces.split("/").slice(-1)[0] as string;
    return (
        <div className="flex gap-4 w-4/5 mx-auto flex-row mt-4 
        " >
            <div className="w-1/4 h-screen gap-4 flex flex-col">
                <ProfileCard username={username} />
                {/* @ts-expect-error Async Server Component */}
                <CodeForceCard username={codeforces} />
            </div>
            <div className="w-3/4 flex flex-col gap-4 overflow-y-auto">
                <img src={`https://leetcard.jacoblin.cool/${username}?ext=heatmap`} className="w-full" />
                {/* @ts-expect-error Async Server Component */}
                <CodeForceContestProgressTable username={codeforces} />
                <Suspense fallback={<div>Loading...</div>}>
                    <LeetCodeSubmissionChart username={username} />
                </Suspense>
                {/* @ts-expect-error Async Server Component */}
                <RecentSubCard username={username} />
            </div>     
        </div>

    )
}