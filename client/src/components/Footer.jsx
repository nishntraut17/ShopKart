import React from "react";
import {
    AiFillGithub,
    AiFillLinkedin,
    AiFillTwitterCircle,
} from "react-icons/ai";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LogoWithNameTransparent from "../assets/LogoWithNameTransparent.png";

const Footer = () => {
    return (
        <footer className="border-b-4 border-primary bg-yellow-50 pt-12 mt-24">
            {/* Footer top */}
            <div className="box flex flex-col md:flex-row  justify-between border-b-2 border-yellow-100 pb-10 gap-8">
                {/* Footer top left */}
                <div className="basis-1/2 flex flex-col gap-6 items-center md:items-start text-center md:text-start">
                    <img src={LogoWithNameTransparent} alt="logo" className="h-12 w-auto" />
                    <p>
                        Empower Your Lifestyle with Cutting-Edge Technology! Explore a world of possibilities with our curated collection of Mobiles, Laptops, Desktops, Tablets, Headphones, and Smart Watches. Elevate your everyday with innovation at your fingertips. Shop now and redefine your digital experience with Shopkart.
                    </p>
                </div>
                {/* Footer top right */}
                <div className="flex gap-10 basis-1/2 justify-center md:justify-end flex-wrap md:flex-nowrap">
                    {/* Footer links */}
                    <ul className="flex flex-col gap-2 font-semibold mx-8 items-center md:items-start">
                        <li className="text-gray-700 text-sm text-bold mb-2">Product</li>
                        <motion.li whileHover={{ x: 5 }}>
                            <Link>Mobile</Link>
                        </motion.li>
                        <motion.li whileHover={{ x: 5 }}>
                            <Link to='/blog'>Tablets</Link>
                        </motion.li>
                        <motion.li whileHover={{ x: 5 }}>
                            <Link to='recipe'>Headphones</Link>
                        </motion.li>
                        <motion.li whileHover={{ x: 5 }}>
                            <Link>Laptops</Link>
                        </motion.li>
                    </ul>
                    <ul className="flex flex-col gap-2 font-semibold mx-8 items-center md:items-start">
                        <li className="text-gray-700 text-sm text-bold mb-2">Company</li>
                        <motion.li whileHover={{ x: 5 }}>
                            <Link>About</Link>
                        </motion.li>
                        <motion.li whileHover={{ x: 5 }}>
                            <Link>Careers</Link>
                        </motion.li>
                        <motion.li whileHover={{ x: 5 }}>
                            <Link>News</Link>
                        </motion.li>
                        <motion.li whileHover={{ x: 5 }}>
                            <Link>Newsletter</Link>
                        </motion.li>
                    </ul>
                    <ul className="flex flex-col gap-2 font-semibold mx-8 items-center md:items-start">
                        <li className="text-gray-700 text-sm text-bold mb-2">Legal</li>
                        <motion.li whileHover={{ x: 5 }}>
                            <Link>Terms</Link>
                        </motion.li>
                        <motion.li whileHover={{ x: 5 }}>
                            <Link>Privacy</Link>
                        </motion.li>
                        <motion.li whileHover={{ x: 5 }}>
                            <Link>Licenses</Link>
                        </motion.li>
                        <motion.li whileHover={{ x: 5 }}>
                            <Link>Cookies</Link>
                        </motion.li>
                    </ul>
                </div>
            </div>
            {/* Footer bottom */}
            <div className="box flex justify-center sm:justify-between flex-col sm:flex-row w-full gap-4">
                <p className="text-sm text-center">
                    &copy; {new Date().getFullYear()} Shopkart. All rights reserved
                </p>
                {/* Footer social links */}
                <ul className="flex justify-center gap-6 text-xl">
                    <motion.li
                        className="border border-primary p-1 rounded-full hover:text-gray-500"
                        whileHover={{ y: -4 }}
                    >
                        <a
                            href="https://github.com/nishntraut17/Shopkart"
                            aria-label="Follow me on github"
                        >
                            <AiFillGithub />
                        </a>
                    </motion.li>
                    <motion.li
                        className="border border-primary p-1 rounded-full hover:text-blue-400"
                        whileHover={{ y: -4 }}
                    >
                        <a
                            href="https://twitter.com/_raut_nishant"
                            aria-label="Follow me on twitter"
                        >
                            <AiFillTwitterCircle />
                        </a>
                    </motion.li>
                    <motion.li
                        className="border border-primary p-1 rounded-full hover:text-blue-600"
                        whileHover={{ y: -4 }}
                    >
                        <a
                            href="https://www.linkedin.com/in/nishntraut17/"
                            aria-label="Follow me on linkedin"
                        >
                            <AiFillLinkedin />
                        </a>
                    </motion.li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
