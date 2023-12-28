import React, { useState } from "react";
import Avatar from "../Avatar/Avatar";
import { Link, NavLink } from "react-router-dom";
import { FiLogIn, FiMenu } from "react-icons/fi";
import CartBox from "./CartBox";
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from "../../features/auth/authSlice";
import { setOpen, itemCount } from "../../features/cart/cartSlice";
import { ShoppingCart } from "@mui/icons-material";

import Menu from "./Menu";
import LogoWithNameTransparent from "../../static/LogoWithNameTransparent.png";

const Header = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const user = useSelector(selectCurrentUser);
    const cnt = useSelector(itemCount);

    return (
        <header className="shadow-sm sticky top-0 backdrop-blur-sm bg-[#fffefc80] z-20">
            <div className="box flex justify-between items-center py-3">
                {/* <Logo /> */}
                <NavLink to='/'>
                    <img src={LogoWithNameTransparent} alt="logo" className="h-14 w-22" />
                </NavLink>
                {/* Desktop navbar */}
                <nav className="hidden md:block">
                    {/* Navbar links */}
                    <ul className="flex gap-10">
                        <li>
                            <NavLink
                                to={"/"}
                                className="relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center font-semibold text-gray-600"
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={"/product"}
                                className="relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center font-semibold text-gray-600"
                            >
                                All Products
                            </NavLink>
                        </li>
                        {token && (
                            <li>
                                <NavLink
                                    to={"/orders"}
                                    className="relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center font-semibold text-gray-600"
                                >
                                    Orders
                                </NavLink>
                            </li>
                        )}
                        {token && user.role === 'consumer' && (
                            <li>
                                <NavLink
                                    to={"/seller"}
                                    className="relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center font-semibold text-gray-600"
                                >
                                    Become a seller
                                </NavLink>
                            </li>
                        )}
                        {token && user.role === 'admin' && (
                            <li>
                                <NavLink
                                    to={"/admin/allusers"}
                                    className="relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center font-semibold text-gray-600"
                                >
                                    Admin Dashboard
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </nav>
                <CartBox />
                {/* Sign in button */}
                {token && token !== "" ? (
                    <div className="relative">
                        <p className="absolute left-5 text-slate-400 hover:cursor-pointer">{cnt}</p>
                        <div className="flex flex-row gap-2 items-center">
                            < ShoppingCart onClick={() => dispatch(setOpen(true))} className="hover:cursor-pointer" />
                            <Avatar />
                        </div>
                    </div>
                ) : (
                    <Link
                        to={"/auth/login"}
                        className="hidden md:block"
                    >
                        {/* <Button
                            content={"Sign In"}
                            customCss={"max-w-max rounded-full"}
                            icon={<FiLogIn />}
                        /> */}
                        <div className="flex flex-row items-center justify-center gap-1 hover:scale-105">

                            <button>Login</button>
                            <FiLogIn />
                        </div>
                    </Link>
                )}
                {/* Menu button */}

                <FiMenu
                    className="block md:hidden text-xl cursor-pointer"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                />

                {/* Mobile navbar */}
                <Menu
                    setIsCollapsed={setIsCollapsed}
                    isCollapsed={isCollapsed}
                />
            </div>
        </header>
    );
};

export default Header;
