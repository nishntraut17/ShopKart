import React, { useState } from 'react';
import { selectCurrentUser, setUserInfo } from '../../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const user = useSelector(selectCurrentUser);
    const [file, setFile] = useState("");
    const [info, setInfo] = useState({
        name: user.name,
        email: user.email,
        password: ""
    });
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

            const { name, email, password } = info;
            if (!email || !password || !name) {
                return toast.error("Input field should not be empty");
            } else if (password.length < 5) {
                return toast.error("Password must be at least 5 characters long");
            }

            await toast.promise(

                axios.put("http://localhost:5000/api/user", {
                    name, email, password, profileImage: file
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
            dispatch(setUserInfo({ name: info.name, email: info.email, profileImage: file, userId: user.userId }))
            return navigate("/profile");
        } catch (error) {
            console.log('Error', error);
        }
    }

    const handleChange = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <h1>Update Profile</h1>
            <form onSubmit={formSubmit}>
                <label>Name</label>
                <input type='text' name="name" value={info.name} onChange={handleChange} />
                <label>Email</label>
                <input type='email' name="email" value={info.email} onChange={handleChange} />
                <label>Password</label>
                <input type='password' name="password" value={info.password} onChange={handleChange} />

                <label className="block text-sm font-medium leading-6 text-gray-900">
                    Profile Pic
                </label>
                <input
                    type="file"
                    onChange={(e) => onUpload(e.target.files[0])}
                    name="profile-pic"
                    id="profile-pic"

                />
                <button type='submit'>Update</button>
            </form>
        </div>
    )
}

export default UpdateProfile