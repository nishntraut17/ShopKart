import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { BiHomeAlt2 } from "react-icons/bi";
import { HiOutlineUsers, HiOutlineLogout } from "react-icons/hi";
import { FaShopify } from "react-icons/fa";
import { HiDocumentReport } from "react-icons/hi";
import { useNavigate } from 'react-router-dom'

const SideBar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/');
  }

  return (
    <motion.aside className="basis-0 h-screen p-6 flex flex-col justify-between bg-[#f4f4f4] border-r-2 border-gray-200">
      <div className="flex flex-col gap-6">
        <NavLink to="/">
          <div
            className={`flex flex-row gap-1 items-center justify-center`}
          >
            <BiHomeAlt2 />
            {"Back to Home"}
          </div>
        </NavLink>
        <hr />
        {/* Navbar links */}
        <div className="flex flex-col gap-6 pl-2">
          <NavLink
            to={"/admin/allusers"}
            className={`rounded-lg hover:bg-gradient-to-r hover:from-primary hover:to-primaryLight p-2 flex gap-2 items-center text-gray-600 hover:text-light justify-center`}
          >
            <HiOutlineUsers />
            {"Users"}
          </NavLink>
          <NavLink
            to={"/admin/allproducts"}
            className={`rounded-lg hover:bg-gradient-to-r hover:from-primary hover:to-primaryLight p-2 flex gap-2 items-center text-gray-600 hover:text-light justify-center`}
          >
            <FaShopify />
            {"Products"}
          </NavLink>
          <NavLink
            to={"/admin/applications"}
            className={`rounded-lg hover:bg-gradient-to-r hover:from-primary hover:to-primaryLight p-2 flex gap-2 items-center text-gray-600 hover:text-light justify-center`}
          >
            <HiDocumentReport />
            {"Applications"}
          </NavLink>

        </div>
      </div>
      <hr />
      <div
        className={`mb-4 flex gap-2 items-center text-gray-600 rounded-lg hover:bg-gradient-to-r hover:from-primary hover:to-primaryLight hover:text-light p-2 cursor-pointer ml-2 justify-center`}
      >
        <HiOutlineLogout />
        <button onClick={handleLogout}>

          Log Out
        </button>
      </div>
    </motion.aside>
  );
};

export default SideBar;
