import { getUsers } from "@/app/api/route";
import { LeetCodeUserResponse } from "@/app/api/users/[username]/route";
import { user } from "@/interfaces/user";
import CodeForcesIcon from "./Icons/CodeForce";
import HackerRankLogo from "./Icons/HackerRank";
export const dynamic = 'force-dynamic'
export default function ProfileCard({ username }: { username: string }) {
    
    const infoSheetProfiles = getUsers();
    const infoSheetProfile = infoSheetProfiles.mp.get(username) as user;
    let profile: user = infoSheetProfile;

    return (
        <section
            className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="w-full flex flex-col gap-2 flex-wrap">
                <h2 className="mb-2 text-xl font-semibold leading-none text-gray-900 md:text-2xl dark:text-white">Profile</h2>
                <dl className="flex flex-col flex-wrap">
                    <div className="flex gap-2 align-baseline items-center">

                        <dd className="font-light text-gray-500 dark:text-gray-400">Name</dd>
                        <dt className="font-semibold leading-none text-gray-900 dark:text-white">{profile.Name}</dt>
                    </div>
                    <div className="flex gap-2 align-center items-center">
                        <dd className="font-light text-gray-500 dark:text-gray-400">Department</dd>
                        <dt className="font-semibold leading-none text-gray-900 dark:text-white">{profile.Department}</dt>
                    </div>
                    <div className="flex gap-2 align-center items-center">
                        <dd className="font-light text-gray-500  dark:text-gray-400">submission repo</dd>
                        <dt className="font-semibold leading-none text-gray-900 dark:text-white"><a href={profile.SubmissionRepository} target="_blank">Github</a></dt>
                    </div>
                    <div className="flex gap-2 align-center items-center">
                        <dd className="font-light text-gray-500  dark:text-gray-400">email</dd>
                        <dt className="font-semibold leading-none text-gray-900 dark:text-white"><a href={profile.SubmissionRepository} target="_blank">{profile.Email}</a></dt>
                    </div>
                </dl>
                <dl className="mt-3">
                    <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">bio</dt>
                    <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400 text-justify">{profile.ShortBio}
                    </dd>
                </dl>
                <div className="flex">
                    <a href={profile.Hackerrank} type="button" className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 mr-2 mb-2">
                        <HackerRankLogo/>
                    </a>
                    <a href={profile.Github} type="button" className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2">
                        <svg className="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>
                        
                    </a>
                   <a href={profile.Leetcode} type="button" className="text-white bg-slate-300 hover:bg-slate-100 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2">
                        <svg fill="#000000" className="w-4 h-4 mr-2 -ml-1" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg"><title>LeetCode icon</title><path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.494 2.337-1.494 3.835 0 1.498.513 2.895 1.494 3.875l4.347 4.361c.981.979 2.337 1.452 3.834 1.452s2.853-.512 3.835-1.494l2.609-2.637c.514-.514.496-1.365-.039-1.9s-1.386-.553-1.899-.039zM20.811 13.01H10.666c-.702 0-1.27.604-1.27 1.346s.568 1.346 1.27 1.346h10.145c.701 0 1.27-.604 1.27-1.346s-.569-1.346-1.27-1.346z" /></svg>

                    </a>
                    <a href={profile.Codeforces} type="button" className="text-white bg-slate-300 hover:bg-slate-100 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2">
                        <CodeForcesIcon/>
                    </a>
                </div>
            </div>
        </section>

    )
}