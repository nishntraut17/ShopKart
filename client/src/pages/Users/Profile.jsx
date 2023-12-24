import React from 'react'
import { useSelector } from 'react-redux';
import { selectCurrentUser } from "../../features/auth/authSlice";
import { Link } from 'react-router-dom';

const Profile = () => {
    const user = useSelector(selectCurrentUser);
    console.log(user);
    return (
        <div className='flex flex-col gap-16'>
            <div className='flex flex-row gap-8 justify-center'>
                <div className='flex flex-col'>
                    <div>User name: {user.name}</div>
                    <div>Email: {user.email}</div>
                </div>
                <div className='w-20 h-20'>
                    <img src={user.profileImage} alt="profile" />
                </div>
            </div>
            <Link to="/profile/updateprofile" className='flex justify-center'>
                <button className='bg-slate-400 border-slate-400 hover:border-slate-500 rounded-md p-2'>
                    Update Profile
                </button>
            </Link>
        </div>
    )
}

export default Profile