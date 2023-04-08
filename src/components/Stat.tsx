import { leetcoderes } from "@/interfaces/leetcoderes";

export function Stat({ avg }: { avg: leetcoderes }) {
    return (
        <div className="flex flex-col w-2/3 gap-4">
            <div className="stats stats-vertical lg:stats-horizontal shadow">

                <div className="stat">
                    <div className="stat-title">AVG easy</div>
                    <div className="stat-value">{avg.easy?.toFixed(1)}</div>
                    <div className="stat-desc">leetcode problems solved</div>
                </div>

                <div className="stat">
                    <div className="stat-title">AVG Medium</div>
                    <div className="stat-value">{avg.medium?.toFixed(1)}</div>
                    <div className="stat-desc">solved</div>
                </div>

                <div className="stat">
                    <div className="stat-title">AVG Hard</div>
                    <div className="stat-value">{avg.hard?.toFixed(1)}</div>
                    <div className="stat-desc">solved by group 46</div>
                </div>
                <div className="stat">
                    <div className="stat-title">AVG Total</div>
                    <div className="stat-value">{avg.total?.toFixed(1)}</div>
                    <div className="stat-desc">solved by group 46</div>
                </div>
            </div>
            <div className="stats stats-vertical lg:stats-horizontal shadow">

                <div className="stat">
                    <div className="stat-title">AVG streaks</div>
                    <div className="stat-value">{avg.currentStreak?.toFixed(1)}</div>
                    <div className="stat-desc">in leetcode</div>
                </div>

                <div className="stat">
                    <div className="stat-title">AVG active days</div>
                    <div className="stat-value">{avg.totalActiveDays?.toFixed(1)}</div>
                    <div className="stat-desc">in leetcode</div>
                </div>
            </div>
        </div>
    )
}