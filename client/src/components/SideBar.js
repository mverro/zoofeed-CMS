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
      icon: <FaChartPie color='white' />,
      label: 'Dashboard'
    },
    {
      link: 'animals',
      icon: <FaStickerMule color='white' />,
      label: 'Animal'
    },
    {
      link: 'foods',
      icon: <FaApple color='white' />,
      label: 'Food'
    },
    {
      link: 'classTypes',
      icon: <FaPaw color='white' />,
      label: 'Class'
    },
    {
      link: 'habitats',
      icon: <FaMountain color='white' />,
      label: 'Habitat'
    },
    {
      link: 'users',
      icon: <FaUser color='white' />,
      label: 'User'
    },
    {
      link: 'transactions',
      icon: <FaCcVisa color='white' />,
      label: 'Transaction'
    },
    {
      link: 'tickets',
      icon: <FaTicketAlt color='white' />,
      label: 'Ticket'
    },
    {
      link: 'userTickets',
      icon: <FaTicketAlt color='white' />,
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
        <div className="h-full px-3 py-4 overflow-y-auto bg-[#019267] dark:bg-gray-800">
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
