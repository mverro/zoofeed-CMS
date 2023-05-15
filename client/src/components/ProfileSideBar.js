import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    FaStickerMule,
    FaApple,
    FaMountain,
    FaPaw,
    FaUser,
    FaChartPie,
    FaTicketAlt,
    FaCcVisa,
} from "react-icons/fa";

const ProfileSideBar = () => {
    return (
        <>
            <aside
                id="default-sidebar"
                className="fixed top-[64px] left-0 z-10 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-100 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link to='/profile'
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                                <FaUser />
                                <span className="ml-3">User Info</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile/animals-care"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                                <FaStickerMule />
                                <span className="flex-1 ml-3 whitespace-nowrap">Animals</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    )
}

export default ProfileSideBar