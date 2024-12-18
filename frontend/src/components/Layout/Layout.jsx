import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";

function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;
