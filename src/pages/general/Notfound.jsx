import img from '../../assets/images/404.svg'
import { Link } from 'react-router-dom'

export default function Notfound() {
    return (
        <div className='w-11/12 mx-auto'>
            <div className='flex items-center justify-center h-screen gap-3 flex-col'>
                <div className="w-full h-[60dvh] relative">
                    <img src={img} className="w-full h-[60dvh]" />
                </div>
                <div className='font-extrabold text-4xl lg:text-5xl text-primary text-center'>Page not found!</div>
                <div className='text-zinc-500 text-lg text-center'>Oops! Looks like you followed a bad link. If you think this is a problem with us, please tell us.</div>
                <div className='mt-4 text-white bg-[#336C8A] py-3 px-8 rounded-lg cursor-pointer'>
                    <Link to="/">Go back Home</Link>
                </div>
            </div>
        </div>
    )
}
