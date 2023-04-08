import a2sv from '../../public/images/a2sv.jpg';
import Image from 'next/image'
import { Stat } from './Stat';
export function LandingPage() {
    return (
        <div className="hero bg-base-200 w-full">
            <div className="hero-content flex-col lg:flex-row">
                <Image src={a2sv} className="max-w-sm rounded-lg shadow-2xl" alt ='/'/>
                <div>
                    <h1 className="text-5xl font-bold">Box Office News!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <Stat></Stat>
                </div>
            </div>
        </div>
    );
}