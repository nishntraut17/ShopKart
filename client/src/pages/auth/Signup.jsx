import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function Signup() {
    const navigate = useNavigate();
    const [file, setFile] = useState("");
    const [loading, setLoading] = useState(false);

    const [formDetails, setFormDetails] = useState({
        name: "",
        email: "",
        password: "",
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

    const inputChange = (e) => {
        const { name, value } = e.target;
        return setFormDetails({
            ...formDetails,
            [name]: value
        });
    };
    const formSubmit = async (e) => {
        try {
            e.preventDefault();
            if (loading) return;
            if (file === "") return;

            const { name, email, password } = formDetails;
            if (!email || !password || !name) {
                return toast.error("Input field should not be empty");
            } else if (password.length < 5) {
                return toast.error("Password must be at least 5 characters long");
            }

            await toast.promise(
                axios.post("http://localhost:5000/api/user/register", {
                    name, email, password, profileImage: file
                }),
                {
                    pending: "Logging in...",
                    success: "Login successfully",
                    error: "Unable to login user",
                    loading: "Logging user...",
                }
            );
            return navigate("/login");
        } catch (error) {
            console.log('Error', error);
        }
    }

    return (
        <>

            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign up to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={formSubmit}>
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Profile Pic
                            </label>
                            <input
                                type="file"
                                onChange={(e) => onUpload(e.target.files[0])}
                                name="profile-pic"
                                id="profile-pic"

                            />
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Full Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={formDetails.name}
                                    onChange={inputChange}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={formDetails.email}
                                    onChange={inputChange}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={formDetails.password}
                                    onChange={inputChange}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>
                    <p>
                        Already a user?{" "}
                        <NavLink
                            className="login-link"
                            to={"/login"}
                        >
                            Login
                        </NavLink>
                    </p>
                </div>
            </div>
        </>
    )
}
