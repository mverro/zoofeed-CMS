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

const SideBar = () => {
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
              <Link to="/"
                className="flex gap-2 items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <FaChartPie />
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="animals"
                className="flex gap-2 items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 focus:ring-4 focus:ring-green-300"
              >
                <FaStickerMule />
                <span className="flex-1 ml-3 whitespace-nowrap">Animal</span>
              </Link>
            </li>
            <li>
              <Link to={"foods"}
                className="flex gap-2 items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <FaApple />
                <span className="flex-1 ml-3 whitespace-nowrap">Food</span>
              </Link>
            </li>
            <li>
              <Link to={"/classType"}
                className="flex gap-2 items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <FaPaw />
                <span className="flex-1 ml-3 whitespace-nowrap">Class</span>
              </Link>
            </li>
            <li>
              <Link
                to={'habitat'}
                className="flex gap-2 items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <FaMountain />
                <span className="flex-1 ml-3 whitespace-nowrap">Habitat</span>
              </Link>
            </li>
            <li>
              <Link
                to={'users'}
                className="flex gap-2 items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <FaUser />
                <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
              </Link>
            </li>
            <li>
              <Link to={"/transaction"}
                className="flex gap-2 items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <FaCcVisa />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Transaction
                </span>
              </Link>
            </li>
            <li>
              <Link to={"/ticket"}
                className="flex gap-2 items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <FaTicketAlt />
                <span className="flex-1 ml-3 whitespace-nowrap">Ticket</span>
              </Link>
            </li>
            <li>
              <Link to={"/userTicket"}
                className="flex gap-2 items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <FaTicketAlt />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  User Ticket
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
