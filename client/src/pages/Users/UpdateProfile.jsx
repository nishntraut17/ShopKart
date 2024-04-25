/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import ComponentLoading from "../../components/ComponentLoading";
import { Image } from '@mui/icons-material';
import { setUserInfo, selectCurrentUser } from '../../redux/reducers/authSlice';

const UpdateProfile = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [file, setFile] = useState("");
    const [info, setInfo] = useState({});
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        setLoading(true)
        const getUser = async () => {
            try {
                const { data } = await axios.get(`${backendUrl}/user/${id}`, {
                    headers: {
                        'authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setInfo({
                    name: data.name,
                    email: data.email,
                    mobile: data.mobile,
                    address: data.address,
                    password: "",
                });
                setFile(data.profileImage);

            } catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        }
        getUser();
    }, [id, setInfo, backendUrl]);

    const onUpload = async (element) => {
        setLoading(true);

        if (element.type === "image/jpeg" || element.type === "image/png") {
            const data = new FormData();
            data.append("file", element);
            data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
            data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
            fetch(process.env.REACT_APP_CLOUDINARY_BASE_URL, {
                method: "POST",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => setFile(data.url.toString()));
            setLoading(false);
        } else {
            setLoading(false);
        }
    };
    const formSubmit = async (e) => {
        try {
            e.preventDefault();
            if (loading) return;
            if (file === "") return;

            const { name, email, password, address, mobile } = info;
            if (!email || !password || !name) {
                return toast.error("Input field should not be empty");
            } else if (password.length < 5) {
                return toast.error("Password must be at least 5 characters long");
            }

            await toast.promise(

                axios.put(`${backendUrl}/user/${id}`, {
                    name, email, password, address, mobile, profileImage: file
                }, {
                    headers: {
                        'authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }),
                {
                    success: "Updated Successfully",
                    error: "Unable to Update",
                    loading: "updating user details...",
                }
            );
            dispatch(setUserInfo({ userId: id, name: info.name, email: info.email, profileImage: file, role: user.role }));
            return navigate(`/profile/${id}`);
        } catch (error) {
            console.log('Error', error);
        }
    }

    const handleChange = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value })
    }

    if (loading) {
        return <ComponentLoading />
    }

    return (
        <div className='text-gray-700'>
            <h1 className='text-3xl font-bold mb-6 text-center'>Update Profile</h1>
            <form onSubmit={formSubmit} className='flex flex-col px-4 lg:px-56 gap-4'>
                <div className='flex mb-4 flex-row gap-2'>
                    <label htmlFor="name" className='text-lg font-medium mb-2'>Name</label>
                    <input type='text' id="name" name="name" value={info.name} onChange={handleChange} className='w-96 border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300' />
                </div>
                <div className='flex mb-4 flex-row gap-2'>
                    <label htmlFor="email" className='text-lg font-medium mb-2'>Email</label>
                    <input type='email' id="email" name="email" value={info.email} onChange={handleChange} className='w-96 border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300' />
                </div>
                <div className='flex mb-4 flex-row gap-2'>
                    <label htmlFor="mobile" className='text-lg font-medium mb-2'>Mobile</label>
                    <input type='number' id="mobile" name="mobile" value={info.mobile} onChange={handleChange} className='w-96 border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300' />
                </div>
                <div className='flex mb-4 flex-row gap-2'>
                    <label htmlFor="address" className='text-lg font-medium mb-2'>Address</label>
                    <input type='text' id="address" name="address" value={info.address} onChange={handleChange} className='w-96 border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300' />
                </div>
                <div className='flex mb-4 flex-row gap-2'>
                    <label htmlFor="password" className='text-lg font-medium mb-2'>Password</label>
                    <input type='password' id="password" name="password" value={info.password} onChange={handleChange} className='w-96 border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300' />
                </div>
                <div className='mb-4'>
                    <label htmlFor="profile-pic" className='block text-lg font-medium mb-2 hover:cursor-pointer' for='profile-pic'>Upload Image: <Image /></label>
                    <input type="file" onChange={(e) => onUpload(e.target.files[0])} name="profile-pic" id="profile-pic" className='hidden' />
                    <img src={file} alt="profile" className='h-40 w-40 mt-4 rounded-md' />
                </div>
                <button type='submit' className='text-white font-bold bg-blue-500 w-32 border-blue-500 rounded-md my-6 py-2 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300'>
                    Update
                </button>
            </form>
        </div>
    );

}

export default UpdateProfile