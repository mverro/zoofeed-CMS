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
            <Link to="/">
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <FaChartPie />
                  <span className="ml-3">Dashboard</span>
                </a>
              </li>
            </Link>
            <Link to="/animals">
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <FaStickerMule />
                  <span className="flex-1 ml-3 whitespace-nowrap">Animal</span>
                </a>
              </li>
            </Link>
            <Link to={"/foods"}>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <FaApple />
                  <span className="flex-1 ml-3 whitespace-nowrap">Food</span>
                </a>
              </li>
            </Link>
            <Link to={"/classType"}>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <FaPaw />
                  <span className="flex-1 ml-3 whitespace-nowrap">Class</span>
                </a>
              </li>
            </Link>
            <li>
              <Link
                to={'habitat'}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <FaMountain />
                <span className="flex-1 ml-3 whitespace-nowrap">Habitat</span>
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <FaUser />
                <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
              </a>
            </li>
            <Link to={"/transaction"}>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <FaCcVisa />
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Transaction
                  </span>
                </a>
              </li>
            </Link>

            <Link to={"/ticket"}>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <FaTicketAlt />
                  <span className="flex-1 ml-3 whitespace-nowrap">Ticket</span>
                </a>
              </li>
            </Link>

            <Link to={"/userTicket"}>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <FaTicketAlt />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  User Ticket
                </span>
              </a>
            </li>
            </Link>
            

          </ul>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
