import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import ComponentLoading from "../../components/ComponentLoading";
const Profile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true)
        const getUser = async () => {
            try {
                const { data } = await axios.get(`https://shopkart-backend-ko76.onrender.com/api/user/${id}`, {
                    headers: {
                        'authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                })
                console.log(data);
                setUser(data);
            } catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        }
        getUser();
    }, [id]);

    if (loading) {
        return <ComponentLoading />
    }
    return (
        <div className='flex flex-col gap-16 items-center'>
            <div className='flex flex-col md:flex-row gap-8 items-center justify-center'>

                <div className='flex flex-col text-2xl text-slate-700 gap-4'>
                    <div className='font-bold'>User name:</div>
                    <div>{user?.name}</div>
                    <div className='font-bold'>Email:</div>
                    <div>{user?.email}</div>
                    <div className='font-bold'>Mobile Number:</div>
                    <div>{user?.mobile}</div>
                    <div className='font-bold'>Address:</div>
                    <div>{user?.address}</div>
                </div>
                <div className='w-56 h-56'>
                    <img src={user?.profileImage} alt="profile" className='rounded-lg w-full h-full object-cover' />
                </div>
            </div>
            <Link to={`/profile/updateprofile/${id}`} className='flex justify-center'>
                <button className='bg-slate-400 border-slate-300 hover:border-slate-500 hover:border-2 rounded-md p-2'>
                    Update Profile
                </button>
            </Link>
        </div>
    );

}

export default Profile