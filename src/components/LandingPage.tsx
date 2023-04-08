import a2sv from '../../public/images/a2sv.jpg';
import Image from 'next/image'
import { Stat } from './Stat';
export function LandingPage({children}: {children: React.ReactNode}) {
    return (
        <div className="hero bg-base-200 w-full">
            <div className="hero-content flex-col lg:flex-row">
                <Image src={a2sv} className="max-w-sm rounded-lg shadow-2xl" alt ='/'/>
                <div className='flex flex-col justify-start align-middle'>
                    <h1 className="text-5xl font-bold">Group 46 a2sv</h1>
                    {children}
                </div>
            </div>
        </div>
    );
}