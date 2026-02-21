import React, { useState } from "react";
import { NavLink } from "react-router";
import { FaMoneyBill } from "react-icons/fa";
import {
  FiCreditCard,
  FiHome,
  FiLogOut,
  FiSettings,
  FiUser,
} from "react-icons/fi";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

export const sidebarData = [
  {
    id: 0,
    path: "/",
    title: "Dashboard",
    icon: <FiHome />,
  },
  {
    id: 1,
    path: "/user/subscriptions",
    title: "Subsciptions",
    icon: <FiCreditCard />,
  },
  {
    id: 2,
    path: "/user/finance",
    title: "Payments",
    icon: <FaMoneyBill />,
  },
  {
    id: 3,
    path: "/user/profile",
    title: "Account",
    icon: <FiUser />,
  },
  {
    id: 4,
    path: "/user/settings",
    title: "Settings",
    icon: <FiSettings />,
  },
];

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  return (
    <aside
      className="h-full p-3 py-4 flex flex-col bg-white transition duration-300 ease-in-out"
      style={{
        width: sidebarOpen ? 300 + "px" : 80 + "px",
      }}
    >
      <div className="w-full p-2 px-3 flex">
        <a href="/" className="inter-font-normal logo flex-1">
          {sidebarOpen && "Managel"}
        </a>
        {sidebarOpen ? (
          <span
            className="bg-base rounded-lg p-2 flex items-center justify-center cursor-pointer"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <AiOutlineArrowLeft />
          </span>
        ) : (
          <span
            className="bg-base rounded-lg p-2 flex items-center justify-center cursor-pointer"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <AiOutlineArrowRight />
          </span>
        )}
      </div>
      <nav className="h-full p-2 flex flex-col gap-4">
        {sidebarData.map((data: any) => (
          <NavLink
            to={data.path}
            className="flex gap-2 items-center p-2 rounded-lg inter-font-normal text-small text-dark"
            style={({ isActive }) => ({
              color: isActive ? "#1e49c8" : "#a8a8a8",
              justifyContent: !sidebarOpen && "center",
              backgroundColor: isActive ? "#1e48c828" : "",
            })}
          >
            {data.icon}
            {sidebarOpen && data.title}
          </NavLink>
        ))}
      </nav>
      <button className="flex gap-1 items-center justify-center px-3 py-2 text-error font-bold text-small cursor-pointer hover:bg-red-100 rounded-lg transition duration-400">
        {sidebarOpen ? (
          <>
            <FiLogOut /> Logout
          </>
        ) : (
          <FiLogOut />
        )}
      </button>
    </aside>
  );
};

export default Sidebar;
