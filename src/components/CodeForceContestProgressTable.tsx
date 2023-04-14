import { ContestHistory } from "@/app/api/tests/route";
import { Suspense } from "react";
async function getData(username: string) {
    try {
        const data = await fetch(`https://a2svg46stat.vercel.app/api/tests?username=${username}`,
            {
                cache: 'no-store',
            }
        );
        let data2 = await data.json();

        return data2 as ContestHistory[];
    } catch (error) {
        
    }
   
}
export default async function CodeForceContestProgressTable({username}: {username: string}) {
    const data = await getData(username);
    console.log(data);
    return (
        <div className="overflow-x-auto">
            <h1 className="text-xl font-bold py-2 px-4">CodeForces Contest Progress</h1>
            <table className="table table-compact w-full table-zebra">
                <thead>
                    <tr className="text-sm">
                        <th></th>
                        <th>Name</th>
                        <th>Global</th>
                        <th>Local</th>
                        <th>Solved</th>
                        <th>Penality</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((contest, i) => (
                        <tr key={i} className="text-sm">
                            <td>{i + 1}</td>
                            <td className="font-bold first-letter:uppercase text-left">{contest.contestName.replace('Afternoon',"").replace("Morning", "").replace("Weekly", "")}</td>
                            <td>{contest.globalRank}</td>
                            <td>{contest.localRank > 0 ? contest.localRank : <p className="text-red-600 font-semibold">Absent | No data available</p>}</td>
                            <td>{contest.solved}</td>
                            <td>{contest.penalty}</td>
                       </tr>
                   ))}
                </tbody>
            </table>
            </div>
    )
}