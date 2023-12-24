import React from 'react';
import { Link } from 'react-router-dom';
import SuccessImg from "../../static/success.gif"

const Success = () => {
    return (
        <div className='flex flex-col gap-10 items-center'>
            <p className='text-slate-400 text-xl font-semibold hover:cursor-pointer'>Order successfully Placed</p>
            <img src={SuccessImg} alt="success-img" className='w-auto h-60' />
            <Link to={`/orders`} className='bg-gray-400 text-white p-2 rounded-lg'>View All Orders</Link>
        </div>
    )
}

export default Success