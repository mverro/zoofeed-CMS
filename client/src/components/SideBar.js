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
      icon: <FaChartPie />,
      label: 'Dashboard'
    },
    {
      link: 'animals',
      icon: <FaStickerMule />,
      label: 'Animal'
    },
    {
      link: 'foods',
      icon: <FaApple />,
      label: 'Food'
    },
    {
      link: 'classTypes',
      icon: <FaPaw />,
      label: 'Class'
    },
    {
      link: 'habitats',
      icon: <FaMountain />,
      label: 'Habitat'
    },
    {
      link: 'users',
      icon: <FaUser />,
      label: 'User'
    },
    {
      link: 'transactions',
      icon: <FaCcVisa />,
      label: 'Transaction'
    },
    {
      link: 'tickets',
      icon: <FaTicketAlt />,
      label: 'Ticket'
    },
    {
      link: 'userTickets',
      icon: <FaTicketAlt />,
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
              items.map((item) => {
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
