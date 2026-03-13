import React from "react";
import { FiArrowLeft, FiHome } from "react-icons/fi";
import { Link } from "react-router";

const Notifications = () => {
  return (
    <div className="h-full w-full bg-white px-1 py-3">
      <div className="w-fit p-2 flex items-center gap-3">
        <a
          href="/user/notifications/02ie2jd9d9hc9hc9"
          className="text-small font-inter text-text-muted flex items-center gap-2 flex-1"
        >
          <a href="/">
           <FiHome />
          </a> /{" "}
          <span className="text-dark">Notifications</span>
        </a>
        <Link
          className="bg-white rounded-lg p-2 flex items-center justify-center cursor-pointer hover:bg-white/80 transition duration-300 ease-in"
          to="/"
          onClick={() => {}}
        >
          <FiArrowLeft />
        </Link>
      </div>
    </div>
  );
};

export default Notifications;
