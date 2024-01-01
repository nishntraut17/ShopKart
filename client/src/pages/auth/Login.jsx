import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../redux/reducers/authSlice";
import { jwtDecode } from "jwt-decode";
import OnlyLogoTransparent from '../../assets/OnlyLogoTransparent.png';
import ComponentLoading from '../../components/ComponentLoading';
import axios from 'axios';

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formDetails, setFormDetails] = useState({
        email: '',
        password: '',
    });

    const inputChange = (e) => {
        const { name, value } = e.target;
        return setFormDetails({
            ...formDetails, [name]: value,
        });
    }

    const formSubmit = async (e) => {
        try {
            setLoading(true);
            e.preventDefault();
            const { email, password } = formDetails;
            if (!email || !password) {
                return toast.error("Input field should not be empty");
            } else if (password.length < 5) {
                return toast.error("Password must be at least 5 characters long");
            }

            const { data } = await toast.promise(
                axios.post("https://shopkart-backend-ko76.onrender.com/api/user/login", {
                    email, password
                }),
                {
                    success: "SignUp successfully",
                    error: "Unable to Register",
                    loading: "Signing up user...",
                }
            )

            localStorage.setItem("token", data.token);
            dispatch(setUserInfo(jwtDecode(data.token)));
            console.log(jwtDecode(data.token));
            setLoading(false);
            return navigate("/");
        }
        catch (error) {
            setLoading(false);
            return error;
        }
    }

    if (loading) {
        <ComponentLoading />
    }

    return (
        <>

            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src={OnlyLogoTransparent}
                        alt="logo"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Login to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={formSubmit}>
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
                                Login
                            </button>
                        </div>
                    </form>
                    <p>
                        Not a user?{" "}
                        <NavLink
                            className="login-link"
                            to={"/auth/signup"}
                        >
                            Register
                        </NavLink>
                    </p>
                </div>
            </div>
        </>
    )
}
