import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import ComponentLoading from "../../components/loading/ComponentLoading";
const Profile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true)
        const getUser = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/user/${id}`, {
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
        <div className='flex flex-col gap-16'>
            <div className='flex flex-row gap-8 justify-center'>
                <div className='w-56 h-56'>
                    <img src={user?.profileImage} alt="profile" className='rounded-lg w-full h-full' />
                </div>
                <div className='flex flex-col text-2xl text-slate-700 gap-4'>
                    <div>User name: {user?.name}</div>
                    <div>Email: {user?.email}</div>
                    <div>Mobile Number: {user?.mobile}</div>
                    <div>Address: {user?.address}</div>
                </div>


            </div>
            <Link to={`/profile/updateprofile/${id}`} className='flex justify-center'>
                <button className='bg-slate-400 border-slate-400 hover:border-slate-500 rounded-md p-2'>
                    Update Profile
                </button>
            </Link>
        </div>
    )
}

export default Profile