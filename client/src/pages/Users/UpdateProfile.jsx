/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import ComponentLoading from "../../components/loading/ComponentLoading";

const UpdateProfile = () => {
    const { id } = useParams();
    // const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [file, setFile] = useState("");
    const [info, setInfo] = useState({});

    useEffect(() => {
        setLoading(true)
        const getUser = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/user/${id}`, {
                    headers: {
                        'authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setInfo(data);
                setFile(data.profileImage);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        }
        getUser();
    }, [id, setInfo]);

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

                axios.put(`http://localhost:5000/api/user/${id}`, {
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
            <h1 className='text-2xl text-bold flex justify-center'>Update Profile</h1>
            <form onSubmit={formSubmit} className='flex flex-col justify-center px-4 lg:px-56'>
                <label>Name</label>
                <input type='text' name="name" value={info.name} onChange={handleChange} className='w-96' />
                <label>Email</label>
                <input type='email' name="email" value={info.email} onChange={handleChange} className='w-96' />
                <label>Mobile</label>
                <input type='number' name="mobile" value={info.mobile} onChange={handleChange} className='w-96' />
                <label>Address</label>
                <input type='text' name="address" value={info.address} onChange={handleChange} className='w-96' />

                <label>Password</label>
                <input type='password' name="password" value={info.password} onChange={handleChange} className='w-96' />

                <label className="block text-sm font-medium leading-6 text-gray-700">
                    Profile Picture
                </label>
                <input
                    type="file"
                    onChange={(e) => onUpload(e.target.files[0])}
                    name="profile-pic"
                    id="profile-pic"
                />
                <img src={file} alt="profile" className='h-40 w-40' />
                <button type='submit' className='text-bold bg-gray-200 w-32 border-gray-400 rounded my-10 p-2 hover:bg-gray-300'>Update</button>
            </form>
        </div>
    )
}

export default UpdateProfile