import Link from "next/dist/client/link";

export function NavBar() {
    return (
        <div className="navbar bg-base-100 justify-center w-full">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">a2sv stats</a>
            </div>
            <div className="m-auto">
                <ul className="menu menu-horizontal px-1">
                    <li><a>Home</a></li>
                    <li>
                        <a>Stats</a>
                    </li>
                    <li><a>Resources</a></li>
                    <li><a>Contests</a></li>
                </ul>
            </div>
        </div>
    );
}