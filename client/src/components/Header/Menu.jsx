/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { FiLogIn, FiMenu } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { setUserInfo } from "../../features/auth/authSlice";
import { setOpen } from "../../features/cart/cartSlice";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from "../../features/auth/authSlice";

const Menu = ({ isCollapsed, setIsCollapsed }) => {
    const dispatch = useDispatch()
    const token = localStorage.getItem("token");
    const user = useSelector(selectCurrentUser);
    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(setUserInfo({}));
        setIsCollapsed(!isCollapsed)
    }

    const handleCart = () => {
        dispatch(setOpen(true));
        setIsCollapsed(!isCollapsed)
    }
    return (
        <>
            {!isCollapsed && (
                <motion.aside
                    initial={{ width: 0 }}
                    animate={{ width: 300 }}
                    exit={{ width: 0, transition: { delay: 0.7, duration: 0.3 } }}
                    className="block md:hidden h-screen fixed top-0 right-0 backdrop-blur-sm bg-[#fffefbde] z-30 p-6"
                >
                    {/* Menu button */}
                    <FiMenu
                        className="block md:hidden text-xl cursor-pointer"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    />
                    {/* Navbar links */}
                    <ul className="flex flex-col gap-10 items-center mt-8">
                        <li>
                            <NavLink
                                to={"/"}
                                onClick={() => setIsCollapsed(!isCollapsed)}
                                className="relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center font-semibold text-gray-600"
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={"/product"}
                                onClick={() => setIsCollapsed(!isCollapsed)}
                                className="relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center font-semibold text-gray-600"
                            >
                                All Products
                            </NavLink>
                        </li>
                        {token && (
                            <li>
                                <NavLink
                                    to={"/orders"}
                                    onClick={() => setIsCollapsed(!isCollapsed)}
                                    className="relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center font-semibold text-gray-600"
                                >
                                    Orders
                                </NavLink>
                            </li>
                        )}

                        {
                            token && user.role === 'consumer' && (
                                <li>
                                    <NavLink
                                        to={"/seller"}
                                        onClick={() => setIsCollapsed(!isCollapsed)}
                                        className="relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center font-semibold text-gray-600"
                                    >
                                        Become a seller
                                    </NavLink>
                                </li>
                            )
                        }
                        {
                            token && user.role === 'admin' && (
                                <li>
                                    <NavLink
                                        to={"/admin/allusers"}
                                        onClick={() => setIsCollapsed(!isCollapsed)}
                                        className="relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center font-semibold text-gray-600"
                                    >
                                        Admin Dashboard
                                    </NavLink>
                                </li>
                            )
                        }
                        <li className="w-full">
                            {!token && <Link
                                to={"/auth/login"}
                                onClick={handleLogout}
                                className="flex justify-center items-center"
                            >
                                <p>Login</p>
                            </Link>}
                        </li>
                    </ul>
                </motion.aside>
            )}
        </>
    );
};

export default Menu;
