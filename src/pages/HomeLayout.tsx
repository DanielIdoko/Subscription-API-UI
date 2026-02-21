import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router";

const HomeLayout = () => {
  return (
    <>
      <section className="w-full h-dvh flex bg-white">
        <Sidebar />
        <Outlet />
      </section>
    </>
  );
};

export default HomeLayout;
