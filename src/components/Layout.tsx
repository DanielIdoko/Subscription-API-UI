import React, { useEffect } from "react";
import { FiBell, FiMoon, FiSun } from "react-icons/fi";
import { authStore } from "../store/authStore";
import { themeStore } from "../store/themeStore";
import { Link } from "react-router";

interface HeaderProps {
  title?: string;
  greeting?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ title, greeting = true }) => {
  const { user, fetchCurrentUser } = authStore();
  const { theme, toggleTheme } = themeStore();
  const hour = new Date().getHours();
  const greetingText =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  useEffect(() => {
    if (!user) fetchCurrentUser();
  }, []);

  return (
    <header className="fixed top-0 right-0 left-0 pl-18 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 z-30 transition-all duration-300">
      <div className="h-16 px-6 flex items-center justify-between">
        <div>
          {greeting ? (
            <div>
              <h1 className="text-md font-inter text-gray-900 dark:text-gray-100">
                {greetingText}, {user?.data?.name || "Guest"}
              </h1>
              <p className="text-sm font-sans text-gray-600 dark:text-gray-300">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          ) : (
            <h1 className="text-small-medium font-inter text-blue-600 dark:text-blue-300">
              {title}
            </h1>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-gray-200 dark:border-slate-700 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <FiSun className="w-5 h-5 text-yellow-400" />
            ) : (
              <FiMoon className="w-5 h-5 text-gray-700" />
            )}
          </button>

          <Link
            className="relative p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            to="/notifications"
          >
            <FiBell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </Link>
          <Link
            className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold"
            to="/profile"
          >
            {user?.data?.name?.slice(0, 1)}
          </Link>
        </div>
      </div>
    </header>
  );
};
