
import Link from "next/link";

export function NavBar() {
    return (
        <div className="navbar bg-base-100 justify-center w-full">
            <div className="flex-1">
                <Link href='/'
                    className="btn btn-ghost normal-case text-xl">a2sv stats</Link>
            </div>
        </div>
    );
}