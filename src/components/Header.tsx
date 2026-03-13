import React, { lazy, useState } from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router";
import { FiArrowDown, FiBell, FiHome, FiSearch } from "react-icons/fi";
import { reactImg } from "../assets";
import { FaBell } from "react-icons/fa";
import { useMainStore } from "../store/mainStore";
const ProfileDropdown = lazy(() => import("./ProfileDropdown"));

const Header = () => {
  const user_id = "02ie2jd9d9hc9hc9";
  const user_notifications = 10;

  // const [profileDropdownVisible, setProfileDropdownVisible] =
  //   useState<boolean>(false);

  const { setSearchBoxVisible } = useMainStore();

  return (
    <header className="h-19 px-3 flex items-center w-full">
      <div className="flex-1">
        <a
          href="/"
          className="w-fit text-small font-inter text-text-muted flex items-center gap-2"
        >
          <FiHome /> / <span className="text-dark">Dashboard</span>
        </a>
      </div>
      <div className="p-3 flex items-center gap-4">
        <div className="w-fit h-full flex items-center gap-2">
          <SearchBar />
          <FiSearch
            size={17}
            className="md:hidden"
            onClick={setSearchBoxVisible}
          />
        </div>
        <Link
          to={`user/notifications/${user_id}`}
          className="bg-base rounded-lg flex items-center justify-center p-2 cursor-pointer hover:bg-text-muted/20 transition duration-400 ease-in"
        >
          <span className="relative">
            <p className="absolute -top-3 -right-2 text-x-small w-5 h-5 bg-error text-white rounded-full flex items-center justify-center font-inter">
              {user_notifications}
            </p>
            <FaBell color="#121212" />
          </span>
        </Link>
        <div className="flex items-center justify-center gap-3">
          <div className="w-fit h-full hidden md:flex md:flex-col">
            <p className="text-small text-dark font-inter">David Allison</p>
            <p className="text-x-small text-text-muted font-inter">
              danielallison20@gmail.com
            </p>
          </div>
          <Link to={`user/profile/920i02u`} className="md:hidden lg:flex">
            <img
              src={reactImg}
              alt="User avatar"
              className="h-6 w-6 md:h-9 md:w-9 rounded-full"
              //   border border-text-muted
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
