import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";

function Layout() {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;
