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
import SidebarMenu from "./SidebarMenu";

const SideBar = () => {
  const items = [
    {
      link: '/',
      icon: <FaChartPie className="fill-[#384b42] dark:fill-[#9bb0a5]" />,
      label: 'Dashboard'
    },
    {
      link: 'animals',
      icon: <FaStickerMule className="fill-[#384b42] dark:fill-[#9bb0a5]" />,
      label: 'Animal'
    },
    {
      link: 'foods',
      icon: <FaApple className="fill-[#384b42] dark:fill-[#9bb0a5]" />,
      label: 'Food'
    },
    {
      link: 'classTypes',
      icon: <FaPaw className="fill-[#384b42] dark:fill-[#9bb0a5]" />,
      label: 'Class'
    },
    {
      link: 'habitats',
      icon: <FaMountain className="fill-[#384b42] dark:fill-[#9bb0a5]" />,
      label: 'Habitat'
    },
    {
      link: 'users',
      icon: <FaUser className="fill-[#384b42] dark:fill-[#9bb0a5]" />,
      label: 'User'
    },
    {
      link: 'transactions',
      icon: <FaCcVisa className="fill-[#384b42] dark:fill-[#9bb0a5]" />,
      label: 'Transaction'
    },
    {
      link: 'tickets',
      icon: <FaTicketAlt className="fill-[#384b42] dark:fill-[#9bb0a5]" />,
      label: 'Ticket'
    },
    {
      link: 'userTickets',
      icon: <FaTicketAlt className="fill-[#384b42] dark:fill-[#9bb0a5]" />,
      label: 'User Ticket'
    },
  ]
  return (
    <>
      <aside
        id="default-sidebar"
        className="fixed top-[64px] left-0 z-10 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-slate-100 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {
              items.map((item, i) => {
                return (
                  <SidebarMenu
                    link={item.link}
                    icon={item.icon}
                    label={item.label}
                  />
                )
              })
            }
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
