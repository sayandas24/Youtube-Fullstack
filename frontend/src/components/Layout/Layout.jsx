import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import NewFeatureMSG from "../UI/NewFeatureMSG";

function Layout() {
  return (
    <div className="flex h-screen flex-col">
      <NewFeatureMSG />
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;
