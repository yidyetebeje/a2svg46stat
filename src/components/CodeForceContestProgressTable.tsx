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
            <table className="table table-compact w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Global</th>
                        <th>Local</th>
                        <th>Solved in Contest</th>
                        <th>Penality</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((contest, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{contest.contestName.replace('Afternoon',"").replace("Morning", "").replace("Weekly", "")}</td>
                            <td>{contest.globalRank}</td>
                            <td>{contest.localRank > 0 ? contest.localRank : <p className="text-red-600 font-semibold">"Absent"</p>}</td>
                            <td>{contest.solved}</td>
                            <td>{contest.penalty}</td>
                       </tr>
                   ))}
                </tbody>
            </table>
            </div>
    )
}