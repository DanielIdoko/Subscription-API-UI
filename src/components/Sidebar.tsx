import React, { useState } from "react";
import { NavLink } from "react-router";
import { FaMoneyBill } from "react-icons/fa";
import {
  FiCreditCard,
  FiHome,
  FiLogOut,
  FiSettings,
  FiSidebar,
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
    <aside className={`sidebar ${sidebarOpen ? "w-75" : "w-20"}`}>
      <div className="w-full p-2 px-3 flex items-center">
        <a href="/" className="logo">
          {sidebarOpen && "Managel"}
        </a>
        {/* {sidebarOpen ? ( */}
        <span
          className="sidebar-icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FiSidebar />
        </span>
        {/* // ) : ( */}
        {/* //   <span */}
        {/* //     className="sidebar-icon" */}
        {/* //     onClick={() => setSidebarOpen(!sidebarOpen)} */}
        {/* //   > */}
        {/* //     <AiOutlineArrowRight /> */}
        {/* //   </span> */}
        {/* // )} */}
      </div>
      <nav className="h-full p-2 flex flex-col gap-4">
        {sidebarData.map((data: any) => (
          <NavLink
            key={data.id}
            to={data.path}
            className="flex gap-2 items-center p-2 rounded-full text-small text-dark"
            style={({ isActive }) => ({
              color: isActive ? "#121212" : "#a8a8a8",
              justifyContent: !sidebarOpen && "center",
              backgroundColor: isActive && "#7f7f7f28",
              fontWeight: isActive && "bold",
              borderWidth: isActive && 1,
              borderColor: isActive && "#17161628",
            })}
          >
            {data.icon}
            {sidebarOpen && data.title}
          </NavLink>
        ))}
      </nav>
      <button
        className="flex gap-2 items-center px-3 py-2 text-error font-bold text-small cursor-pointer hover:bg-red-100 rounded-full transition duration-400"
        style={{
          justifyContent: !sidebarOpen && "center",
        }}
      >
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
