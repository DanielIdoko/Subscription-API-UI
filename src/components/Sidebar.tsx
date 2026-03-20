import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import {
  FiHome,
  FiCreditCard,
  FiTrendingUp,
  FiUser,
  FiSettings,
  FiLogOut,
  FiChevronLeft,
} from "react-icons/fi";
import { authStore } from "../store/authStore";

const navItems = [
  { id: 1, label: "Dashboard", path: "/dashboard", icon: FiHome },
  { id: 2, label: "Subscriptions", path: "/subscriptions", icon: FiCreditCard },
  { id: 3, label: "Analytics", path: "/analytics", icon: FiTrendingUp },
  { id: 4, label: "Profile", path: "/profile", icon: FiUser },
  { id: 5, label: "Settings", path: "/settings", icon: FiSettings },
];

export const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = authStore();

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700 transition-all duration-300 z-40 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Logo Section */}
      <div
        className={`h-16 flex items-center ${isOpen ? "justify-between" : "justify-center"} px-5 border-b border-gray-200`}
      >
        {isOpen && (
          <div className="flex items-center gap-2">
            {/* <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
              M
            </div> */}
            <span className="font-inter text-[#155dfc]">Managel</span>
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 hover:bg-gray-100 rounded-lg duration-500 transition-colors cursor-pointer"
        >
          <FiChevronLeft
            className={`w-5 h-5 text-gray-600 transition-transform ${
              !isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-2 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-sans font-semibold dark:bg-slate-800 dark:text-blue-300"
                    : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-slate-800"
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              {isOpen && <span className="text-sm">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
        >
          <FiLogOut className="w-4 h-4 shrink-0" />
          {isOpen && <span className="text-sm font-sans">Log out</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
